"use client"

import { useEffect, useState } from "react"

export default function NovaOS() {
  const [clientes, setClientes] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [equipFiltrados, setEquipFiltrados] = useState([])
  const [salvando, setSalvando] = useState(false)

  const [form, setForm] = useState({
    cliente_id: "",
    equipamento_id: "",
    defeito: "",
    garantia: "",
    cep: "",
    endereco: "",
    mao_obra: 0,
    frete: 0,
    tipo: ""
  })

  const [calcularFrete, setCalcularFrete] = useState(false)

  function calcularFretePorCep(cep) {
    const cepNumerico = String(cep || "").replace(/\D/g, "")

    if (cepNumerico.length < 8) return 0

    const origem = 2418020
    const destino = Number(cepNumerico)
    const distancia = Math.abs(destino - origem)

    return Number(Math.min(80, Math.max(20, distancia / 100000)).toFixed(2))
  }

  useEffect(() => {
    async function load() {
      try {
        const c = await fetch("/api/clientes").then(r => r.json())
        const e = await fetch("/api/equipamentos").then(r => r.json())

        setClientes(Array.isArray(c) ? c : [])
        setEquipamentos(Array.isArray(e) ? e : [])
      } catch (err) {
        console.error("Erro ao carregar dados da OS:", err)
        alert("Erro ao carregar clientes e equipamentos")
      }
    }

    load()
  }, [])

  function handleCliente(e) {
    const id = e.target.value

    const filtrados = equipamentos.filter(
      eq => String(eq.cliente_id) === String(id)
    )

    setEquipFiltrados(filtrados)

    setForm(prev => ({
      ...prev,
      cliente_id: id,
      equipamento_id: "",
      garantia: "",
      cep: "",
      endereco: "",
      frete: 0
    }))
  }

  function handleEquipamento(e) {
    const id = e.target.value

    const eq = equipFiltrados.find(
      eq => String(eq.id) === String(id)
    )

    if (!eq) {
      setForm(prev => ({
        ...prev,
        equipamento_id: id
      }))
      return
    }

    const cep = eq.cliente?.cep || ""
    const endereco = eq.cliente?.endereco || ""

    setForm(prev => ({
      ...prev,
      equipamento_id: id,
      cep,
      endereco,
      frete: calcularFrete ? calcularFretePorCep(cep) : 0
    }))
  }

  function handleTipo(e) {
    const tipo = e.target.value

    let mao = 0
    let frete = form.frete

    if (tipo === "basico") mao = 240
    if (tipo === "premium") mao = 320
    if (tipo === "gamer") mao = 480

    setForm(prev => ({
      ...prev,
      tipo,
      mao_obra: mao,
      frete
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (salvando) return

    if (!form.cliente_id || !form.equipamento_id) {
      alert("Selecione cliente e equipamento")
      return
    }

    try {
      setSalvando(true)

      const payload = {
        ...form,
        cliente_id: form.cliente_id,
        equipamento_id: form.equipamento_id,
        mao_obra: Number(form.mao_obra) || 0,
        frete: Number(form.frete) || 0
      }

      const res = await fetch("/api/os", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      let data = {}

      try {
        data = await res.json()
      } catch {
        data = {}
      }

      if (!res.ok || data.error) {
        console.error("Erro ao criar OS:", data)
        alert(data.error || "Erro ao criar OS")
        return
      }

      alert("OS criada com sucesso")
      window.location.href = "/admin/os"
    } catch (err) {
      console.error("Erro no submit da OS:", err)
      alert("Erro ao salvar OS")
    } finally {
      setSalvando(false)
    }
  }

  function formatBRL(v) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(v || 0)
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">
        Nova Ordem de Serviço
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={form.cliente_id}
          onChange={handleCliente}
          className="border p-3 rounded"
        >
          <option value="">Selecione Cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <select
          value={form.equipamento_id}
          onChange={handleEquipamento}
          className="border p-3 rounded"
        >
          <option value="">Selecione Equipamento</option>
          {equipFiltrados.map(e => (
            <option key={e.id} value={e.id}>
              {e.modelo} - {e.service_tag}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="bg-blue-600 text-white py-2 rounded"
          onClick={() => {
            const eq = equipFiltrados.find(
              e => String(e.id) === String(form.equipamento_id)
            )

            if (!eq) {
              alert("Selecione equipamento")
              return
            }

            window.open(
              `https://www.dell.com/support/home/pt-br/product-support/servicetag/${eq.service_tag}`,
              "_blank"
            )
          }}
        >
          Consultar garantia Dell
        </button>

        <input
          className="border p-3 rounded"
          placeholder="Ex: Garantia até 12/2026 ou Expirada"
          value={form.garantia}
          onChange={(e) =>
            setForm(prev => ({ ...prev, garantia: e.target.value }))
          }
        />

        <select
          value={form.tipo}
          onChange={handleTipo}
          className="border p-3 rounded"
        >
          <option value="">Tipo</option>
          <option value="basico">Básico</option>
          <option value="premium">Premium</option>
          <option value="gamer">Gamer</option>
        </select>

        <textarea
          className="border p-3 rounded"
          placeholder="Defeito"
          value={form.defeito}
          onChange={(e) =>
            setForm(prev => ({ ...prev, defeito: e.target.value }))
          }
        />

        <input
          className="border p-3 rounded"
          value={form.cep}
          readOnly
        />

        <input
          className="border p-3 rounded"
          value={form.endereco}
          readOnly
        />

        <label>
          <input
            type="checkbox"
            checked={calcularFrete}
            onChange={(e) => {
              const checked = e.target.checked

              setCalcularFrete(checked)
              setForm(prev => ({
                ...prev,
                frete: checked ? calcularFretePorCep(prev.cep) : 0
              }))
            }}
          />
          {" "}Calcular frete
        </label>

        <input
          className="border p-3 rounded"
          value={formatBRL(form.mao_obra)}
          readOnly
        />

        <input
          className="border p-3 rounded"
          value={formatBRL(form.frete)}
          readOnly
        />

        <button
          type="submit"
          disabled={salvando}
          className="bg-green-600 text-white py-3 rounded mt-4 disabled:opacity-60"
        >
          {salvando ? "Salvando..." : "Salvar OS"}
        </button>
      </form>
    </div>
  )
}
