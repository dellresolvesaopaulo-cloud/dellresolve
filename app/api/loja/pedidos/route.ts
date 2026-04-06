import { NextResponse } from "next/server"
import { supabaseAdmin } from "../../../../lib/supabaseAdmin"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { itens, total, status } = body

    if (!Array.isArray(itens) || itens.length === 0) {
      return NextResponse.json(
        { success: false, error: "Itens inválidos" },
        { status: 400 }
      )
    }

    if (!Number.isFinite(Number(total)) || Number(total) < 0) {
      return NextResponse.json(
        { success: false, error: "Total inválido" },
        { status: 400 }
      )
    }

    const normalizedStatus =
      typeof status === "string" && status.trim()
        ? status.trim()
        : "pendente"

    const { data, error } = await supabaseAdmin
      .from("pedidos")
      .insert([
        {
          itens,
          total: Number(total),
          status: normalizedStatus
        }
      ])

    if (error) {
      console.error("❌ ERRO SUPABASE:", error)
      return NextResponse.json(
        { success: false, error: "Erro ao salvar pedido" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error("❌ ERRO GERAL:", error)

    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}
