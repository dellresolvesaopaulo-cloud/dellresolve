import { redirect } from "next/navigation"
import { createSupabaseServer } from "./supabaseServer"
import { getUserRole } from "./adminAuth"
import { supabaseAdmin } from "./supabaseAdmin"

async function getDatabaseUser(email) {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("role, status")
    .eq("email", email)
    .maybeSingle()

  if (error) {
    console.error("ERRO ROLE PAGE:", error)
    return null
  }

  return data
}

export async function requireRole(allowedRoles = []) {
  const supabase = createSupabaseServer()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const databaseUser = user.email ? await getDatabaseUser(user.email) : null
  const role = databaseUser?.role || getUserRole(user.email)

  if (databaseUser?.status === "bloqueado") {
    redirect("/")
  }

  if (!allowedRoles.includes(role)) {
    redirect("/")
  }

  return { user, role }
}
