import { modelos } from "../../../data/modelos"
import { bairros } from "../../../data/bairros"
import SidebarSEO from "../../components/SidebarSEO"
import Breadcrumb from "../../components/Breadcrumb"
import MapaZonaNorte from "../../components/MapaZonaNorte"

export function generateStaticParams() {

  const params = []

  for (const modelo of Object.keys(modelos)) {
    for (const bairro of Object.keys(bairros)) {

      params.push({
        slug: `${modelo}-${bairro}`
      })

    }
  }

  return params
}

export async function generateMetadata({ params }) {

  const { slug } = await params

  if (!slug) return {}

  const parts = slug.split("-")

  if (parts.length < 2) return {}

  const modelo = parts[0]
  const bairro = parts.slice(1).join("-")

  const modeloData = modelos[modelo]
  const bairroData = bairros[bairro]

  if (!modeloData || !bairroData) return {}

  return {
    title: `Assistência ${modeloData.nome} em ${bairroData.nome} | Dell Resolve`,
    description: `Assistência técnica especializada em ${modeloData.nome} no bairro ${bairroData.nome}, Zona Norte de São Paulo. Troca de SSD, reparo de placa-mãe, upgrade de memória e manutenção.`,
  }

}

export default async function Page({ params }) {

  const { slug } = await params

  if (!slug) return null

  const parts = slug.split("-")

  if (parts.length < 2) return null

  const modelo = parts[0]
  const bairro = parts.slice(1).join("-")

  const modeloData = modelos[modelo]
  const bairroData = bairros[bairro]

  if (!modeloData || !bairroData) {

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "ComputerRepair",
    name: "Dell Resolve",
    url: "https://dellresolve.com",
    telephone: "+5511946674001",
    serviceType: `Assistência ${modeloData.nome}`,
    areaServed: {
      "@type": "Place",
      name: bairroData.nome
    }
  }

  return (

    <main className="min-h-screen bg-white py-20">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-6xl mx-auto px-6">

        <Breadcrumb
          items={[
            { label: "Assistência Dell", href: "/assistencia-dell/santana" },
            { label: modeloData.nome, href: `/modelos-dell/${modelo}` },
            { label: bairroData.nome }
          ]}
        />

        <div className="flex flex-col md:flex-row gap-10">

          <SidebarSEO />

          <div className="flex-1">

            <h1 className="text-4xl font-bold text-[#1F5F8B]">
              Assistência {modeloData.nome} em {bairroData.nome}
            </h1>

            <p className="mt-6 text-gray-700 leading-relaxed">

              A Dell Resolve oferece assistência técnica especializada em notebooks
              <strong> {modeloData.nome}</strong> no bairro <strong>{bairroData.nome}</strong>,
              Zona Norte de São Paulo.

            </p>

            <p className="mt-4 text-gray-700">

              Realizamos diagnóstico técnico completo, reparo de placa-mãe,
              troca de SSD, upgrade de memória RAM, troca de tela e manutenção
              preventiva em notebooks Dell.

            </p>

            <h2 className="text-2xl font-semibold mt-10">
              Serviços realizados
            </h2>

            <ul className="mt-4 text-gray-700 list-disc pl-6 space-y-2">

              <li>Troca de SSD em notebook Dell</li>
              <li>Upgrade de memória RAM</li>
              <li>Reparo de placa-mãe Dell</li>
              <li>Troca de tela notebook Dell</li>
              <li>Limpeza interna e manutenção</li>
              <li>Diagnóstico técnico especializado</li>

            </ul>

          </div>

        </div>

      </div>

      <MapaZonaNorte />

    </main>

  )
}
