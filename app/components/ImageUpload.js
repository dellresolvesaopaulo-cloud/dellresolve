"use client"

import { useState } from "react"

export default function ImageUpload({ onUpload }) {

  const [preview, setPreview] = useState("")
  const [loading, setLoading] = useState(false)

  async function upload(file) {

    if (!file) return

    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    try {

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      if (data.url) {
        setPreview(data.url)
        onUpload(data.url)
      }

    } catch (err) {
      console.error(err)
      alert("Erro no upload")
    }

    setLoading(false)
  }

  function handleDrop(e) {
    e.preventDefault()
    upload(e.dataTransfer.files[0])
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed p-6 rounded text-center bg-gray-50"
    >

      <p className="text-sm text-gray-600">
        Arraste a imagem aqui ou clique
      </p>

      <input
        type="file"
        onChange={(e) => upload(e.target.files[0])}
        className="mt-2"
      />

      {loading && <p>Enviando...</p>}

      {preview && (
        <img src={preview} className="mt-4 rounded shadow" />
      )}

    </div>
  )
}
