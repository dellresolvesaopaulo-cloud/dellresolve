import { NextResponse } from "next/server"

export async function POST(req) {
  try {

    const body = await req.json()

    const res = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          items: [
            {
              title: `OS ${body.numeroOS}`,
              quantity: 1,
              unit_price: Number(body.valor)
            }
          ]
        })
      }
    )

    const data = await res.json()

    return NextResponse.json({
      url: data.init_point
    })

  } catch (err) {
    return NextResponse.json({ error: "Erro MP" }, { status: 500 })
  }
}
