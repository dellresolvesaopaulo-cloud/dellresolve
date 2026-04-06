import { requireApiRole } from "../../../../../lib/apiAuth"
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin"

export const dynamic = "force-dynamic"

export async function GET(req, context) {
  const { errorResponse } = await requireApiRole(["admin", "tecnico"])

  if (errorResponse) {
    return errorResponse
  }

  const { id } = await context.params

  const { data, error } = await supabaseAdmin
    .from("diagnosticos_servicos")
    .select("descricao, valor")
    .eq("diagnostico_id", id)

  if (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Erro ao buscar serviços" }), {
      status: 500
    })
  }

  return Response.json(data)
}
