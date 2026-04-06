import { supabase } from "../../../../../lib/supabase"
import PDFDocument from "pdfkit"
import path from "path"
import siteConfig from "../../../../config/site"
import { moeda } from "../../../../../lib/moeda"

// 🔥 valida UUID
function isUUID(value) {
  return /^[0-9a-fA-F-]{36}$/.test(value)
}

export async function GET(req, { params }) {

  const { id } = await params
  const valor = decodeURIComponent(id)

  let query = supabase
    .from("ordens_servico")
    .select(`
      *,
      clientes (*),
      equipamentos (*)
    `)

  // 🔥 CORREÇÃO: aceita UUID ou numero
  if (isUUID(valor)) {
    query = query.eq("id", valor)
  } else {
    query = query.eq("numero", valor)
  }

  const { data: os } = await query.single()

  if (!os) {
    return new Response("OS não encontrada", { status: 404 })
  }

  const cliente = os.clientes || {}
  const equipamento = os.equipamentos || {}

  const fontPath = path.join(process.cwd(), "public", "fonts", "Roboto-Regular.ttf")
  const logoPath = path.join(process.cwd(), "public", "logo.png")

  const moeda = (v) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(v || 0)

  const maoObra =
    os.mao_obra ||
    ({
      basic: 150,
      premium: 320,
      avancado: 450
    }[(os.tipo || "").toLowerCase()] || 0)

  const doc = new PDFDocument({
    margin: 50,
    font: fontPath
  })

  const chunks = []
  doc.on("data", c => chunks.push(c))

  const pdfEnd = new Promise(resolve => {
    doc.on("end", () => resolve(Buffer.concat(chunks)))
  })

  try {
    doc.image(logoPath, 50, 40, { width: 100 })
  } catch (e) {}

  doc
    .fontSize(10)
    .text(siteConfig.name, 70, 40, { align: "right" })
    .text(siteConfig.address.street, { align: "right" })
    .text(`${siteConfig.address.city} - ${siteConfig.address.state}`, { align: "right" })
    .text(`Tel: ${siteConfig.phone}`, { align: "right" })
    .text(siteConfig.email, { align: "right" })
    .text(`CNPJ: ${siteConfig.cnpj}`, { align: "right" })

  doc.moveDown(3)
  doc.moveTo(50, 110).lineTo(550, 110).stroke()

  doc.moveDown()
  doc
    .fontSize(17)
    .text("ORDEM DE SERVIÇO", { align: "center" })

  doc.moveDown(1)

  doc
    .fontSize(12)
    .text(`Número: ${os.numero}`, { align: "center" })
    .text(`Data: ${new Date().toLocaleDateString("pt-BR")}`, { align: "center" })

  doc.moveDown(1)

  doc.fontSize(11).text("CLIENTE", { underline: true })
  doc.moveDown(0.5)

  doc.fontSize(10)
  doc.text(`Nome: ${cliente.nome || ""}`)
  doc.text(`CPF/CNPJ: ${cliente.cpf_cnpj || ""}`)
  doc.text(`Telefone: ${cliente.telefone || ""}`)
  doc.text(`Email: ${cliente.email || ""}`)
  doc.text(`Endereço: ${cliente.endereco || ""}`)
  doc.text(`${cliente.cidade || ""} - ${cliente.estado || ""}`)
  doc.text(`CEP: ${cliente.cep || ""}`)

  doc.moveDown()

  doc.fontSize(11).text("EQUIPAMENTO", { underline: true })
  doc.moveDown(0.5)

  doc.fontSize(10)
  doc.text(`Modelo: ${equipamento.modelo || ""}`)
  doc.text(`Service Tag: ${equipamento.service_tag || ""}`)
  doc.text(`Acessórios: ${equipamento.acessorios || "-"}`)

  doc.moveDown()

  doc.fontSize(11).text("DEFEITO RECLAMADO/APONTADO", { underline: true })
  doc.moveDown(0.5)
  doc.fontSize(10).text(os.defeito || "")

  doc.moveDown()

  doc.fontSize(11).text("GARANTIA CONTRATUAL", { underline: true })
  doc.moveDown(0.5)
  doc.fontSize(10).text(os.garantia || "")

  doc.moveDown()

  doc.fontSize(11).text("VALORES PRÉVIOS DA MÃO DE OBRA A SER SOMADA COM ORÇAMENTO", { underline: true })
  doc.moveDown(0.5)

  doc.fontSize(10)
  doc.text(`Tipo: ${os.tipo || ""}`)
  doc.text(`Mão de obra: ${moeda(maoObra)}`)
  doc.text(`Frete: ${moeda(os.frete)}`)

  doc.moveDown(1)

  doc.fontSize(11).text("PRAZOS", { underline: true })
  doc.moveDown(0.5)

  doc.fontSize(10)
  doc.text(`Validade da SR: ${os.prazo_validade || 2} dias úteis após a emissão`)
  doc.text(`Diagnóstico: de 1 até ${os.prazo_diagnostico || 5} dias úteis após recepção`)
  doc.text(`Reparo: de 1 até ${os.prazo_reparo || 5} dias úteis após autorização`)

  doc.moveDown(1)

  doc
    .fontSize(9)
    .fillColor("gray")
    .text("Obs.: cobrança realizada somente mediante aprovação formal do orçamento.")

  doc.text("Aguardando avaliação técnica para diagnóstico e elaboração do orçamento.")

  doc.fillColor("black")

  doc.moveDown(2)

  doc.text("DE ACORDO: ________________________________________")
  doc.text("CLIENTE/REPRESENTANTE/PORTADOR:")

  const assinaturaPath = path.join(process.cwd(), "public", "assinatura/carimbo_dellresolve.png")

  try {
    doc.moveDown(1)
    doc.image(assinaturaPath, {
      fit: [220, 100],
      align: "center"
    })
  } catch (e) {}

  doc.addPage()

  doc.fontSize(12)
  doc.text("TERMO DE CONSENTIMENTO E CIÊNCIA", { align: "center" })

  doc.moveDown(2)

  doc.fontSize(9)

  const largura = 500
  const limitePagina = 750

  const paragrafos = siteConfig.termosOS
    .replace(/•/g, "-")
    .split("\n")

  paragrafos.forEach((linha) => {

    if (doc.y > limitePagina) {
      doc.addPage()
    }

    doc.text(linha.trim(), {
      width: largura,
      align: "justify",
      lineGap: 3
    })

    doc.moveDown(0.5)
  })

  doc.end()

  const pdfBuffer = await pdfEnd

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=${os.numero}.pdf`
    }
  })
}
