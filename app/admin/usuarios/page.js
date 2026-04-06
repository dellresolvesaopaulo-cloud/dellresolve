"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function UsuariosPage() {
  const router = useRouter()

  const [usuarios, setUsuarios] = useState([])
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("tecnico")

  async function load() {
    const res = await fetch("/api/admin/usuarios")
    const data = await res.json()

    if (res.status === 401 || res.status === 403) {
      router.replace("/admin/login")
      return
    }

    if (!res.ok || data.error) {
      alert(data.error || "Erro ao carregar usuários")
      return
    }

    setUsuarios(data || [])
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      async function loadInitialUsers() {
        const res = await fetch("/api/admin/usuarios")
        const data = await res.json()

        if (res.status === 401 || res.status === 403) {
          router.replace("/admin/login")
          return
        }

        if (!res.ok || data.error) {
          alert(data.error || "Erro ao carregar usuários")
          return
        }

        setUsuarios(data || [])
      }

      loadInitialUsers()
    }, 0)

    return () => clearTimeout(timer)
  }, [router])

  async function criarUsuario() {

    if (!email) return alert("Digite o email")

    const res = await fetch("/api/admin/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, role })
    })

    const data = await res.json()

    if (res.status === 401 || res.status === 403) {
      router.replace("/admin/login")
      return
    }

    if (data.error) {
      alert(data.error)
      return
    }

    setEmail("")
    setRole("tecnico")

    load()
  }

  async function mudarRole(id, roleAtual) {

    const novoRole = roleAtual === "admin" ? "tecnico" : "admin"

    const res = await fetch("/api/admin/usuarios", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, role: novoRole })
    })

    const data = await res.json()

    if (res.status === 401 || res.status === 403) {
      router.replace("/admin/login")
      return
    }

    if (!res.ok || data.error) {
      alert(data.error || "Erro ao atualizar role")
      return
    }

    load()
  }

  // 🔥 NOVO — BLOQUEAR USUÁRIO
  async function toggleStatus(id, statusAtual) {

    const novo = statusAtual === "bloqueado" ? "ativo" : "bloqueado"

    const res = await fetch("/api/admin/usuarios", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, status: novo })
    })

    const data = await res.json()

    if (res.status === 401 || res.status === 403) {
      router.replace("/admin/login")
      return
    }

    if (!res.ok || data.error) {
      alert(data.error || "Erro ao atualizar status")
      return
    }

    load()
  }

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Usuários
      </h1>

      {/* FORM */}
      <div className="mb-6 flex gap-2">

        <input
          type="email"
          placeholder="Email do usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-64"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="tecnico">Técnico</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={criarUsuario}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>

      </div>

      {/* LISTA */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border text-left">Email</th>
            <th className="p-3 border text-left">Role</th>
            <th className="p-3 border text-left">Status</th>
            <th className="p-3 border text-left">Ação</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>

              <td className="p-3 border">{u.email}</td>

              <td className="p-3 border">{u.role}</td>

              <td className="p-3 border">
                {u.status === "bloqueado" ? "🔴 Bloqueado" : "🟢 Ativo"}
              </td>

              <td className="p-3 border flex gap-2">

                <button
                  onClick={() => mudarRole(u.id, u.role)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Role
                </button>

                <button
                  onClick={() => toggleStatus(u.id, u.status)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  {u.status === "bloqueado" ? "Desbloquear" : "Bloquear"}
                </button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}
