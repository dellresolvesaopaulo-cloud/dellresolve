"use client"

import { useRouter } from "next/navigation"

export default function ConfirmarPagamentoButton({ numero }) {
  const router = useRouter()

  async function handleClick() {
    try {
      await fetch("/api/os/pagar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numero }),
      })

      router.refresh()

    } catch (err) {
      console.error("Erro ao confirmar pagamento:", err)
      alert("Erro ao confirmar pagamento")
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
    >
      Pagamento Confirmado
    </button>
  )
}
