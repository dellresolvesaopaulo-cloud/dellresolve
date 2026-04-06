"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function EditarOS() {

  const params = useParams()

  // ✅ NÃO força string — mantém controle real
  const id = params?.id

  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)

  // =========================
  // LOAD
  // =========================
  useEffect(() => {

    if (!id) return

    async function load() {
      try {
        const res = await fetch(`/api/os/${id}`)

        if (!res.ok) {
          throw new Error("Erro ao buscar OS")
        }

        const data = await res.json()

        if (!data) {
          alert("OS não encontrada")
          return
        }

        // ✅ NORMALIZA CAMPOS
        setForm({
          ...data,
          tecnico: data.tecnico || "",
          frete: Number(data.frete) || 0,
          mao_obra: Number(data.mao_obra) || 0
        })

      } catch (err) {
        console.error("Erro ao carregar OS:", err)
        alert("Erro ao carregar OS")
      } finally {
        setLoading(false)
      }
    }

    load()

  }, [id])

  // =========================
  // LOADING (CRÍTICO)
  // =========================
  if (!id || loading || !form) {
    return <div className="p-6">Carregando...</div>
  }

  // =========================
  // ALTERAR TIPO
  // =========================
  function handleTipoChange(tipo) {
    let mao_obra = 0

    if (tipo === "basico") mao_obra = 240
    if (tipo === "premium") mao_obra = 320
    if (tipo === "gamer") mao_obra = 480

    setForm(prev => ({
      ...prev,
      tipo,
      mao_obra
    }))
  }

  // =========================
  // SALVAR
  // =========================
  async function handleSubmit(e) {
    e.preventDefault()

    // 🚫 BLOQUEIO ABSOLUTO
    if (!id) {
      alert("Erro: ID inválido")
      return
    }

    try {

      const payload = {
        status: form.status || null,
        garantia: form.garantia || null,
        tipo: form.tipo || null,
        mao_obra: Number(form.mao_obra) || 0,
        frete: Number(form.frete) || 0,
        defeito: form.defeito || null,
        endereco: form.endereco || null,
        cep: form.cep || null,
        tecnico: form.tecnico || null
      }

      const res = await fetch(`/api/os/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data?.error || "Erro ao salvar")
      }

      alert("OS atualizada com sucesso")

      window.location.href = "/admin/os"

    } catch (err) {
      console.error("Erro ao salvar:", err)
      alert(err.message)
    }
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Editar OS
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <select
          value={form.status || ""}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border p-3 rounded"
        >
          <option value="aberta">Aberta</option>
          <option value="analise">Em análise</option>
          <option value="aprovada">Aprovada</option>
          <option value="paga">Paga</option>
          <option value="concluida">Concluída</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <select
          value={form.tipo || ""}
          onChange={(e) => handleTipoChange(e.target.value)}
          className="border p-3 rounded"
        >
          <option value="">Tipo</option>
          <option value="basico">Básico</option>
          <option value="premium">Premium</option>
          <option value="gamer">Gamer</option>
        </select>

        <input
          value={form.garantia || ""}
          onChange={(e) => setForm({ ...form, garantia: e.target.value })}
          className="border p-3 rounded"
          placeholder="Garantia"
        />

        <textarea
          value={form.defeito || ""}
          onChange={(e) => setForm({ ...form, defeito: e.target.value })}
          className="border p-3 rounded"
          placeholder="Defeito"
        />

        <input
          value={form.cep || ""}
          onChange={(e) => setForm({ ...form, cep: e.target.value })}
          className="border p-3 rounded"
          placeholder="CEP"
        />

        <input
          value={form.endereco || ""}
          onChange={(e) => setForm({ ...form, endereco: e.target.value })}
          className="border p-3 rounded"
          placeholder="Endereço"
        />

        <input
          type="number"
          value={form.mao_obra}
          onChange={(e) =>
            setForm({ ...form, mao_obra: Number(e.target.value) })
          }
          className="border p-3 rounded"
          placeholder="Mão de obra"
        />

        <input
          type="number"
          value={form.frete}
          onChange={(e) =>
            setForm({ ...form, frete: Number(e.target.value) })
          }
          className="border p-3 rounded"
          placeholder="Frete"
        />

        {/* 🔥 TECNICO */}
        <select
          value={form.tecnico || ""}
          onChange={(e) =>
            setForm({ ...form, tecnico: e.target.value })
          }
          className="border p-3 rounded"
        >
          <option value="">Selecionar técnico</option>
          <option value="Admin">Admin</option>
          <option value="Rafael">Rafael</option>
          <option value="Carlos">Carlos</option>
          <option value="Nicole">Nicole</option>
        </select>

        <button
          disabled={!id || loading}
          className="bg-green-600 text-white p-3 rounded disabled:opacity-50"
        >
          Salvar alterações
        </button>

      </form>

    </div>
  )
}
