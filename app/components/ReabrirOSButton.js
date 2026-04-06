"use client"

import { useRouter } from "next/navigation"

export default function ReabrirOSButton({ numero }) {
  const router = useRouter()

  async function handleClick() {
    try {
      await fetch("/api/os/reabrir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numero }),
      })

      router.refresh()

    } catch (err) {
      console.error("Erro ao reabrir OS:", err)
      alert("Erro ao reabrir OS")
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
    >
      Reabrir OS
    </button>
  )
}
