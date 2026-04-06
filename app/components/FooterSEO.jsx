import Link from "next/link"

export default function FooterSEO() {

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

  return (

    <section className="bg-gray-100 py-16">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        <div>

          <h3 className="font-semibold mb-4">
            Assistência Dell na Zona Norte
          </h3>

          <ul className="space-y-2 text-sm">

            {bairros.map((b) => (

              <li key={b}>
                <Link href={`/assistencia-dell/${b}`}>
                  Assistência Dell em {b.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              </li>

            ))}

          </ul>

        </div>



        <div>

          <h3 className="font-semibold mb-4">
            Modelos Dell atendidos
          </h3>

          <ul className="space-y-2 text-sm">

            {modelos.map((m) => (
  <li key={m}>
    <Link href={`/modelos-dell/${m}`}>
      Assistência Dell {m.charAt(0).toUpperCase() + m.slice(1)}
    </Link>
  </li>
))}

          </ul>

        </div>



        <div>

          <h3 className="font-semibold mb-4">
            Conteúdo técnico
          </h3>

          <ul className="space-y-2 text-sm">

            <li>
              <Link href="/blog/notebook-dell-nao-liga">
                Notebook Dell não liga
              </Link>
            </li>

            <li>
              <Link href="/blog/notebook-dell-lento">
                Notebook Dell lento
              </Link>
            </li>

            <li>
              <Link href="/blog/dell-nao-reconhece-carregador">
                Dell não reconhece carregador
              </Link>
            </li>

          </ul>

        </div>

      </div>

    </section>

  )

}
