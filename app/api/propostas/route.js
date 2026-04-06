import { NextResponse } from "next/server"
import { requireApiRole } from "../../../lib/apiAuth"
import { supabaseAdmin } from "../../../lib/supabaseAdmin"

export const dynamic = "force-dynamic"

export async function POST(req) {
  try {
    const { errorResponse } = await requireApiRole(["admin", "tecnico"])

    if (errorResponse) {
      return errorResponse
    }

    const body = await req.json()
    const { os_id, opcoes } = body

    if (!os_id || !Array.isArray(opcoes) || opcoes.length === 0) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }

    for (const opcao of opcoes) {

      const total = opcao.itens.reduce((acc, item) => {
        return acc + item.preco * item.quantidade
      }, 0)

      const { data: opcaoCriada } = await supabaseAdmin
        .from("proposta_opcoes")
        .insert({
          os_id,
          nome: opcao.nome,
          total
        })
        .select()
        .single()

      const itensInsert = opcao.itens.map(item => ({
        opcao_id: opcaoCriada.id,
        peca_id: null,
        nome: item.nome,
        quantidade: item.quantidade,
        preco_unitario: item.preco
      }))

      await supabaseAdmin
        .from("proposta_opcao_itens")
        .insert(itensInsert)
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    return NextResponse.json({ error: "Erro ao salvar proposta" }, { status: 500 })
  }
}
