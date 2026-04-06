import { createClient } from "@supabase/supabase-js"

function createSupabasePublishableClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Credenciais públicas do Supabase não configuradas")
  }

  return createClient(supabaseUrl, supabaseKey)
}

export async function salvarPost(post) {
  const supabase = createSupabasePublishableClient()

  const { error } = await supabase
    .from("posts")
    .insert([
      {
        titulo: post.titulo,
        slug: post.slug,
        descricao: post.descricao,
        conteudo: post.conteudo,
        categoria: post.categoria,
        autor: "Dell Resolve",
        tempo_leitura: 3,
        status: "publicado"
      }
    ])

  if (error) {
    console.error("Erro ao salvar post:", error)
  } else {
    console.log("Post salvo:", post.slug)
  }
}
