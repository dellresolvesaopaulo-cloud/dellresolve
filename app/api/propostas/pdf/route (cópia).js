import PDFDocument from "pdfkit"

export async function POST(req) {

  const body = await req.json()

  const doc = new PDFDocument({ margin: 40 })

  const chunks = []

  doc.on("data", chunk => chunks.push(chunk))

  const endPromise = new Promise(resolve => {
    doc.on("end", () => resolve(Buffer.concat(chunks)))
  })

  // =========================
  // CABEÇALHO
  // =========================
  doc.fontSize(16).text("PROPOSTA TÉCNICA", { align: "center" })

  doc.moveDown()

  doc.fontSize(12)
  doc.text(`OS: ${body.numero}`)
  doc.text(`Cliente: ${body.cliente}`)
  doc.text(`Equipamento: ${body.equipamento}`)

  doc.moveDown()

  // =========================
  // TEXTO PADRÃO
  // =========================
  doc.fontSize(10)
  doc.text("::: Leia com atenção o conteúdo da proposta :::")

  doc.moveDown()

  doc.text("Em referência ao caso listado na proposta, identificamos que o equipamento não está coberto pela garantia ou possui dano não coberto.")

  doc.moveDown()

  // =========================
  // DIAGNÓSTICO
  // =========================
  doc.fontSize(12).text("Diagnóstico:", { underline: true })
  doc.fontSize(10).text(body.diagnostico || "-")

  doc.moveDown()

  // =========================
  // ITENS
  // =========================
  doc.fontSize(12).text("Itens:", { underline: true })

  body.itens.forEach((item, index) => {
    doc.moveDown(0.5)
    doc.fontSize(10).text(`Item ${index + 1}`)
    doc.text(item.descricao || "-")
    doc.text(`Valor: R$ ${item.valor}`)
  })

  doc.moveDown()

  // =========================
  // TOTAL
  // =========================
  doc.fontSize(12).text(`TOTAL GERAL: R$ ${body.total}`, {
    align: "right"
  })

  doc.moveDown()

  // =========================
  // PRAZO
  // =========================
  doc.fontSize(10).text(
    `Prazo: até ${body.prazoDias} dias úteis após autorização.`
  )

  doc.moveDown()

  // =========================
  // VALIDADE
  // =========================
  doc.text(
    `Validade: ${body.validadeDias} dias úteis`
  )

  doc.end()

  const pdfBuffer = await endPromise

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=proposta.pdf"
    }
  })
}
