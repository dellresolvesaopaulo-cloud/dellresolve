import Link from "next/link"

const bairros = [
  "santana",
  "tucuruvi",
  "mandaqui",
  "casa-verde",
  "imirim",
  "parada-inglesa",
  "limao",
  "vila-guilherme"
]

const modelos = [
  "inspiron",
  "latitude",
  "xps",
  "alienware",
  "vostro",
  "precision"
]

function formatar(texto) {
  return texto
    .replace("-", " ")
    .replace(/\b\w/g, l => l.toUpperCase())
}

export default function SidebarSEO() {

  return (

    <aside className="w-full md:w-64 bg-gray-50 border rounded-lg p-6 space-y-8">

      <div>

        <h3 className="font-semibold text-lg mb-4">
          Assistência Dell na Zona Norte
        </h3>

        <ul className="space-y-2 text-sm">

          {bairros.map((bairro) => (

            <li key={bairro}>
              <Link
                href={`/assistencia-dell/${bairro}`}
                className="text-blue-600 hover:underline"
              >
                Assistência Dell em {formatar(bairro)}
              </Link>
            </li>

          ))}

        </ul>

      </div>

      <div>

        <h3 className="font-semibold text-lg mb-4">
          Modelos Dell atendidos
        </h3>

        <ul className="space-y-2 text-sm">

          {modelos.map((modelo) => (

            <li key={modelo}>
              <Link
                href={`/modelos-dell/${modelo}`}
                className="text-blue-600 hover:underline"
              >
                Dell {formatar(modelo)}
              </Link>
            </li>

          ))}

        </ul>

      </div>

    </aside>

  )

}
