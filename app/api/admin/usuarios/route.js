import { NextResponse } from "next/server"
import { requireApiRole } from "../../../../lib/apiAuth"
import { supabaseAdmin } from "../../../../lib/supabaseAdmin"

export const dynamic = "force-dynamic"

export async function GET() {
  const { errorResponse } = await requireApiRole(["admin"])

  if (errorResponse) {
    return errorResponse
  }

  const { data, error } = await supabaseAdmin
    .from("users")
    .select("id, email, role, status")
    .order("email")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data || [])
}

export async function POST(req) {
  const { errorResponse } = await requireApiRole(["admin"])

  if (errorResponse) {
    return errorResponse
  }

  const body = await req.json()
  const { email, role } = body
  const normalizedEmail = email?.trim()?.toLowerCase()
  const normalizedRole = role?.trim()

  if (!normalizedEmail || !normalizedRole) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
  }

  if (!["admin", "tecnico"].includes(normalizedRole)) {
    return NextResponse.json({ error: "Role inválida" }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from("users")
    .insert([{ email: normalizedEmail, role: normalizedRole }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function PATCH(req) {
  const { errorResponse } = await requireApiRole(["admin"])

  if (errorResponse) {
    return errorResponse
  }

  const body = await req.json()
  const { id, role, status } = body

  if (!id) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 })
  }

  const payload = {}

  if (role !== undefined) {
    if (!["admin", "tecnico"].includes(role)) {
      return NextResponse.json({ error: "Role inválida" }, { status: 400 })
    }

    payload.role = role
  }

  if (status !== undefined) {
    if (!["ativo", "bloqueado"].includes(status)) {
      return NextResponse.json({ error: "Status inválido" }, { status: 400 })
    }

    payload.status = status
  }

  if (Object.keys(payload).length === 0) {
    return NextResponse.json({ error: "Nenhum campo para atualizar" }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from("users")
    .update(payload)
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
