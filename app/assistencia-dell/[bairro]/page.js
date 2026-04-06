import { bairros } from "../../../data/bairros"
import SidebarSEO from "../../components/SidebarSEO"
import Breadcrumb from "../../components/Breadcrumb"
import MapaZonaNorte from "../../components/MapaZonaNorte"
import LocalBusinessSchema from "../../components/LocalBusinessSchema"
import BairrosRelacionados from "../../components/BairrosRelacionados"
import ModelosRelacionados from "../../components/ModelosRelacionados"

export async function generateStaticParams() {

  return Object.keys(bairros).map((bairro) => ({
    bairro
  }))

}

export async function generateMetadata({ params }) {

  const { bairro } = await params
  const bairroData = bairros[bairro]

  if (!bairroData) return {}

  return {
    title: `Assistência Dell em ${bairroData.nome} | Dell Resolve`,
    description: `Assistência técnica Dell em ${bairroData.nome}, Zona Norte de São Paulo. Reparo de placa-mãe, troca de SSD, upgrade de memória e manutenção especializada.`,
  }

}

export default async function BairroPage({ params }) {

  const { bairro } = await params
  const bairroData = bairros[bairro]

  if (!bairroData) {

    return (
      <main className="min-h-screen bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#1F5F8B]">
            Bairro não encontrado
          </h1>
        </div>
      </main>
    )

  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "ComputerRepair",
    name: "Dell Resolve",
    serviceType: "Assistência técnica Dell",
    areaServed: bairroData.nome,
    url: `https://dellresolve.com/assistencia-dell/${bairro}`
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
            { label: bairroData.nome }
          ]}
        />

        <div className="flex flex-col md:flex-row gap-10">

          <SidebarSEO />

          <div className="flex-1">

            <h1 className="text-4xl font-bold text-[#1F5F8B]">
              Assistência técnica Dell em {bairroData.nome}
            </h1>

            <p className="mt-6 text-gray-700 leading-relaxed">
              A Dell Resolve oferece assistência técnica especializada em notebooks Dell
              na região de {bairroData.nome}, Zona Norte de São Paulo.
            </p>

            <p className="mt-4 text-gray-700">
              Realizamos diagnóstico técnico completo, reparo de placa-mãe,
              troca de SSD, upgrade de memória RAM, troca de tela e manutenção preventiva.
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


<BairrosRelacionados bairroAtual={bairro} />


<ModelosRelacionados bairro={bairro} />
      </div>



      <MapaZonaNorte />

    </main>

  )

}
