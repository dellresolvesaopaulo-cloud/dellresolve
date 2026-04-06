"use client"

type Produto = {
  nome: string
  preco: number
  imagem: string
}

export default function ProdutoCard({ nome, preco, imagem }: Produto) {

  function adicionarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]")

    carrinho.push({ nome, preco, imagem })

    localStorage.setItem("carrinho", JSON.stringify(carrinho))

    alert("Produto adicionado ao carrinho!")
  }

  return (
    <div className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      
      <img
        src={imagem}
        alt={nome}
        className="w-full h-40 object-contain p-4"
      />

      <div className="p-4">
        <h2 className="font-semibold text-lg">{nome}</h2>

        <p className="text-green-600 font-bold mt-2">
          R$ {preco.toFixed(2)}
        </p>

        <button 
          onClick={adicionarCarrinho}
          className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:opacity-80"
        >
          Comprar
        </button>
      </div>
    </div>
  )
}
