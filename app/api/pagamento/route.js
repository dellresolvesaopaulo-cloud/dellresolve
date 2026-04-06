import { NextResponse } from "next/server"

export async function POST(req) {
  const mercadoPagoToken = process.env.MERCADO_PAGO_ACCESS_TOKEN

  if (!mercadoPagoToken) {
    return NextResponse.json(
      { error: "Pagamento indisponível" },
      { status: 500 }
    )
  }

  const body = await req.json()

  try {

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${mercadoPagoToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        transaction_amount: Number(body.valor) || 10,
        description: body.descricao,
        payment_method_id: "pix",
        payer: {
          email: "dellassistenciatecnica@gmail.com"
        }
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao criar pagamento" },
        { status: 502 }
      )
    }

    return NextResponse.json({
      qr_code: data?.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: data?.point_of_interaction?.transaction_data?.qr_code_base64
    })

  } catch (err) {
    console.error("ERRO PAGAMENTO:", err)
    return NextResponse.json({ error: "erro pagamento" }, { status: 500 })
  }
}
