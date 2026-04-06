"use client"

import { useRouter } from "next/navigation"

export default function SalvarPropostaButton({ numero, dados, ultimaVersao, disabled }) {

  const router = useRouter()

  async function handleClick() {
    try {

      const nova = JSON.stringify(dados)
      const atual = JSON.stringify(ultimaVersao?.dados || {})

      if (nova === atual) {
        alert("Nenhuma alteração detectada")
        return
      }

      const confirmar = confirm("Deseja salvar como nova versão?")
      if (!confirmar) return

      await fetch("/api/propostas/salvar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numero,
          dados
        }),
      })

      alert("Proposta salva como nova versão")

      router.refresh()

    } catch (err) {
      console.error(err)
      alert("Erro ao salvar proposta")
    }
  }

  return (
    <button
  onClick={handleClick}
  disabled={disabled}
  className={`px-4 py-2 rounded text-white ${
    disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  Salvar Proposta
</button>
  )
}
