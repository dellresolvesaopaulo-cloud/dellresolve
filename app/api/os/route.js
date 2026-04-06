import { NextResponse } from "next/server"
import { supabase } from "../../../lib/supabase"
import { gerarNumeroOS } from "../../../lib/gerarNumeroOS"
import { requireApiRole } from "../../../lib/apiAuth"

export const dynamic = "force-dynamic"

function normalizeId(value) {
  if (typeof value !== "string") return value

  const trimmed = value.trim()

  return /^\d+$/.test(trimmed) ? Number(trimmed) : trimmed
}

// =========================
// CRIAR NOVA OS
// =========================
export async function POST(request) {
  try {
    const { errorResponse } = await requireApiRole(["admin", "tecnico"])

    if (errorResponse) {
      return errorResponse
    }

    const body = await request.json()

    const clienteId = normalizeId(body?.cliente_id)
    const equipamentoId = normalizeId(body?.equipamento_id)

    if (!clienteId || !equipamentoId) {
      return NextResponse.json(
        { error: "Cliente e equipamento são obrigatórios" },
        { status: 400 }
      )
    }

    const { data: equipamento, error: equipamentoError } = await supabase
      .from("equipamentos")
      .select("id, cliente_id, service_tag")
      .eq("id", equipamentoId)
      .maybeSingle()

    if (equipamentoError) {
      console.error("ERRO EQUIPAMENTO OS:", equipamentoError)
      return NextResponse.json(
        { error: equipamentoError.message || "Erro ao validar equipamento" },
        { status: 500 }
      )
    }

    if (!equipamento) {
      return NextResponse.json(
        { error: "Equipamento não encontrado" },
        { status: 404 }
      )
    }

    if (String(equipamento.cliente_id) !== String(clienteId)) {
      return NextResponse.json(
        { error: "Equipamento não pertence ao cliente selecionado" },
        { status: 400 }
      )
    }

    const serviceTag = String(equipamento.service_tag || "SEMST")
      .replace(/\s+/g, "")
      .toUpperCase()

    const numero = await gerarNumeroOS(serviceTag)

    const payload = {
      cliente_id: clienteId,
      equipamento_id: equipamentoId,
      numero,
      status: "aberta",
      defeito: typeof body?.defeito === "string" ? body.defeito.trim() || null : null,
      garantia: typeof body?.garantia === "string" ? body.garantia.trim() || null : null,
      cep: typeof body?.cep === "string" ? body.cep.trim() || null : null,
      endereco: typeof body?.endereco === "string" ? body.endereco.trim() || null : null,
      mao_obra: Number(body?.mao_obra) || 0,
      frete: Number(body?.frete) || 0,
      tipo: typeof body?.tipo === "string" ? body.tipo.trim() || null : null
    }

    const { data, error } = await supabase
      .from("ordens_servico")
      .insert(payload)
      .select("*")
      .single()

    if (error) {
      console.error("ERRO CRIAR OS:", error)
      return NextResponse.json(
        { error: error.message || "Erro ao criar OS" },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error("ERRO POST OS:", err)
    return NextResponse.json(
      {
        error: err?.message || "Erro interno"
      },
      { status: 500 }
    )
  }
}

// =========================
// LISTAR TODAS AS OS
// =========================
export async function GET() {
  try {
    const { errorResponse } = await requireApiRole(["admin", "tecnico"])

    if (errorResponse) {
      return errorResponse
    }

    const { data, error } = await supabase
      .from("ordens_servico")
      .select(`
        *,
        clientes (*),
        equipamentos (*)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("ERRO LISTAGEM:", error)
      return NextResponse.json(
        { error: error.message || "Erro ao listar OS" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ordens: data || []
    })
  } catch (err) {
    console.error("ERRO API OS:", err)
    return NextResponse.json(
      { error: err?.message || "Erro interno" },
      { status: 500 }
    )
  }
}
