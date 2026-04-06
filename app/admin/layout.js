"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { getUserRole } from "../../lib/adminAuth"
import { supabase } from "../../lib/supabaseClient"
import AdminLayoutClient from "./AdminLayoutClient"

export default function AdminLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    let active = true

    async function init() {
      if (isLoginPage) {
        setLoading(false)
        return
      }

      const {
        data: { session }
      } = await supabase.auth.getSession()

      if (!session) {
        if (active) {
          setLoading(false)
          router.replace("/admin/login")
        }

        return
      }

      if (!active) return

      setUser(session.user)

      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("email", session.user.email)
        .maybeSingle()

      if (!active) return

      setRole(data?.role || getUserRole(session.user.email) || null)
      setLoading(false)
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active || isLoginPage) return

      if (!session) {
        setUser(null)
        setRole(null)
        setLoading(false)
        router.replace("/admin/login")
        return
      }

      setUser(session.user)
      router.refresh()
    })

    init()

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [router, isLoginPage])

  if (isLoginPage) {
    return children
  }

  if (loading) {
    return null
  }

  return (
    <AdminLayoutClient user={user} role={role}>
      {children}
    </AdminLayoutClient>
  )
}
