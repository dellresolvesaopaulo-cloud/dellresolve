import { requireApiRole } from "../../../lib/apiAuth"
import { supabaseAdmin } from "../../../lib/supabaseAdmin"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const { errorResponse } = await requireApiRole(["admin", "tecnico"])

    if (errorResponse) {
      return errorResponse
    }

    const { data, error } = await supabaseAdmin
      .from("ordens_servico")
      .select(`
        *,
        clientes ( nome ),
        equipamentos ( service_tag, modelo )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("ERRO SUPABASE:", error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({
      lista: data || []
    })

  } catch (err) {
    console.error("ERRO API DASHBOARD:", err)
    return Response.json({ error: "Erro interno" }, { status: 500 })
  }
}
