"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import AdminLayoutClient from "./AdminLayoutClient"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function AdminLayout({ children }) {

  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  useEffect(() => {
    let active = true

    async function init() {

      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/admin/login")
        return
      }

      if (!active) return

      setUser(session.user)

      // 🔥 pega role no banco
      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("email", session.user.email)
        .single()

      if (!active) return

      setRole(data?.role)

      setLoading(false)
    }

    init()

    return () => {
      active = false
    }
  }, [router])

  if (loading) return null

  return (
    <AdminLayoutClient user={user} role={role}>
      {children}
    </AdminLayoutClient>
  )
}
