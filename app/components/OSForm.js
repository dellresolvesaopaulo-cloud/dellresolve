"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function OSForm({ clientes = [], equipamentos = [] }) {

  const router = useRouter()

  const [clienteId, setClienteId] = useState("")
  const [equipamentoId, setEquipamentoId] = useState("")

  const [endereco, setEndereco] = useState("")
  const [cep, setCep] = useState("")

  const [defeito, setDefeito] = useState("")
  const [garantia, setGarantia] = useState("")

  const [tipo, setTipo] = useState("")
  const [maoObra, setMaoObra] = useState(0)
  const [frete, setFrete] = useState(30)

  // =========================
  // 🔥 AUTO PREENCHER CLIENTE
  // =========================
  useEffect(() => {

    if (!clienteId) return

    const cliente = clientes.find(c => String(c.id) === String(clienteId))

    if (cliente) {

      setEndereco(cliente.endereco || "")
      setCep(cliente.cep || "")

      // 🔥 seleciona equipamento do cliente automaticamente
      const eq = equipamentos.find(e => String(e.cliente_id) === String(clienteId))

      if (eq) {
        setEquipamentoId(eq.id)
      }

    }

  }, [clienteId, clientes, equipamentos])

  // =========================
  // 🔥 AUTO MÃO DE OBRA
  // =========================
  useEffect(() => {

    if (tipo === "basico") setMaoObra(240)
    else if (tipo === "premium") setMaoObra(380)
    else if (tipo === "gamer") setMaoObra(480)
    else setMaoObra(0)

  }, [tipo])

  // =========================
  // 🔥 SUBMIT
  // =========================
  async function handleSubmit(e) {

    e.preventDefault()

    try {

      const res = await fetch("/api/os", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cliente_id: clienteId,
          equipamento_id: equipamentoId,
          defeito,
          garantia,
          tipo,
          mao_obra: maoObra,
          frete,
          endereco,
          cep
        })
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Erro ao criar OS")
        return
      }

      router.push("/admin/os")
      router.refresh()

    } catch {
      alert("Erro inesperado ao criar OS")
    }
  }

  // =========================
  // UI
  // =========================
  return (

    <form onSubmit={handleSubmit} className="space-y-4">

      {/* CLIENTE */}
      <select
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Selecione o cliente</option>

        {clientes.map(c => (
          <option key={c.id} value={c.id}>
            {c.nome}
          </option>
        ))}

      </select>

      {/* EQUIPAMENTO */}
      <select
        value={equipamentoId}
        onChange={(e) => setEquipamentoId(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Selecione o equipamento</option>

        {equipamentos.map(e => (
          <option key={e.id} value={e.id}>
            {e.equipamento} - {e.modelo}
          </option>
        ))}

      </select>

      {/* ENDEREÇO */}
      <input
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        className="border p-2 w-full"
      />

      {/* CEP */}
      <input
        placeholder="CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        className="border p-2 w-full"
      />

      {/* DEFEITO */}
      <textarea
        placeholder="Defeito relatado"
        value={defeito}
        onChange={(e) => setDefeito(e.target.value)}
        className="border p-2 w-full"
      />

      {/* GARANTIA */}
      <input
        placeholder="Garantia (manual ou Dell)"
        value={garantia}
        onChange={(e) => setGarantia(e.target.value)}
        className="border p-2 w-full"
      />

      {/* TIPO */}
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Tipo de equipamento</option>
        <option value="basico">Básico</option>
        <option value="premium">Premium</option>
        <option value="gamer">Gamer</option>
      </select>

      {/* MÃO DE OBRA */}
      <input
        value={`Mão de obra: R$ ${maoObra}`}
        readOnly
        className="border p-2 w-full bg-gray-100"
      />

      {/* FRETE */}
      <input
        value={`Frete: R$ ${frete}`}
        readOnly
        className="border p-2 w-full bg-gray-100"
      />

      <button className="bg-blue-600 text-white px-6 py-3 rounded">
        Criar Ordem de Serviço
      </button>

    </form>

  )
}
