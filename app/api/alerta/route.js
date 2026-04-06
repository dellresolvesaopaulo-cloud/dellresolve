import { getRequestSiteUrl } from "../../../lib/siteUrl"

export async function POST(request) {

  try {

    const res = await fetch(getRequestSiteUrl(request, "/api/financeiro"))
    const dados = await res.json()

    if (dados.dono.vaiBaterMeta) {
      return Response.json({ ok: true, msg: "Meta OK" })
    }

    const mensagem = `
⚠️ ALERTA DE META

Faturamento: R$ ${dados.dono.faturamentoMes}
Meta: R$ ${dados.dono.metaEmpresa}

Faltam: R$ ${dados.dono.falta}

Necessário por dia: R$ ${dados.dono.necessarioPorDia.toFixed(2)}
`

    // 🔥 ENVIO (exemplo Z-API)
    await fetch("https://api.z-api.io/SEU_ID/token/SEU_TOKEN/send-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: "5511999999999",
        message: mensagem
      })
    })

    return Response.json({ ok: true })

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
