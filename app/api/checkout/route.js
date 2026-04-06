import { NextResponse } from "next/server"
import { supabase } from "../../../lib/supabase"
import { getRequestSiteUrl } from "../../../lib/siteUrl"

export async function POST(req) {
  try {
    const body = await req.json()

    const { numeroOS } = body

    if (!numeroOS) {
      return NextResponse.json(
        { error: "OS não informada" },
        { status: 400 }
      )
    }

    // 🔥 BUSCAR VALOR REAL DA OS
    const { data: os, error: osError } = await supabase
      .from("ordens_servico")
      .select("valor_total")
      .eq("numero", numeroOS)
      .single()

    if (osError || !os) {
      return NextResponse.json(
        { error: "OS não encontrada" },
        { status: 404 }
      )
    }

    if (!os.valor_total) {
      return NextResponse.json(
        { error: "OS sem valor definido" },
        { status: 400 }
      )
    }

    const valor = Number(os.valor_total)
    const siteUrl = getRequestSiteUrl(req)

    // 🔥 CRIA PAGAMENTO COM VALOR REAL
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          items: [
            {
              title: `OS ${numeroOS}`,
              quantity: 1,
              unit_price: valor
            }
          ],

          metadata: {
            numeroOS
          },

          notification_url: getRequestSiteUrl(req, "/api/webhook/mercadopago"),

          back_urls: {
            success: `${siteUrl}/proposta/${numeroOS}`,
            failure: `${siteUrl}/proposta/${numeroOS}`,
            pending: `${siteUrl}/proposta/${numeroOS}`
          },

          auto_return: "approved"
        })
      }
    )

    const data = await response.json()

    if (!data.init_point) {
      return NextResponse.json(
        { error: "Erro ao criar pagamento" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      init_point: data.init_point
    })

  } catch (err) {
    console.error("ERRO CHECKOUT:", err)
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    )
  }
}
