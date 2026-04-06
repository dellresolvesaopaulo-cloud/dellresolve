import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// =========================
// SEO
// =========================
export async function generateMetadata({ params }) {

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug

  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!data) {
    return { title: "Post não encontrado" }
  }

  const url = `https://dellresolve.com/blog/${data.slug}`

  return {
    title: data.titulo,
    description: data.descricao || "",
    alternates: { canonical: url },
    openGraph: {
      title: data.titulo,
      description: data.descricao,
      url,
      type: "article",
    },
  }
}

// =========================
// PAGE
// =========================
export default async function Post({ params }) {

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single()

  const { data: allPosts } = await supabase
    .from("posts")
    .select("*")

  if (!post) {
    return <div style={{ padding: 40 }}>Post não encontrado</div>
  }

  // =========================
  // SCHEMA BLOG
  // =========================
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.descricao,
    datePublished: post.created_at,
    author: {
      "@type": "Organization",
      name: "Dell Resolve"
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://dellresolve.com/blog/${post.slug}`
    }
  }

  // =========================
  // FAQ SCHEMA
  // =========================
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `O que fazer quando ${post.titulo.toLowerCase()}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Recomendamos diagnóstico técnico especializado para evitar danos maiores."
        }
      },
      {
        "@type": "Question",
        name: "Quanto custa o conserto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "O valor depende do defeito. O ideal é realizar diagnóstico técnico."
        }
      },
      {
        "@type": "Question",
        name: "Vale a pena consertar notebook Dell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Na maioria dos casos sim, especialmente upgrades e reparos simples."
        }
      }
    ]
  }

  // =========================
  // BREADCRUMB SCHEMA
  // =========================
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dellresolve.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://dellresolve.com/blog" },
      { "@type": "ListItem", position: 3, name: post.categoria, item: `https://dellresolve.com/categoria/${post.categoria}` },
      { "@type": "ListItem", position: 4, name: post.titulo, item: `https://dellresolve.com/blog/${post.slug}` }
    ]
  }

  const categorias = [...new Set(allPosts.map(p => p.categoria))]

  const relacionados = allPosts
    .filter(p => p.categoria === post.categoria && p.slug !== post.slug)
    .slice(0, 5)

  return (
    <main className="min-h-screen bg-white py-20">

      {/* SCHEMAS */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* CONTEÚDO */}
        <div className="md:col-span-2">

          {/* BREADCRUMB VISUAL */}
          <div className="text-sm text-gray-500 mb-4">
            <Link href="/">Home</Link> /{" "}
            <Link href="/blog">Blog</Link> /{" "}
            <Link href={`/categoria/${post.categoria}`}>
              {post.categoria}
            </Link> /{" "}
            {post.titulo}
          </div>

          <h1 className="text-4xl font-bold text-[#1F5F8B]">
            {post.titulo}
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            {post.created_at &&
              new Date(post.created_at).toLocaleDateString("pt-BR")}
          </p>

          {post.descricao && (
            <p className="text-gray-600 mt-6">
              {post.descricao}
            </p>
          )}

          <div className="mt-8 whitespace-pre-line">
            {post.conteudo}
          </div>

        </div>

        {/* SIDEBAR */}
        <aside>

          <h2 className="text-xl font-bold mb-4">
            Categorias
          </h2>

          <ul className="space-y-2">
            {categorias.map((cat, i) => (
              <li key={i}>
                <Link href={`/categoria/${cat}`} className="text-blue-600">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">
            Posts relacionados
          </h2>

          <ul className="space-y-2">
            {relacionados.map((p, i) => (
              <li key={i}>
                <Link href={`/blog/${p.slug}`} className="text-blue-600">
                  {p.titulo}
                </Link>
              </li>
            ))}
          </ul>

        </aside>

      </div>

    </main>
  )
}
