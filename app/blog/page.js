import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function Blog() {

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (!posts) {
    return <div style={{ padding: 40 }}>Erro ao carregar</div>
  }

  // 🔥 gera categorias únicas
  const categorias = [...new Set(posts.map(p => p.categoria))]

  return (
    <main className="min-h-screen bg-white py-20">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* CONTEÚDO */}
        <div className="md:col-span-2">

          <h1 className="text-4xl font-bold text-[#1F5F8B] mb-10">
            Blog técnico Dell
          </h1>

          <div className="space-y-8">

            {posts.map((post, i) => (
              <div key={i} className="border p-6 rounded">

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold text-blue-600">
                    {post.titulo}
                  </h2>
                </Link>

                <p className="text-gray-600 mt-2">
                  {post.descricao}
                </p>

                <Link
                  href={`/categoria/${post.categoria}`}
                  className="text-sm text-blue-500 mt-2 inline-block"
                >
                  {post.categoria}
                </Link>

              </div>
            ))}

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
                <Link
                  href={`/categoria/${cat}`}
                  className="text-blue-600 hover:underline"
                >
                  {cat}
                </Link>
              </li>
            ))}

          </ul>

        </aside>

      </div>

    </main>
  )
}
