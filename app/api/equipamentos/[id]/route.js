import { supabase } from "../../../../lib/supabase"
import { requireApiRole } from "../../../../lib/apiAuth"

export const dynamic = "force-dynamic"

// =========================
// UPDATE EQUIPAMENTO
// =========================
export async function PUT(req, { params }) {

  try {
    const { errorResponse } = await requireApiRole(["admin", "tecnico"])

    if (errorResponse) {
      return errorResponse
    }

    const { id } = await params
    const body = await req.json()

    const {
      equipamento,
      modelo,
      service_tag,
      acessorios,
      estado_visual,
      tentativa_reparo,
      garantia // ✅ AGORA SALVA
    } = body

    const { data, error } = await supabase
      .from("equipamentos")
      .update({
        equipamento,
        modelo,
        service_tag,
        acessorios,
        estado_visual,
        tentativa_reparo,
        garantia // ✅ IMPORTANTE
      })
      .eq("id", id)
      .select()

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json(data[0])

  } catch (err) {
    return Response.json({ error: "Erro ao atualizar equipamento" }, { status: 500 })
  }
}


// =========================
// DELETE EQUIPAMENTO
// =========================
export async function DELETE(req, { params }) {
  const { errorResponse } = await requireApiRole(["admin", "tecnico"])

  if (errorResponse) {
    return errorResponse
  }

  const { id } = await params

  const { error } = await supabase
    .from("equipamentos")
    .delete()
    .eq("id", id)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ success: true })
}
