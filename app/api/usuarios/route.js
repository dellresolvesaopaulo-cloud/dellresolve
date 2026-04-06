import { requireApiRole } from "../../../lib/apiAuth"
import { supabaseAdmin } from "../../../lib/supabaseAdmin"

export const dynamic = "force-dynamic"

export async function POST(req) {
  try {
    const { errorResponse } = await requireApiRole(["admin"])

    if (errorResponse) {
      return errorResponse
    }

    const body = await req.json()

    const { data, error } = await supabaseAdmin
      .from("usuarios")
      .upsert([body])

    if (error) {
      console.error("ERRO SUPABASE:", error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json(data)

  } catch (err) {
    console.error("ERRO API:", err)
    return Response.json({ error: "Erro interno" }, { status: 500 })
  }
}
