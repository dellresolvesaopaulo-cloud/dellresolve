import { supabase } from "../../../lib/supabase"
import { requireApiRole } from "../../../lib/apiAuth"

export const dynamic = "force-dynamic"

// =========================
// ✅ GET
// =========================
export async function GET() {

  try {
    const { errorResponse } = await requireApiRole(["admin", "tecnico"])

    if (errorResponse) {
      return errorResponse
    }

    const { data, error } = await supabase
      .from("equipamentos")
      .select(`
        id,
        cliente_id,
        equipamento,
        modelo,
        service_tag,
        acessorios,
        estado_visual,
        tentativa_reparo,
        garantia_status,
        garantia_data,
        created_at,
        cliente:clientes (
          nome,
          cep,
          endereco
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json(data || [])

  } catch {
    return Response.json([], { status: 500 })
  }
}


// =========================
// ✅ POST (CRIA EQUIPAMENTO)
// =========================
export async function POST(req) {

  try {
    const { errorResponse } = await requireApiRole(["admin", "tecnico"])

    if (errorResponse) {
      return errorResponse
    }

    const body = await req.json()

    const { error } = await supabase
      .from("equipamentos")
      .insert([{
        cliente_id: body.cliente_id,

        equipamento: body.equipamento,
        modelo: body.modelo,
        service_tag: body.service_tag,

        acessorios: body.acessorios,
        estado_visual: body.estado_visual,
        tentativa_reparo: body.tentativa_reparo,

        garantia_status: body.garantia_status || null,
        garantia_data: body.garantia_data || null
      }])

    if (error) {
      console.error("ERRO AO SALVAR EQUIPAMENTO:", error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({
      success: true,
      message: "Equipamento cadastrado com sucesso"
    })

  } catch (err) {
    console.error("ERRO INTERNO EQUIPAMENTO:", err)
    return Response.json({ error: "Erro interno POST" }, { status: 500 })
  }
}
