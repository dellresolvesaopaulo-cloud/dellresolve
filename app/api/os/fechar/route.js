import { NextResponse } from "next/server"
import { requireApiRole } from "../../../../lib/apiAuth"
import { supabaseAdmin } from "../../../../lib/supabaseAdmin"

export const dynamic = "force-dynamic"

export async function POST(req) {
  try {
    const { errorResponse } = await requireApiRole(["admin", "tecnico"])

    if (errorResponse) {
      return errorResponse
    }

    const { numero } = await req.json()

    const { error } = await supabaseAdmin
      .from("ordens_servico")
      .update({ status: "fechada" })
      .eq("numero", numero)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })

  } catch (err) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
