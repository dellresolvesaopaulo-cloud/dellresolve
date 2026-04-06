"use client"

import { useState } from "react"

export default function PrazosEditor({ numero, inicial }) {

  const [valores, setValores] = useState({
    prazo_validade: Number(inicial?.prazo_validade ?? 2),
    prazo_diagnostico: Number(inicial?.prazo_diagnostico ?? 5),
    prazo_reparo: Number(inicial?.prazo_reparo ?? 5),
  })

  

async function salvar(campo, valor) {
  try {
    const novoValor = Number(valor)

    // atualiza estado primeiro (IMPORTANTE)
    setValores(prev => ({
      ...prev,
      [campo]: novoValor
    }))

    await fetch(`/api/os/${numero}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [campo]: novoValor,
      }),
    })

  } catch (err) {
    console.error("Erro ao salvar prazo:", err)
  }
}



  function handleChange(campo, valor) {
    setValores(prev => ({
      ...prev,
      [campo]: Number(valor)
    }))
  }

  return (
    <div className="flex gap-4 flex-wrap">

      <div>
        <label className="text-sm">Validade</label>
        <input
          type="number"
          value={valores.prazo_validade}
          onChange={(e) => handleChange("prazo_validade", e.target.value)}
          onBlur={(e) => salvar("prazo_validade", e.target.value)}
          className="border p-2 w-20"
        />
      </div>

      <div>
        <label className="text-sm">Diagnóstico</label>
        <input
          type="number"
          value={valores.prazo_diagnostico}
          onChange={(e) => handleChange("prazo_diagnostico", e.target.value)}
          onBlur={(e) => salvar("prazo_diagnostico", e.target.value)}
          className="border p-2 w-20"
        />
      </div>

      <div>
        <label className="text-sm">Reparo</label>
        <input
          type="number"
          value={valores.prazo_reparo}
          onChange={(e) => handleChange("prazo_reparo", e.target.value)}
          onBlur={(e) => salvar("prazo_reparo", e.target.value)}
          className="border p-2 w-20"
        />
      </div>

    </div>
  )
}
