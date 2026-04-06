import { modelos } from "../../../data/modelos"
import { servicos } from "../../../data/servicos"
import MapaZonaNorte from "../../components/MapaZonaNorte"

export async function generateStaticParams() {

  const params = []

  for (const modelo of Object.keys(modelos)) {
    for (const servico of Object.keys(servicos)) {

      params.push({
        slug: `${servico}-${modelo}`
      })

    }
  }

  return params
}

export async function generateMetadata({ params }) {

  const { slug } = await params

  const parts = slug.split("-")

  const modelo = parts.pop()
  const servico = parts.join("-")

  const modeloData = modelos[modelo]
  const servicoData = servicos[servico]

  if (!modeloData || !servicoData) return {}

  return {
    title: `${servicoData.nome} em ${modeloData.nome}`,
    description: `${servicoData.nome} para notebook ${modeloData.nome}. Assistência técnica Dell especializada na Zona Norte de São Paulo.`,
  }

}

export default async function Page({ params }) {

  const { slug } = await params

  const parts = slug.split("-")

  const modelo = parts.pop()
  const servico = parts.join("-")

  const modeloData = modelos[modelo]
  const servicoData = servicos[servico]

  if (!modeloData || !servicoData) {

    return (
      <main className="min-h-screen bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#1F5F8B]">
            Página não encontrada
          </h1>
        </div>
      </main>
    )

  }

  return (

    <main className="min-h-screen bg-white py-20">

      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-[#1F5F8B]">
          {servicoData.nome} em {modeloData.nome}
        </h1>

        <p className="mt-6 text-gray-700 leading-relaxed">
          Realizamos <strong>{servicoData.nome}</strong> em notebooks
          <strong> {modeloData.nome}</strong> com diagnóstico técnico
          profissional e peças de qualidade.
        </p>

        <p className="mt-4 text-gray-700">
          A Dell Resolve atende toda a Zona Norte de São Paulo com
          assistência técnica especializada em notebooks Dell.
        </p>

        <h2 className="text-2xl font-semibold mt-10">
          Outros serviços realizados
        </h2>

        <ul className="mt-4 text-gray-700 list-disc pl-6 space-y-2">

          <li>Troca de SSD em notebook Dell</li>
          <li>Upgrade de memória RAM</li>
          <li>Reparo de placa-mãe Dell</li>
          <li>Troca de tela notebook Dell</li>
          <li>Limpeza interna e manutenção</li>

        </ul>

      </div>

      <MapaZonaNorte />

    </main>

  )

}
