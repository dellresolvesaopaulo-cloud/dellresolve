"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function CadastroPage() {

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function criarConta() {
    try {
      setLoading(true)

      const { data: userData, error } = await supabase.auth.signUp({
        email,
        password: senha
      })

      if (error) {
        alert("Erro ao criar usuário")
        return
      }

      const user = userData.user

      const { data: empresa } = await supabase
        .from("empresas")
        .insert({ nome })
        .select()
        .single()

      await supabase.from("usuarios").insert({
        id: user.id,
        empresa_id: empresa.id,
        email
      })

      alert("Conta criada!")
      router.push("/login")

    } catch (err) {
      console.error(err)
      alert("Erro inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow w-80 space-y-4">

        <h1 className="text-xl font-bold text-center">
          Criar conta
        </h1>

        <input
          placeholder="Nome da empresa"
          className="w-full border p-2 rounded"
          onChange={e => setNome(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-2 rounded"
          onChange={e => setSenha(e.target.value)}
        />

        <button
          onClick={criarConta}
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded"
        >
          {loading ? "Criando..." : "Criar conta"}
        </button>

      </div>

    </div>
  )
}
