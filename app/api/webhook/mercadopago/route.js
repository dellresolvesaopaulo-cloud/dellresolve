import { NextResponse } from "next/server"
import { supabaseAdmin } from "../../../../lib/supabaseAdmin"

export async function POST(req) {
  try {
    const body = await req.json()

    // 🔒 PROCESSA SOMENTE EVENTOS DE PAGAMENTO
    if (body.type !== "payment") {
      return NextResponse.json({ ok: true })
    }

    const paymentId = body?.data?.id

    if (!paymentId) {
      return NextResponse.json({ ok: true })
    }

    // 🔎 CONSULTA PAGAMENTO NO MERCADO PAGO
    const res = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      }
    )

    const pagamento = await res.json()

    // ❌ IGNORA SE NÃO ESTIVER APROVADO
    if (pagamento.status !== "approved") {
      return NextResponse.json({ ok: true })
    }

    // 🔗 PEGA NUMERO DA OS DO METADATA
    const numeroOS = pagamento.metadata?.numeroOS

    if (!numeroOS) {
      return NextResponse.json({ ok: true })
    }

    // 🔍 EVITA DUPLICIDADE (WEBHOOK PODE DISPARAR MAIS DE UMA VEZ)
    const { data: osAtual } = await supabaseAdmin
      .from("ordens_servico")
      .select("status")
      .eq("numero", numeroOS)
      .single()

    if (osAtual?.status === "pago") {
      return NextResponse.json({ ok: true })
    }

    // ✅ ATUALIZA STATUS PARA PAGO
    const { error } = await supabaseAdmin
      .from("ordens_servico")
      .update({ status: "pago" })
      .eq("numero", numeroOS)

    if (error) {
      console.error("Erro ao atualizar OS:", error)
      return NextResponse.json({ error: true }, { status: 500 })
    }

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error("🔥 ERRO WEBHOOK:", err)
    return NextResponse.json({ error: true }, { status: 500 })
  }
}
