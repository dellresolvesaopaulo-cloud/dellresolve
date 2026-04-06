export default function FaqDell() {

  const faq = [
    {
      q: "Notebook Dell não liga, o que fazer?",
      a: "Verifique o carregador, a tomada e se há luzes no notebook. Caso não apresente nenhum sinal de energia, pode ser necessário diagnóstico técnico."
    },
    {
      q: "Notebook Dell muito lento tem solução?",
      a: "Sim. Em muitos casos o upgrade para SSD e aumento de memória RAM melhora bastante o desempenho."
    },
    {
      q: "Quanto custa consertar notebook Dell?",
      a: "O valor depende do defeito. O ideal é realizar um diagnóstico técnico para identificar o problema."
    },
    {
      q: "Vocês consertam placa-mãe Dell?",
      a: "Sim. Realizamos diagnóstico e reparo especializado em placa-mãe de notebooks Dell."
    }
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  }

  return (

    <section className="py-20 bg-white">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-[#1F5F8B]">
          Perguntas frequentes
        </h2>

        <div className="mt-10 space-y-6">

          {faq.map((item, i) => (

            <div key={i} className="border rounded-lg p-6">

              <h3 className="font-semibold">
                {item.q}
              </h3>

              <p className="text-gray-600 mt-2">
                {item.a}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}
