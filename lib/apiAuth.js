import { NextResponse } from "next/server"
import { unstable_noStore as noStore } from "next/cache"
import { getUserRole } from "./adminAuth"
import { createSupabaseServer } from "./supabaseServer"
import { supabaseAdmin } from "./supabaseAdmin"

async function getRoleFromDatabase(email) {
  try {
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("role, status")
      .eq("email", email)
      .maybeSingle()

    if (error) {
      console.error("ERRO ROLE API:", error)
      return null
    }

    return data
  } catch (err) {
    console.error("ERRO ROLE API:", err)
    return null
  }
}

export async function requireApiRole(allowedRoles = []) {
  noStore()

  const supabase = createSupabaseServer()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return {
      user: null,
      role: null,
      errorResponse: NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      )
    }
  }

  const databaseUser = await getRoleFromDatabase(user.email)

  if (databaseUser?.status === "bloqueado") {
    return {
      user,
      role: databaseUser.role || null,
      errorResponse: NextResponse.json(
        { error: "Usuário bloqueado" },
        { status: 403 }
      )
    }
  }

  const role = databaseUser?.role || getUserRole(user.email)

  if (!allowedRoles.includes(role)) {
    return {
      user,
      role,
      errorResponse: NextResponse.json(
        { error: "Sem permissão" },
        { status: 403 }
      )
    }
  }

  return {
    user,
    role,
    errorResponse: null
  }
}
