export const runtime = "nodejs"

import PDFDocument from "pdfkit"

export async function POST(req) {

  try {

    const body = await req.json()

    const doc = new PDFDocument({ margin: 40 })

    const chunks = []

    doc.on("data", chunk => chunks.push(chunk))

    const endPromise = new Promise((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)
    })

    // =========================
    // CONTEÚDO
    // =========================
    doc.fontSize(16).text("PROPOSTA TÉCNICA DELL RESOLVE", { align: "center" })

    doc.moveDown()

    doc.fontSize(12)
    doc.text(`OS: ${body.numero}`)
    doc.text(`Cliente: ${body.cliente}`)
    doc.text(`Equipamento: ${body.equipamento}`)

    doc.moveDown()

    doc.fontSize(10)
    doc.text("::: Leia com atenção o conteúdo da proposta :::")

    doc.moveDown()

    doc.text(body.diagnostico || "Sem diagnóstico")

    doc.moveDown()

    // ITENS
    if (body.itens?.length) {
      doc.fontSize(12).text("Itens:", { underline: true })

      body.itens.forEach((item, i) => {
        doc.moveDown(0.5)
        doc.fontSize(10).text(`Item ${i + 1}`)
        doc.text(item.descricao || "-")
        doc.text(`Valor: R$ ${item.valor || 0}`)
      })
    }

    doc.moveDown()

    // TOTAL
    doc.fontSize(12).text(
      `TOTAL: R$ ${body.total || 0}`,
      { align: "right" }
    )

    doc.moveDown()

    doc.fontSize(10)
    doc.text(`Prazo: ${body.prazoDias || 0} dias úteis`)
    doc.text(`Validade: ${body.validadeDias || 0} dias úteis`)

    doc.end()

    const pdfBuffer = await endPromise

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=proposta-${body.numero}.pdf`
      }
    })

  } catch (err) {

    console.error("ERRO PDF:", err)

    return new Response(
      JSON.stringify({ error: "Erro ao gerar PDF" }),
      { status: 500 }
    )
  }
}
