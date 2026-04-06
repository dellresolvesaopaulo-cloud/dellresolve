export default function MapaZonaNorte() {

  const schema = {
    "@context": "https://schema.org",
    "@type": "ComputerRepair",
    "name": "Dell Resolve",
    "image": "http://dellresolve.com/lamp.svg",
    "url": "https://dellresolve.com",
    "telephone": "+5511946674001",

    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Francisco Ataíde, 241",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "02418-020",
      "addressCountry": "BR"
    },

    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.47123,
      "longitude": -46.63288
    },

    "areaServed": [
      "São Paulo",
      "Zona Norte de São Paulo",
      "Santana",
      "Tucuruvi",
      "Mandaqui",
      "Casa Verde",
      "Imirim",
      "Parada Inglesa",
      "Lauzane Paulista",
      "Cachoeirinha",
      "Limão",
      "Vila Guilherme",
      "Guarulhos",
      "Mairiporã"
    ],

    "sameAs": [
      "https://g.page/r/Cd9q--q1SPNuEBM",
      "https://g.page/r/Cd9q--q1SPNuEBM/review"
    ]
  }

  return (
    <>
      {/* Schema SEO Local */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-white py-16 mt-20">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Estamos na Zona Norte de São Paulo
          </h2>

          <p className="text-gray-700 mb-8">
            Atendimento especializado em notebooks Dell para Santana, Tucuruvi,
            Casa Verde, Mandaqui, Tremembé, Jardim São Paulo, Parada Inglesa,
            Lauzane Paulista, Cachoeirinha, Limão, Imirim, Vila Guilherme,
            Guarulhos, Mairiporã e toda a região da Zona Norte de São Paulo.
            Também oferecemos coleta e entrega programada (consulte antes).
          </p>

          <div className="rounded-lg overflow-hidden shadow">
            <iframe
              src="https://www.google.com/maps?q=Assist%C3%AAncia%20T%C3%A9cnica%20Dell%20Zona%20Norte%20-%20Dell%20Resolve&output=embed"
              width="100%"
              height="450"
              loading="lazy"
            ></iframe>
          </div>

        </div>

      </section>
    </>
  )
}
