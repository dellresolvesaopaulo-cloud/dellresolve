import { requireApiRole } from "../../../lib/apiAuth"
import { supabaseAdmin } from "../../../lib/supabaseAdmin"

export const dynamic = "force-dynamic"

// 📥 GET (listar)
export async function GET() {
  const { errorResponse } = await requireApiRole(["admin", "tecnico"])

  if (errorResponse) {
    return errorResponse
  }

  const { data, error } = await supabaseAdmin
    .from("diagnosticos_servicos")
    .select("*")

  if (error) {
    console.error(error)
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data)
}

// ➕ POST (criar)
export async function POST(req) {
  const { errorResponse } = await requireApiRole(["admin", "tecnico"])

  if (errorResponse) {
    return errorResponse
  }

  const body = await req.json()

  const { data, error } = await supabaseAdmin
    .from("diagnosticos_servicos")
    .insert([body])

  if (error) {
    console.error(error)
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data)
}

// ❌ DELETE
export async function DELETE(req) {
  const { errorResponse } = await requireApiRole(["admin", "tecnico"])

  if (errorResponse) {
    return errorResponse
  }

  const { id } = await req.json()

  const { error } = await supabaseAdmin
    .from("diagnosticos_servicos")
    .delete()
    .eq("id", id)

  if (error) {
    console.error(error)
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true })
}
