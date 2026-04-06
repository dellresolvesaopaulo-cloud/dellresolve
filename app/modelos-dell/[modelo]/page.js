import { modelos } from "../../../data/modelos"
import SidebarSEO from "../../components/SidebarSEO"
import Breadcrumb from "../../components/Breadcrumb"
import MapaZonaNorte from "../../components/MapaZonaNorte"

export async function generateStaticParams() {

  return Object.keys(modelos).map((modelo) => ({
    modelo
  }))

}

export async function generateMetadata({ params }) {

  const { modelo } = await params
  const modeloData = modelos[modelo]

  if (!modeloData) return {}

  return {
    title: `Assistência técnica ${modeloData.nome}`,
    description: `Assistência técnica especializada em ${modeloData.nome}. Reparo de placa-mãe, upgrade de SSD, memória RAM e manutenção profissional.`,
  }

}

export default async function ModeloPage({ params }) {

  const { modelo } = await params
  const modeloData = modelos[modelo]

  if (!modeloData) return null

  const schema = {
    "@context": "https://schema.org",
    "@type": "ComputerRepair",
    name: "Dell Resolve",
    serviceType: `Assistência técnica ${modeloData.nome}`,
    areaServed: "São Paulo",
    url: `https://dellresolve.com/modelos-dell/${modelo}`
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
            { label: "Modelos Dell", href: "/modelos-dell/inspiron" },
            { label: modeloData.nome }
          ]}
        />

        <div className="flex flex-col md:flex-row gap-10">

          <SidebarSEO />

          <div className="flex-1">

            <h1 className="text-4xl font-bold text-[#1F5F8B]">
              Assistência técnica {modeloData.nome}
            </h1>

            <p className="mt-6 text-gray-700 leading-relaxed">
              A Dell Resolve oferece assistência técnica especializada em notebooks
              <strong> {modeloData.nome}</strong> na Zona Norte de São Paulo.
            </p>

            <p className="mt-4 text-gray-700">
              Realizamos diagnóstico técnico completo, reparo de placa-mãe,
              troca de SSD, upgrade de memória RAM e manutenção preventiva.
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
