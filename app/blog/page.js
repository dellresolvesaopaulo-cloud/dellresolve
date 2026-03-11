import Link from "next/link"

export default function Blog() {

  const posts = [

    {
      slug: "notebook-dell-nao-liga",
      title: "Notebook Dell não liga: principais causas",
      excerpt:
        "Veja os principais motivos que fazem um notebook Dell não ligar e quando procurar assistência técnica."
    },

    {
      slug: "notebook-dell-lento",
      title: "Notebook Dell muito lento? Veja como resolver",
      excerpt:
        "Saiba como melhorar o desempenho do seu notebook Dell com upgrade de SSD e memória."
    },

    {
      slug: "dell-nao-reconhece-carregador",
      title: "Dell não reconhece carregador",
      excerpt:
        "Problema comum em notebooks Dell pode estar relacionado ao carregador ou placa-mãe."
    }

  ]

  return (

    <main className="min-h-screen bg-white py-20">

      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center text-[#1F5F8B]">
          Blog técnico Dell
        </h1>

        <p className="text-center text-gray-600 mt-4">
          Dicas e soluções para problemas comuns em notebooks Dell.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-16">

          {posts.map((post) => (

            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="border rounded-xl p-8 hover:shadow-lg transition"
            >

              <h2 className="text-xl font-semibold mb-3">
                {post.title}
              </h2>

              <p className="text-gray-600 text-sm">
                {post.excerpt}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </main>

  )

}