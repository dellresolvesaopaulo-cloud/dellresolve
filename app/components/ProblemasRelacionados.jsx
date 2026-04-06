import Link from "next/link"
import { modelos } from "../../data/modelos"
import { bairros } from "../../data/bairros"
import { problemas } from "../../data/problemas"

export default function ProblemasRelacionados({ modelo, problema, bairro }) {

  return (

    <div className="mt-16 space-y-10">

      {/* Problemas do mesmo modelo */}

      <div>

        <h3 className="text-xl font-semibold mb-4">
          Outros problemas do {modelos[modelo].nome}
        </h3>

        <ul className="space-y-2 text-blue-600 underline">

          {Object.entries(problemas).map(([slug, p]) => (

            <li key={slug}>

              <Link href={`/problemas-dell/${modelo}-${slug}-${bairro}`}>

                {modelos[modelo].nome} {p.nome}

              </Link>

            </li>

          ))}

        </ul>

      </div>

      {/* Problemas no mesmo bairro */}

      <div>

        <h3 className="text-xl font-semibold mb-4">
          Problemas Dell em {bairros[bairro].nome}
        </h3>

        <ul className="space-y-2 text-blue-600 underline">

          {Object.entries(problemas).map(([slug, p]) => (

            <li key={slug}>

              <Link href={`/problemas-dell/inspiron-${slug}-${bairro}`}>

                Dell {p.nome} em {bairros[bairro].nome}

              </Link>

            </li>

          ))}

        </ul>

      </div>

      {/* Mesmo problema em outros modelos */}

      <div>

        <h3 className="text-xl font-semibold mb-4">
          Notebooks Dell com {problemas[problema].nome}
        </h3>

        <ul className="space-y-2 text-blue-600 underline">

          {Object.entries(modelos).map(([slug, m]) => (

            <li key={slug}>

              <Link href={`/problemas-dell/${slug}-${problema}-${bairro}`}>

                {m.nome} {problemas[problema].nome}

              </Link>

            </li>

          ))}

        </ul>

      </div>

    </div>

  )

}
