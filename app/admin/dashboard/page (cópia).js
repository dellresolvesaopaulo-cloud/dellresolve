"use client"

import { useEffect, useState } from "react"

export default function Dashboard() {

  const [os, setOS] = useState([])
  const [clientes, setClientes] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todas")

  // =========================
  // LOAD
  // =========================
  useEffect(() => {
    async function load() {

      const [o, c, e] = await Promise.all([
        fetch("/api/os").then(r => r.json()),
        fetch("/api/clientes").then(r => r.json()),
        fetch("/api/equipamentos").then(r => r.json())
      ])

      setOS(o || [])
      setClientes(c || [])
      setEquipamentos(e || [])
    }

    load()
  }, [])

  // =========================
  // MUDAR STATUS (🔥 NOVO)
  // =========================
  async function mudarStatus(numero, statusAtual) {

    const fluxo = ["aberta", "analise", "aprovada", "concluida"]
    const index = fluxo.indexOf(statusAtual)

    let novo = fluxo[index + 1] || "aberta"

    await fetch(`/api/os/${encodeURIComponent(numero)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novo })
    })

    // 🔥 atualiza local sem reload
    setOS(prev =>
      prev.map(o =>
        o.numero === numero ? { ...o, status: novo } : o
      )
    )
  }

  // =========================
  // FILTRO + BUSCA
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

  // =========================
  // CONTADORES
  // =========================
  const abertas = os.filter(o => o.status === "aberta").length
  const analise = os.filter(o => o.status === "analise").length
  const aprovadas = os.filter(o => o.status === "aprovada").length
  const concluidas = os.filter(o => o.status === "concluida").length
  const canceladas = os.filter(o => o.status === "cancelada").length

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {/* BUSCA */}
      <input
        type="text"
        placeholder="Buscar cliente, service tag ou OS..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="border p-3 rounded w-full mb-6"
      />

      {/* FILTROS */}
      <div className="flex flex-wrap gap-2 mb-6">

        <Filtro label="Todas" value="todas" atual={filtroStatus} set={setFiltroStatus} />
        <Filtro label={`Abertas (${abertas})`} value="aberta" atual={filtroStatus} set={setFiltroStatus} />
        <Filtro label={`Análise (${analise})`} value="analise" atual={filtroStatus} set={setFiltroStatus} />
        <Filtro label={`Aprovadas (${aprovadas})`} value="aprovada" atual={filtroStatus} set={setFiltroStatus} />
        <Filtro label={`Concluídas (${concluidas})`} value="concluida" atual={filtroStatus} set={setFiltroStatus} />
        <Filtro label={`Canceladas (${canceladas})`} value="cancelada" atual={filtroStatus} set={setFiltroStatus} />

      </div>

      {/* LISTA */}
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
            {lista.map(o => (
              <tr key={o.id} className="hover:bg-gray-50">

                <td className="p-3 border">
                  <a
                    href={`/admin/os/${encodeURIComponent(o.numero)}`}
                    className="text-blue-600 hover:underline"
                  >
                    {o.numero}
                  </a>
                </td>

                <td className="p-3 border">
                  {o.clientes?.nome || "-"}
                </td>

                <td className="p-3 border">
                  {o.equipamentos?.service_tag || "-"}
                </td>

                {/* 🔥 STATUS CLICÁVEL */}
                <td className="p-3 border">
                  <button
                    onClick={() => mudarStatus(o.numero, o.status)}
                    className={`px-2 py-1 rounded text-white text-sm ${corStatus(o.status)}`}
                  >
                    {o.status}
                  </button>
                </td>

                <td className="p-3 border flex gap-2">

                  <a
                    href={`/admin/os/${encodeURIComponent(o.numero)}`}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Ver
                  </a>

                  <a
                    href={`/admin/os/${encodeURIComponent(o.numero)}/editar`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Editar
                  </a>

                  <button
                    onClick={async () => {
                      if (!confirm("Deseja excluir esta OS?")) return

                      await fetch(`/api/os/${encodeURIComponent(o.numero)}`, {
                        method: "DELETE"
                      })

                      setOS(prev => prev.filter(x => x.numero !== o.numero))
                    }}
                    className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

// =========================
// CORES STATUS
// =========================
function corStatus(status) {
  if (status === "aberta") return "bg-yellow-500"
  if (status === "analise") return "bg-purple-500"
  if (status === "aprovada") return "bg-blue-500"
  if (status === "concluida") return "bg-green-600"
  if (status === "cancelada") return "bg-red-600"
  return "bg-gray-400"
}

// =========================
// FILTRO
// =========================
function Filtro({ label, value, atual, set }) {

  const ativo = atual === value

  return (
    <button
      onClick={() => set(value)}
      className={`px-3 py-1 rounded text-sm ${
        ativo ? "bg-black text-white" : "bg-gray-200"
      }`}
    >
      {label}
    </button>
  )
}
