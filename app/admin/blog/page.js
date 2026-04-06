"use client"

import { useState } from "react"
import ImageUpload from "../../components/ImageUpload"

export default function AdminBlog() {

  const [titulo, setTitulo] = useState("")
  const [slug, setSlug] = useState("")
  const [categoria, setCategoria] = useState("")
  const [conteudo, setConteudo] = useState("")

  // 🔥 NOVOS CAMPOS
  const [descricao, setDescricao] = useState("")
  const [autor, setAutor] = useState("")
  const [tags, setTags] = useState("")
  const [imagem, setImagem] = useState("")
  const [status, setStatus] = useState("rascunho")

  async function salvar() {

    if (!titulo || !slug) {
      alert("Preencha título e slug")
      return
    }

    // 🔥 TEMPO DE LEITURA AUTOMÁTICO
    const tempoLeitura = Math.ceil(
      conteudo.split(" ").length / 200
    )

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo,
        slug,
        descricao,
        conteudo,
        categoria,
        autor,
        tags: tags.split(",").map(t => t.trim()),
        imagem_url: imagem,
        tempo_leitura: tempoLeitura,
        status
      })
    })

    if (!res.ok) {
      const err = await res.json()
alert("Erro: " + err.error)
      return
    }

    alert("Post criado!")

    setTitulo("")
    setSlug("")
    setCategoria("")
    setConteudo("")
    setDescricao("")
    setAutor("")
    setTags("")
    setImagem("")
    setStatus("rascunho")
  }

  return (
    <div className="p-6 max-w-2xl">

      <h1 className="text-2xl font-bold mb-4">
        Novo Artigo
      </h1>

      <input
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        placeholder="Slug (ex: trocar-ssd-dell)"
        value={slug}
        onChange={e => setSlug(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        placeholder="Categoria (ex: dell-notebooks)"
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      {/* 🔥 NOVO */}
      <input
        placeholder="Descrição (SEO)"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      {/* 🔥 NOVO */}
      <input
        placeholder="Autor"
        value={autor}
        onChange={e => setAutor(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      {/* 🔥 NOVO */}
      <input
        placeholder="Tags (ex: dell, notebook, upgrade)"
        value={tags}
        onChange={e => setTags(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      {/* 🔥 NOVO */}
      <input
        placeholder="URL da imagem"
        value={imagem}
        onChange={e => setImagem(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      {/* 🔥 NOVO */}
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option value="rascunho">Rascunho</option>
        <option value="publicado">Publicado</option>
      </select>

      <textarea
        placeholder="Conteúdo"
        value={conteudo}
        onChange={e => setConteudo(e.target.value)}
        className="border p-2 w-full h-40 mb-4"
      />

      <button
        onClick={salvar}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Salvar
      </button>

    </div>
  )
}
