import { servicos } from "../../../data/servicos"
import { bairros } from "../../../data/bairros"

import Breadcrumb from "../../components/Breadcrumb"
import SidebarSEO from "../../components/SidebarSEO"
import MapaZonaNorte from "../../components/MapaZonaNorte"

export function generateStaticParams() {

  const params = []

  for (const servico of Object.keys(servicos)) {
    for (const bairro of Object.keys(bairros)) {

      params.push({
        slug: `${servico}-${bairro}`
      })

    }
  }

  return params
}

export function generateMetadata({ params }) {

  if (!params || !params.slug) return {}

  const parts = params.slug.split("-")

  const bairro = parts.slice(-1)[0]
  const servico = parts.slice(0, -1).join("-")

  const servicoData = servicos[servico]
  const bairroData = bairros[bairro]

  if (!servicoData || !bairroData) return {}

  return {
    title: `${servicoData.titulo} em ${bairroData.nome} | Dell Resolve`,
    description: `${servicoData.descricao} Atendimento especializado em ${bairroData.nome}, Zona Norte de São Paulo.`,
  }

}

export default function Page({ params }) {

  if (!params || !params.slug) {
    return null
  }

  const parts = params.slug.split("-")

  const bairro = parts.slice(-1)[0]
  const servico = parts.slice(0, -1).join("-")

  const servicoData = servicos[servico]
  const bairroData = bairros[bairro]

  if (!servicoData || !bairroData) {

    return (
      <main className="min-h-screen bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-[#1F5F8B]">
            Página não encontrada
          </h1>
        </div>
      </main>
    )

  }

  return (

    <main className="min-h-screen bg-white py-20">

      <div className="max-w-6xl mx-auto px-6">

        <Breadcrumb
          items={[
            { label: "Serviços Dell", href: "/servicos" },
            { label: bairroData.nome }
          ]}
        />

        <div className="flex flex-col md:flex-row gap-10">

          <SidebarSEO />

          <div className="flex-1">

            <h1 className="text-4xl font-bold text-[#1F5F8B]">
              {servicoData.titulo} em {bairroData.nome}
            </h1>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {servicoData.descricao}
            </p>

            <p className="mt-4 text-gray-700">
              A Dell Resolve oferece assistência técnica especializada em notebooks
              Dell na região de <strong>{bairroData.nome}</strong>, Zona Norte de São Paulo.
            </p>

            <h2 className="text-2xl font-semibold mt-10">
              Serviços relacionados
            </h2>

            <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">

              <li>Troca de SSD em notebook Dell</li>
              <li>Upgrade de memória RAM</li>
              <li>Reparo de placa-mãe Dell</li>
              <li>Troca de tela notebook Dell</li>
              <li>Limpeza interna e manutenção</li>

            </ul>

          </div>

        </div>

      </div>

      <MapaZonaNorte />

    </main>

  )

}
