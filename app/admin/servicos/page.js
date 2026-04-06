"use client"

import { useEffect, useState } from "react"

export default function ServicosAdmin() {
  const [servicos, setServicos] = useState([])
  const [diagnosticos, setDiagnosticos] = useState([])
  const [novo, setNovo] = useState({
    descricao: "",
    valor: "",
    diagnostico_id: ""
  })

  // 🔄 carregar tudo
  async function carregar() {
    const resDiag = await fetch("/api/diagnosticos")
    const diag = await resDiag.json()

    const resServ = await fetch("/api/diagnosticos-servicos")
    const serv = await resServ.json()

    setDiagnosticos(diag)
    setServicos(serv)
  }

  useEffect(() => {
    carregar()
  }, [])

  // ➕ criar serviço
  async function criar() {
    if (!novo.descricao || !novo.diagnostico_id) return

    await fetch("/api/diagnosticos-servicos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        descricao: novo.descricao,
        valor: Number(novo.valor),
        diagnostico_id: novo.diagnostico_id
      })
    })

    setNovo({ descricao: "", valor: "", diagnostico_id: "" })
    carregar()
  }

  // 🗑️ deletar
  async function deletar(id) {
    await fetch("/api/diagnosticos-servicos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })

    carregar()
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Serviços</h1>

      {/* FORM */}
      <div className="flex gap-2 mb-4 flex-wrap">

        <select
          value={novo.diagnostico_id}
          onChange={e =>
            setNovo({ ...novo, diagnostico_id: e.target.value })
          }
          className="border p-2"
        >
          <option value="">Diagnóstico</option>
          {diagnosticos.map(d => (
            <option key={d.id} value={d.id}>
              {d.titulo}
            </option>
          ))}
        </select>

        <input
          placeholder="Descrição"
          value={novo.descricao}
          onChange={e =>
            setNovo({ ...novo, descricao: e.target.value })
          }
          className="border p-2"
        />

        <input
          type="number"
          placeholder="Valor"
          value={novo.valor}
          onChange={e =>
            setNovo({ ...novo, valor: e.target.value })
          }
          className="border p-2 w-32"
        />

        <button
          onClick={criar}
          className="bg-green-600 text-white px-3 rounded"
        >
          Salvar
        </button>

      </div>

      {/* LISTA */}
      {servicos.map(s => {
        const diag = diagnosticos.find(d => d.id === s.diagnostico_id)

        return (
          <div key={s.id} className="border p-3 mb-2 rounded">

            <p className="font-semibold">{s.descricao}</p>

            <p className="text-sm text-gray-500">
              {diag?.titulo || "Sem diagnóstico"}
            </p>

            <p className="text-sm">
              R$ {Number(s.valor).toFixed(2)}
            </p>

            <button
              onClick={() => deletar(s.id)}
              className="bg-red-500 text-white px-2 py-1 mt-2 rounded"
            >
              Excluir
            </button>

          </div>
        )
      })}
    </div>
  )
}
