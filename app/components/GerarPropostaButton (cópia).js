"use client"

import { useRouter } from "next/navigation"

export default function GerarPropostaButton({ numero }) {
  const router = useRouter()

  async function handleClick() {
    try {
      const res = await fetch("/api/os/fechar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numero }),
      })

      if (!res.ok) {
        throw new Error("Erro ao fechar OS")
      }

      router.push(`/admin/os/${encodeURIComponent(numero)}/proposta`)

    } catch (err) {
      console.error(err)
      alert("Erro ao gerar proposta")
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
    >
      Gerar Proposta
    </button>
  )
}
