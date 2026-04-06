"use client"

import { useEffect, useState } from "react"

type Produto = {
  nome: string
  preco: number
  imagem: string
}

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState<Produto[]>([])

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("carrinho") || "[]")
    setCarrinho(dados)
  }, [])

  function removerItem(index: number) {
    const novoCarrinho = [...carrinho]
    novoCarrinho.splice(index, 1)

    setCarrinho(novoCarrinho)
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho))
  }

  async function finalizarCompra() {
    if (carrinho.length === 0) return

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0)

    try {
      // 🔥 salva pedido na API
      await fetch("/api/loja/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itens: carrinho,
          total,
          data: new Date(),
          status: "novo",
        }),
      })

      // 🔥 monta mensagem
      const mensagem = carrinho
        .map(item => `- ${item.nome} (R$ ${item.preco.toFixed(2)})`)
        .join("\n")

      const texto = encodeURIComponent(
        `Olá! Gostaria de solicitar um orçamento:\n\n${mensagem}\n\nTotal: R$ ${total.toFixed(2)}\n\nNome:\nTelefone:\nObservações:`
      )

      const telefone = "5511946674001" // 👉 seu número

      window.open(`https://wa.me/${telefone}?text=${texto}`, "_blank")

      // 🧹 limpa carrinho
      localStorage.removeItem("carrinho")
      setCarrinho([])

    } catch (error) {
      alert("Erro ao finalizar pedido. Tente novamente.")
    }
  }

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0)

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Carrinho</h1>

      {carrinho.length === 0 ? (
        <p className="mt-4">Seu carrinho está vazio.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {carrinho.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border p-4 rounded-xl"
            >
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-20 h-20 object-contain"
              />

              <div className="flex-1">
                <h2 className="font-semibold">{item.nome}</h2>
                <p className="text-green-600">
                  R$ {item.preco.toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => removerItem(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remover
              </button>
            </div>
          ))}

          <div className="mt-6 text-xl font-bold">
            Total: R$ {total.toFixed(2)}
          </div>

          <button
            onClick={finalizarCompra}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            Finalizar via WhatsApp
          </button>
        </div>
      )}
    </main>
  )
}
