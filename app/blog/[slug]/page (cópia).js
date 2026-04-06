import { posts } from "../../../data/posts"
import { faq } from "../../../data/faq"
import { modelos } from "../../../data/modelos"
import { bairros } from "../../../data/bairros"
import Breadcrumb from "../../components/Breadcrumb"
import Link from "next/link"

export async function generateMetadata({ params }) {

  const { slug } = await params
  const post = posts[slug]

  if (!post) return {}

  return {
    title: post.title,
    description: post.description
  }

}

function linkify(text) {

  const parts = text.split(/(SSD|placa-mãe|tela)/gi)

  return parts.map((part, i) => {

    if (/ssd/i.test(part)) {
      return (
        <Link key={i} href="/servicos/troca-ssd-notebook-dell" className="text-blue-600 underline">
          {part}
        </Link>
      )
    }

    if (/placa-mãe/i.test(part)) {
      return (
        <Link key={i} href="/servicos/reparo-placa-mae-dell" className="text-blue-600 underline">
          {part}
        </Link>
      )
    }

    if (/tela/i.test(part)) {
      return (
        <Link key={i} href="/servicos/troca-tela-notebook-dell" className="text-blue-600 underline">
          {part}
        </Link>
      )
    }

    return part

  })

}

export default async function Post({ params }) {

  const { slug } = await params
  const post = posts[slug]

  const relatedPosts = Object.entries(posts)
    .filter(([key]) => key !== slug)
    .slice(0,3)

  if (!post) {
    return (
      <main className="min-h-screen bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#1F5F8B]">
            Artigo não encontrado
          </h1>
        </div>
      </main>
    )
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    author: {
      "@type": "Organization",
      name: "Dell Resolve"
    },
    publisher: {
      "@type": "Organization",
      name: "Dell Resolve",
      logo: {
        "@type": "ImageObject",
        url: "https://dellresolve.com/logo.png"
      }
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  }

  return (

    <main className="min-h-screen bg-white py-20">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* LAYOUT COM SIDEBAR */}

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">

        {/* ARTIGO */}

        <div className="md:col-span-2">

          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title }
            ]}
          />

          <h1 className="text-3xl font-bold text-[#1F5F8B]">
            {post.title}
          </h1>

          <div className="mt-6 text-gray-700 whitespace-pre-line leading-relaxed">
            {linkify(post.content)}
          </div>

          {/* Serviços */}

          <h2 className="text-2xl font-semibold mt-12 mb-6">
            Serviços relacionados
          </h2>

          <ul className="space-y-2 text-blue-600 underline">

            <li>
              <Link href="/servicos/troca-ssd-notebook-dell">
                Troca de SSD em notebook Dell
              </Link>
            </li>

            <li>
              <Link href="/servicos/reparo-placa-mae-dell">
                Reparo de placa-mãe Dell
              </Link>
            </li>

            <li>
              <Link href="/servicos/troca-tela-notebook-dell">
                Troca de tela notebook Dell
              </Link>
            </li>

          </ul>

          {/* FAQ */}

          <h2 className="text-2xl font-semibold mt-12 mb-6">
            Perguntas frequentes
          </h2>

          <div className="space-y-6">

            {faq.map((item, i) => (

              <div key={i} className="border rounded-lg p-6">

                <h3 className="font-semibold">
                  {item.question}
                </h3>

                <p className="text-gray-600 mt-2">
                  {item.answer}
                </p>

              </div>

            ))}

          </div>

          {/* Modelos Dell */}

          <h2 className="text-2xl font-semibold mt-12 mb-6">
            Modelos Dell atendidos
          </h2>

          <ul className="space-y-2 text-blue-600 underline">

            {Object.entries(modelos).map(([slug, modelo]) => (

              <li key={slug}>
                <Link href={`/modelos-dell/${slug}`}>
                  Assistência técnica {modelo.nome}
                </Link>
              </li>

            ))}

          </ul>

          {/* Bairros */}

          <h2 className="text-2xl font-semibold mt-12 mb-6">
            Atendimento na Zona Norte de São Paulo
          </h2>

          <ul className="space-y-2 text-blue-600 underline">

            {Object.entries(bairros).slice(0,6).map(([slug, bairro]) => (

              <li key={slug}>
                <Link href={`/assistencia-dell/${slug}`}>
                  Assistência Dell em {bairro.nome}
                </Link>
              </li>

            ))}

          </ul>

          {/* Artigos relacionados */}

          <h2 className="text-2xl font-semibold mt-12 mb-6">
            Artigos relacionados
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {relatedPosts.map(([slug, post]) => (

              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="border rounded-lg p-4 hover:shadow-lg transition"
              >

                <h3 className="font-semibold text-[#1F5F8B]">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  {post.description}
                </p>

              </Link>

            ))}

          </div>

        </div>

        {/* SIDEBAR */}

        <aside className="border-l pl-6">

          <h3 className="text-xl font-semibold text-[#1F5F8B] mb-6">
            Artigos do Blog
          </h3>

          <ul className="space-y-4">

            {Object.entries(posts).map(([slug, p]) => (

              <li key={slug}>

                <Link
                  href={`/blog/${slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {p.title}
                </Link>

              </li>

            ))}

          </ul>

        </aside>

      </div>

    </main>

  )

}
