import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function Categoria({ params }) {

  const categoria = params.categoria

  const { data: posts } = await supabase
    .from("posts")
    .select("*")

  const filtrados = posts.filter(
    (p) => p.categoria === categoria
  )

  const categorias = [...new Set(posts.map(p => p.categoria))]

  return (
    <main className="min-h-screen bg-white py-20">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* CONTEÚDO */}
        <div className="md:col-span-2">

          <h1 className="text-3xl font-bold mb-8">
            Categoria: {categoria}
          </h1>

          {filtrados.map((post, i) => (
            <div key={i} className="border p-6 rounded mb-6">

              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold text-blue-600">
                  {post.titulo}
                </h2>
              </Link>

              <p className="text-gray-600 mt-2">
                {post.descricao}
              </p>

            </div>
          ))}

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
                  className={`${
                    cat === categoria
                      ? "font-bold text-black"
                      : "text-blue-600"
                  }`}
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
