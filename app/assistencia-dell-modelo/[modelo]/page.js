import { modelos } from "../../../data/modelos"
import MapaZonaNorte from "../../components/MapaZonaNorte"

export async function generateStaticParams() {

  return Object.keys(modelos).map((modelo) => ({
    modelo
  }))

}

export async function generateMetadata({ params }) {

  const modeloData = modelos[params.modelo]

  if (!modeloData) return {}

  return {
    title: `Assistência técnica ${modeloData.nome}`,
    description: `Assistência técnica especializada em notebooks ${modeloData.nome}. Reparo, upgrade de SSD, memória e diagnóstico profissional.`
  }

}

export default function ModeloPage({ params }) {

  const modeloData = modelos[params.modelo]

  if (!modeloData) {
    return null
  }

  return (

    <main className="min-h-screen bg-white py-20">

      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-[#1F5F8B]">
          Assistência técnica {modeloData.nome}
        </h1>

        <p className="mt-6 text-gray-700 leading-relaxed">
          A Dell Resolve realiza assistência técnica especializada em notebooks {modeloData.nome}.
        </p>

        <p className="mt-4 text-gray-700">
          Realizamos diagnóstico, upgrade de SSD, troca de memória RAM,
          reparo de placa-mãe e manutenção completa.
        </p>

        <h2 className="text-2xl font-semibold mt-10">
          Serviços realizados
        </h2>

        <ul className="mt-4 list-disc pl-6 text-gray-700">
          <li>Reparo de placa-mãe</li>
          <li>Upgrade de SSD</li>
          <li>Upgrade de memória RAM</li>
          <li>Troca de tela notebook Dell</li>
          <li>Limpeza interna e manutenção</li>
        </ul>

      </div>

      <MapaZonaNorte />

    </main>

  )

}
