import ProdutoCard from "./components/loja/ProdutoCard"

const produtos = [
  {
    nome: "SSD 480GB",
    preco: 199,
    imagem: "https://via.placeholder.com/300x200"
  },
  {
    nome: "Memória RAM 8GB",
    preco: 149,
    imagem: "https://via.placeholder.com/300x200"
  },
  {
    nome: "Carregador Dell 65W",
    preco: 129,
    imagem: "https://via.placeholder.com/300x200"
  },
  {
    nome: "Bateria Notebook Dell",
    preco: 249,
    imagem: "https://via.placeholder.com/300x200"
  },
]

export default function Loja() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Loja Dell Resolve</h1>

      <p className="mt-2 text-gray-600">
        Peças para notebooks e computadores Dell na Zona Norte São Paulo
      </p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {produtos.map((produto, i) => (
          <ProdutoCard
            key={i}
            nome={produto.nome}
            preco={produto.preco}
            imagem={produto.imagem}
          />
        ))}
      </div>
    </main>
  )
}
