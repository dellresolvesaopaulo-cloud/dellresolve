"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function EquipamentoEditForm({ equipamento }) {

  const router = useRouter()

  const [form, setForm] = useState({
    equipamento: equipamento.equipamento || "",
    modelo: equipamento.modelo || "",
    service_tag: equipamento.service_tag || "",
    acessorios: equipamento.acessorios || "",
    estado_visual: equipamento.estado_visual || "",
    tentativa_reparo: equipamento.tentativa_reparo || "",
    garantia: equipamento.garantia || "" // ✅ IMPORTANTE
  })

  async function handleSubmit(e) {

    e.preventDefault()

    await fetch(`/api/equipamentos/${equipamento.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    router.refresh()
    alert("Equipamento atualizado!")
  }

  return (

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <input
        placeholder="Equipamento"
        value={form.equipamento}
        onChange={(e) => setForm({ ...form, equipamento: e.target.value })}
      />

      <input
        placeholder="Modelo"
        value={form.modelo}
        onChange={(e) => setForm({ ...form, modelo: e.target.value })}
      />

      <input
        placeholder="Service Tag"
        value={form.service_tag}
        onChange={(e) => setForm({ ...form, service_tag: e.target.value })}
      />

      <input
        placeholder="Acessórios"
        value={form.acessorios}
        onChange={(e) => setForm({ ...form, acessorios: e.target.value })}
      />

      <textarea
        placeholder="Estado visual"
        value={form.estado_visual}
        onChange={(e) => setForm({ ...form, estado_visual: e.target.value })}
      />

      <textarea
        placeholder="Tentativa de reparo"
        value={form.tentativa_reparo}
        onChange={(e) => setForm({ ...form, tentativa_reparo: e.target.value })}
      />

      {/* 🔥 GARANTIA (AGORA FUNCIONA) */}
      <input
        type="date"
        value={form.garantia || ""}
        onChange={(e) => setForm({ ...form, garantia: e.target.value })}
      />

      <button className="bg-blue-600 text-white py-2 rounded">
        Salvar
      </button>

    </form>
  )
}
