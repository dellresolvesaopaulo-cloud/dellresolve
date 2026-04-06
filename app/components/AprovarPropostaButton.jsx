"use client"

import { useRouter } from "next/navigation"

export default function AprovarPropostaButton({ numero }) {
  const router = useRouter()

  async function handleClick() {
    try {
      await fetch("/api/os/aprovar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numero }),
      })

      router.refresh()

    } catch (err) {
      console.error("Erro ao aprovar proposta:", err)
      alert("Erro ao aprovar proposta")
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      Aprovar Proposta
    </button>
  )
}
