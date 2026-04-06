import { modelos } from "../../../data/modelos"
import { bairros } from "../../../data/bairros"
import { problemas } from "../../../data/problemas"

import SidebarSEO from "../../components/SidebarSEO"
import Breadcrumb from "../../components/Breadcrumb"
import MapaZonaNorte from "../../components/MapaZonaNorte"
import ProblemasRelacionados from "../../components/ProblemasRelacionados"

export function generateStaticParams() {

  const params = []

  for (const modelo of Object.keys(modelos)) {
    for (const problema of Object.keys(problemas)) {
      for (const bairro of Object.keys(bairros)) {

        params.push({
          slug: `${modelo}-${problema}-${bairro}`
        })

      }
    }
  }

  return params
}

export async function generateMetadata({ params }) {

  const { slug } = params

  if (!slug) return {}

  const parts = slug.split("-")

  if (parts.length < 3) return {}

  const modelo = parts[0]
  const problema = parts[1]
  const bairro = parts.slice(2).join("-")

  const modeloData = modelos[modelo]
  const problemaData = problemas[problema]
  const bairroData = bairros[bairro]

  if (!modeloData || !problemaData || !bairroData) return {}

  return {
    title: `${modeloData.nome} ${problemaData.nome} em ${bairroData.nome} | Dell Resolve`,
    description: `Assistência técnica especializada para ${modeloData.nome} ${problemaData.nome} no bairro ${bairroData.nome}, Zona Norte de São Paulo.`
  }

}

export default function Page({ params }) {

  const { slug } = params

  if (!slug) return null

  const parts = slug.split("-")

  if (parts.length < 3) return null

  const modelo = parts[0]
  const problema = parts[1]
  const bairro = parts.slice(2).join("-")

  const modeloData = modelos[modelo]
  const problemaData = problemas[problema]
  const bairroData = bairros[bairro]

  if (!modeloData || !problemaData || !bairroData) {

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
            { label: "Modelos Dell", href: `/modelos-dell/${modelo}` },
            { label: bairroData.nome }
          ]}
        />

        <div className="flex flex-col md:flex-row gap-10">

          <SidebarSEO />

          <div className="flex-1">

            <h1 className="text-4xl font-bold text-[#1F5F8B]">
              {modeloData.nome} {problemaData.nome} em {bairroData.nome}
            </h1>

            <p className="mt-6 text-gray-700 leading-relaxed">
              Se o seu <strong>{modeloData.nome}</strong> está
              <strong> {problemaData.nome}</strong> no bairro
              <strong> {bairroData.nome}</strong>, a Dell Resolve oferece
              diagnóstico técnico especializado e manutenção completa
              em notebooks Dell.
            </p>

            <h2 className="text-2xl font-semibold mt-10">
              Serviços realizados
            </h2>

            <ul className="mt-4 text-gray-700 list-disc pl-6 space-y-2">
              <li>Diagnóstico técnico especializado</li>
              <li>Reparo de placa-mãe Dell</li>
              <li>Troca de SSD</li>
              <li>Upgrade de memória RAM</li>
              <li>Troca de tela notebook Dell</li>
              <li>Limpeza interna e manutenção preventiva</li>
            </ul>

            <ProblemasRelacionados
              modelo={modelo}
              problema={problema}
              bairro={bairro}
            />

          </div>

        </div>

      </div>

      <MapaZonaNorte />

    </main>

  )

}

