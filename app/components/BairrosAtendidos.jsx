import Link from "next/link"

export default function BairrosAtendidos() {

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

  return (

    <section className="bg-gray-50 py-20">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-[#1F5F8B]">
          Assistência Dell na Zona Norte de São Paulo
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Atendemos diversos bairros da Zona Norte com diagnóstico
          e reparo especializado em notebooks Dell.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-12">

          {bairros.map((bairro) => (

            <Link
              key={bairro}
              href={`/assistencia-dell/${bairro}`}
              className="border rounded-lg p-4 text-center hover:shadow-md transition"
            >
              Assistência Dell em {bairro.replace("-", " ")}
            </Link>

          ))}

        </div>

      </div>

    </section>

  )

}
