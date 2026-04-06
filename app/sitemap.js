import { createClient } from "@supabase/supabase-js"

import { bairros } from "../data/bairros"
import { posts as localPosts } from "../data/posts"
import { servicos } from "../data/servicos"
import { modelos } from "../data/modelos"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function sitemap() {

  const baseUrl = "https://dellresolve.com"

  // =========================
  // STATIC
  // =========================
  const staticPages = ["", "/servicos", "/blog", "/contato"]

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
  }))

  // =========================
  // BLOG (CMS - SUPABASE)
  // =========================
  const { data: dbPosts } = await supabase
    .from("posts")
    .select("slug, created_at")

  const cmsUrls = (dbPosts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.created_at || new Date(),
  }))

  // =========================
  // BLOG (LOCAL - FALLBACK)
  // =========================
  const localUrls = Object.keys(localPosts).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
  }))

  // =========================
  // BAIRROS
  // =========================
  const bairroUrls = Object.keys(bairros).map((bairro) => ({
    url: `${baseUrl}/assistencia-dell/${bairro}`,
    lastModified: new Date(),
  }))

  // =========================
  // MODELOS
  // =========================
  const modeloUrls = Object.keys(modelos).map((modelo) => ({
    url: `${baseUrl}/modelos-dell/${modelo}`,
    lastModified: new Date(),
  }))

  // =========================
  // SERVIÇOS
  // =========================
  const servicoUrls = Object.keys(servicos).map((servico) => ({
    url: `${baseUrl}/servicos/${servico}`,
    lastModified: new Date(),
  }))

  // =========================
  // MODELO + BAIRRO
  // =========================
  const modeloBairroUrls = []

  for (const modelo of Object.keys(modelos)) {
    for (const bairro of Object.keys(bairros)) {
      modeloBairroUrls.push({
        url: `${baseUrl}/assistencia-dell-modelo-bairro/${modelo}-${bairro}`,
        lastModified: new Date(),
      })
    }
  }

  // =========================
  // SERVIÇO + MODELO
  // =========================
  const servicoModeloUrls = []

  for (const modelo of Object.keys(modelos)) {
    for (const servico of Object.keys(servicos)) {
      servicoModeloUrls.push({
        url: `${baseUrl}/servico-dell-modelo/${servico}-${modelo}`,
        lastModified: new Date(),
      })
    }
  }

  // =========================
  // SERVIÇO + BAIRRO
  // =========================
  const servicoBairroUrls = []

  for (const servico of Object.keys(servicos)) {
    for (const bairro of Object.keys(bairros)) {
      servicoBairroUrls.push({
        url: `${baseUrl}/servicos-dell/${servico}-${bairro}`,
        lastModified: new Date(),
      })
    }
  }

  // =========================
  // FINAL
  // =========================
  return [
    ...staticUrls,

    // 🔥 BLOG (IMPORTANTE)
    ...cmsUrls,
    ...localUrls,

    ...bairroUrls,
    ...modeloUrls,
    ...servicoUrls,
    ...modeloBairroUrls,
    ...servicoModeloUrls,
    ...servicoBairroUrls
  ]
}
