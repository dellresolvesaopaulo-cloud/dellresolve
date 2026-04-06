import Link from "next/link"
import { bairros } from "../../data/bairros"

export default function BairrosRelacionados({ bairroAtual }) {

  return (

    <div className="mt-16">

      <h2 className="text-2xl font-semibold mb-6">
        Atendimento em outros bairros da Zona Norte
      </h2>

      <ul className="grid md:grid-cols-2 gap-2 text-blue-600 underline">

        {Object.entries(bairros).map(([slug, bairro]) => {

          if (slug === bairroAtual) return null

          return (

            <li key={slug}>

              <Link href={`/assistencia-dell/${slug}`}>

                Assistência Dell em {bairro.nome}

              </Link>

            </li>

          )

        })}

      </ul>

    </div>

  )

}
