import { servicos } from "../../../data/servicos"
import MapaZonaNorte from "../../components/MapaZonaNorte"

export async function generateStaticParams() {

  return Object.keys(servicos).map((servico) => ({
    servico
  }))

}

export async function generateMetadata({ params }) {

  const { servico } = await params
  const data = servicos[servico]

  if (!data) return {}

  return {
    title: `${data.titulo} | Dell Resolve`,
    description: data.descricao
  }

}

export default async function ServicoPage({ params }) {

  const { servico } = await params
  const data = servicos[servico]

  if (!data) {
    return (
      <main className="min-h-screen bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#1F5F8B]">
            Serviço não encontrado
          </h1>
        </div>
      </main>
    )
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.nome,
    provider: {
      "@type": "Organization",
      name: "Dell Resolve",
      url: "https://dellresolve.com"
    },
    areaServed: {
      "@type": "Place",
      name: "Zona Norte de São Paulo"
    }
  }

  return (

    <main className="min-h-screen bg-white py-20">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-[#1F5F8B]">
          {data.titulo}
        </h1>

        <p className="mt-6 text-gray-700 leading-relaxed">
          {data.descricao}
        </p>

        <p className="mt-4 text-gray-700">
          A Dell Resolve oferece atendimento especializado em notebooks Dell
          com diagnóstico técnico profissional e reparos avançados.
        </p>

        <h2 className="text-2xl font-semibold mt-10">
          O que realizamos
        </h2>

        <ul className="mt-4 text-gray-700 list-disc pl-6 space-y-2">
          <li>Diagnóstico técnico completo</li>
          <li>Peças compatíveis com notebooks Dell</li>
          <li>Reparo profissional</li>
          <li>Testes de funcionamento e desempenho</li>
        </ul>

      </div>

      <MapaZonaNorte />

    </main>

  )

}
