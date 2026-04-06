import Link from "next/link"
import { modelos } from "../../data/modelos"

export default function ModelosRelacionados({ bairro }) {

  return (

    <div className="mt-16">

      <h2 className="text-2xl font-semibold mb-6">
        Modelos Dell atendidos em {bairro}
      </h2>

      <ul className="grid md:grid-cols-2 gap-2 text-blue-600 underline">

        {Object.entries(modelos).map(([slug, modelo]) => (

          <li key={slug}>

            <Link href={`/assistencia-dell-modelo-bairro/${slug}-${bairro}`}>

              Assistência {modelo.nome} em {bairro}

            </Link>

          </li>

        ))}

      </ul>

    </div>

  )

}
