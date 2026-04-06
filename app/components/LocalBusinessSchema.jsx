export default function LocalBusinessSchema({ bairro }) {

  const schema = {

    "@context": "https://schema.org",

    "@type": "ComputerRepair",

    name: "Dell Resolve",

    image: "https://dellresolve.com/lamp.svg",

    url: "https://dellresolve.com",

    telephone: "+5511946674001",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Francisco Ataíde, 241",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "02418-020",
      addressCountry: "BR"
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.47123,
      longitude: -46.63288
    },

    areaServed: {

      "@type": "Place",

      name: bairro
    },

    priceRange: "$$",

    sameAs: [
      "https://g.page/r/Cd9q--q1SPNuEBM",
      "https://g.page/r/Cd9q--q1SPNuEBM/review"
    ]

  }

  return (

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />

  )

}
