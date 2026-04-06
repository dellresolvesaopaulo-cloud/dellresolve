"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

async function readJsonSafe(response) {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export default function DashboardOS() {
  const router = useRouter()
  const [os, setOS] = useState([])
  const [clientes, setClientes] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todas")
  const [loading, setLoading] = useState(true)

  // =========================
  // LOAD
  // =========================
  useEffect(() => {
    async function load() {
      try {
        const [osResponse, clientesResponse, equipamentosResponse] = await Promise.all([
          fetch("/api/os"),
          fetch("/api/clientes"),
          fetch("/api/equipamentos")
        ])

        if ([osResponse, clientesResponse, equipamentosResponse].some(
          response => response.status === 401 || response.status === 403
        )) {
          router.replace("/admin/login")
          return
        }

        const [o, c, e] = await Promise.all([
          readJsonSafe(osResponse),
          readJsonSafe(clientesResponse),
          readJsonSafe(equipamentosResponse)
        ])

        setOS(Array.isArray(o?.ordens) ? o.ordens : [])
        setClientes(Array.isArray(c) ? c : [])
        setEquipamentos(Array.isArray(e) ? e : [])
      } catch (err) {
        console.error("Erro ao carregar:", err)
        setOS([])
        setClientes([])
        setEquipamentos([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [router])

  // =========================
  // PAGAMENTO
  // =========================
  async function pagar(o) {
    try {
      const res = await fetch("/api/mercadopago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          numeroOS: o.numero,
          valor: o.valor_total || o.mao_obra || 0
        })
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        alert("Erro ao gerar pagamento")
        return
      }

      window.open(data.url, "_blank")
    } catch (err) {
      console.error(err)
      alert("Erro no pagamento")
    }
  }

  // =========================
  // STATUS
  // =========================
  async function mudarStatus(id, statusAtual) {
    try {
      const fluxo = ["aberta", "analise", "aprovada", "paga", "concluida"]
      const index = fluxo.indexOf(statusAtual)
      const novo = fluxo[index + 1] || "aberta"

      const res = await fetch(`/api/os/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novo })
      })

      if (!res.ok) {
        alert("Erro ao atualizar status")
        return
      }

      setOS(prev =>
        prev.map(o =>
          o.id === id ? { ...o, status: novo } : o
        )
      )
    } catch (err) {
      console.error(err)
      alert("Erro ao atualizar status")
    }
  }

  // =========================
  // EXCLUIR
  // =========================
  async function excluirOS(id) {
    try {
      if (!confirm("Deseja excluir esta OS?")) return

      const res = await fetch(`/api/os/${id}`, {
        method: "DELETE"
      })

      if (!res.ok) {
        alert("Erro ao excluir OS")
        return
      }

      setOS(prev => prev.filter(x => x.id !== id))
    } catch (err) {
      console.error(err)
      alert("Erro ao excluir OS")
    }
  }

  // =========================
  // FILTRO
  // =========================
  const filtradas = os.filter(o => {
    const termo = busca.toLowerCase()

    const matchBusca =
      o.numero?.toLowerCase().includes(termo) ||
      o.clientes?.nome?.toLowerCase().includes(termo) ||
      o.equipamentos?.service_tag?.toLowerCase().includes(termo)

    const matchStatus =
      filtroStatus === "todas" || o.status === filtroStatus

    return matchBusca && matchStatus
  })

  const lista = filtradas.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <h1 className="text-3xl font-bold">
          Ordens de Serviço
        </h1>

        <Link
          href="/admin/os/nova"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
        >
          + Nova OS
        </Link>
      </div>

      {/* BUSCA */}
      <input
        type="text"
        placeholder="Buscar cliente, service tag ou OS..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="border p-3 rounded w-full mb-4"
      />

      {/* FILTRO STATUS */}
      <select
        value={filtroStatus}
        onChange={(e) => setFiltroStatus(e.target.value)}
        className="border p-2 rounded mb-6"
      >
        <option value="todas">Todas</option>
        <option value="aberta">Aberta</option>
        <option value="analise">Em análise</option>
        <option value="aprovada">Aprovada</option>
        <option value="paga">Paga</option>
        <option value="concluida">Concluída</option>
        <option value="cancelada">Cancelada</option>
      </select>

      {/* TABELA */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">Número</th>
              <th className="p-3 border text-left">Cliente</th>
              <th className="p-3 border text-left">Service Tag</th>
              <th className="p-3 border text-left">Status</th>
              <th className="p-3 border text-left">Ações</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4 border text-center">
                  Carregando...
                </td>
              </tr>
            ) : lista.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 border text-center text-gray-500">
                  Nenhuma OS encontrada.
                </td>
              </tr>
            ) : (
              lista.map(o => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="p-3 border">
                    {o.numero}
                  </td>

                  <td className="p-3 border">
                    {o.clientes?.nome || "-"}
                  </td>

                  <td className="p-3 border">
                    {o.equipamentos?.service_tag || "-"}
                  </td>

                  <td className="p-3 border">
                    <button
                      onClick={() => mudarStatus(o.id, o.status)}
                      className="px-2 py-1 rounded text-white bg-blue-600 text-sm"
                    >
                      {o.status}
                    </button>
                  </td>

                  <td className="p-3 border flex gap-2 flex-wrap">
                    <Link
                      href={`/admin/os/${o.id}`}
                      className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Ver
                    </Link>

                    <Link
                      href={`/admin/os/${o.id}/editar`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Editar
                    </Link>

                    {(o.status === "aprovada" || o.status === "paga") && (
                      <button
                        onClick={() => pagar(o)}
                        className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                      >
                        💳 Pagar
                      </button>
                    )}

                    <button
                      onClick={() => excluirOS(o.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
