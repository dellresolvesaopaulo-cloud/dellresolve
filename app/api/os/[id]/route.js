import { supabase } from "../../../../lib/supabase"
import { requireApiRole } from "../../../../lib/apiAuth"

export const dynamic = "force-dynamic"

// =========================
// GET ID (SEM VALIDAÇÃO BURRA)
// =========================
function getId(request, params) {

  // 1. params
  if (params?.id) {
    const id = Array.isArray(params.id) ? params.id[0] : params.id
    if (id && id !== "undefined") return id
  }

  // 2. fallback URL
  try {
    const url = new URL(request.url)
    const parts = url.pathname.split("/")
    const id = parts[parts.length - 1]

    if (id && id !== "undefined") return id
  } catch (e) {
    console.error("Erro ao extrair ID:", e)
  }

  return null
}

// =========================
// 🔥 NOVO: valida UUID corretamente
// =========================
function isUUID(value) {
  return /^[0-9a-fA-F-]{36}$/.test(value)
}

// =========================
// GET
// =========================
export async function GET(request, { params }) {
  try {

    const id = getId(request, params)

    if (!id) {
      return Response.json({ error: "ID inválido" }, { status: 400 })
    }

    let query = supabase
      .from("ordens_servico")
      .select(`
        *,
        clientes (*),
        equipamentos (*)
      `)

    // 🔥 CORREÇÃO: decisão correta entre UUID e numero (string)
    if (isUUID(id)) {
      query = query.eq("id", id)
    } else {
      query = query.eq("numero", id)
    }

    const { data, error } = await query.maybeSingle()

    if (error) {
      console.error(error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return Response.json({ error: "OS não encontrada" }, { status: 404 })
    }

    return Response.json(data)

  } catch (err) {
    console.error(err)
    return Response.json({ error: "Erro interno" }, { status: 500 })
  }
}

// =========================
// PUT
// =========================
export async function PUT(request, { params }) {
  try {

    const id = getId(request, params)

    if (!id) {
      return Response.json({ error: "ID inválido" }, { status: 400 })
    }

    const body = await request.json()

    let query = supabase
      .from("ordens_servico")
      .update(body)

    // 🔥 mesma correção
    if (isUUID(id)) {
      query = query.eq("id", id)
    } else {
      query = query.eq("numero", id)
    }

    const { error } = await query

    if (error) {
      console.error(error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true })

  } catch (err) {
    console.error(err)
    return Response.json({ error: "Erro interno" }, { status: 500 })
  }
}

// =========================
// DELETE
// =========================
export async function DELETE(request, { params }) {
  try {
    const { errorResponse } = await requireApiRole(["admin", "tecnico"])

    if (errorResponse) {
      return errorResponse
    }

    const id = getId(request, params)

    if (!id) {
      return Response.json({ error: "ID inválido" }, { status: 400 })
    }

    let query = supabase
      .from("ordens_servico")
      .delete()

    // 🔥 mesma correção
    if (isUUID(id)) {
      query = query.eq("id", id)
    } else {
      query = query.eq("numero", id)
    }

    const { error } = await query

    if (error) {
      console.error(error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json({ success: true })

  } catch (err) {
    console.error(err)
    return Response.json({ error: "Erro interno" }, { status: 500 })
  }
}
