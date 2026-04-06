import { servicos } from "../../data/servicos"
import { modelos } from "../../data/modelos"
import { bairros } from "../../data/bairros"
import { posts } from "../../data/posts"
import Link from "next/link"
import MapaZonaNorte from "../components/MapaZonaNorte"

export const metadata = {
  title: "Assistência técnica Dell em São Paulo",
  description:
    "Assistência técnica especializada em notebooks Dell na Zona Norte de São Paulo. Diagnóstico, reparo de placa-mãe, troca de SSD e manutenção."
}

export default function AssistenciaDell() {

  return (

    <main className="min-h-screen bg-white py-20">

      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-[#1F5F8B]">
          Assistência técnica Dell em São Paulo
        </h1>

        <p className="mt-6 text-gray-700 leading-relaxed">
          A Dell Resolve oferece assistência técnica especializada em notebooks
          Dell na Zona Norte de São Paulo. Realizamos diagnóstico técnico,
          reparo de placa-mãe, troca de SSD, upgrade de memória RAM,
          troca de tela e manutenção preventiva.
        </p>

        {/* Serviços */}

        <h2 className="text-2xl font-semibold mt-12 mb-6">
          Serviços para notebooks Dell
        </h2>

        <ul className="space-y-2 text-blue-600 underline">

          {Object.entries(servicos).map(([slug, servico]) => (

            <li key={slug}>
              <Link href={`/servicos/${slug}`}>
                {servico.nome}
              </Link>
            </li>

          ))}

        </ul>


        {/* Modelos */}

        <h2 className="text-2xl font-semibold mt-12 mb-6">
          Modelos Dell atendidos
        </h2>

        <ul className="space-y-2 text-blue-600 underline">

          {Object.entries(modelos).map(([slug, modelo]) => (

            <li key={slug}>
              <Link href={`/modelos-dell/${slug}`}>
                Assistência técnica {modelo.nome}
              </Link>
            </li>

          ))}

        </ul>


        {/* Bairros */}

        <h2 className="text-2xl font-semibold mt-12 mb-6">
          Atendimento na Zona Norte de São Paulo
        </h2>

        <ul className="space-y-2 text-blue-600 underline">

          {Object.entries(bairros).map(([slug, bairro]) => (

            <li key={slug}>
              <Link href={`/assistencia-dell/${slug}`}>
                Assistência Dell em {bairro.nome}
              </Link>
            </li>

          ))}

        </ul>


        {/* Blog */}

        <h2 className="text-2xl font-semibold mt-12 mb-6">
          Artigos técnicos
        </h2>

        <ul className="space-y-2 text-blue-600 underline">

          {Object.entries(posts).slice(0,5).map(([slug, post]) => (

            <li key={slug}>
              <Link href={`/blog/${slug}`}>
                {post.title}
              </Link>
            </li>

          ))}

        </ul>

      </div>

      <MapaZonaNorte />

    </main>

  )

}
