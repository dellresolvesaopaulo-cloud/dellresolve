"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fetchComAuth } from "../../../lib/fetchAuth"

export default function PropostaPublica() {

  const { numero } = useParams()
  const numeroOS = decodeURIComponent(numero)

  const [os, setOS] = useState(null)
  const [itens, setItens] = useState([])
  const [pix, setPix] = useState(null)

const [opcoesExtras, setOpcoesExtras] = useState([])
const [opcaoEscolhida, setOpcaoEscolhida] = useState(null)



  

useEffect(() => {
  async function load() {

    const res = await fetch(`/api/os/${numeroOS}`)
    const data = await res.json()

    if (!res.ok || data?.error) {
      setOS(null)
      return
    }

    setOS(data)

    const res2 = await fetchComAuth(`/api/propostas/${numeroOS}`)
    const data2 = await res2.json()

    if (data2?.length > 0) {
      const dados = data2[0]?.dados || {}

      setItens(dados.itens || [])
      setOpcoesExtras(dados.opcoesExtras || [])
    }
  }

  load()

  // 🔥 AUTO ATUALIZAÇÃO (AQUI ESTÁ O OURO)
  const interval = setInterval(load, 5000)

  return () => clearInterval(interval)

}, [numeroOS])















  if (!os) return <div className="p-6">Carregando...</div>

  const cliente = os.clientes || {}
  const equipamento = os.equipamentos || {}

  const tabela = {
    basic: 240,
    premium: 320,
    avancado: 400,
    gamer: 480
  }

  const tipo = (os?.tipo || "").toLowerCase()

  const maoObra =
    Number(os?.mao_obra) > 0
      ? Number(os.mao_obra)
      : tabela[tipo] || 320

  const itensAgrupados = {
    "Serviços recomendados": itens
  }





const opcaoFinal =
  opcaoEscolhida !== null
    ? opcoesExtras[opcaoEscolhida]
    : null

const listaFinal = opcaoFinal?.itens?.length
  ? opcaoFinal.itens
  : itens

const totalItens = listaFinal.reduce(
  (acc, i) => acc + (i.valor || 0),
  0
)










  const totalGeral = totalItens + maoObra

  function moeda(v) {
    if (!v || v === 0) return ""
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(v)
  }

  function enviarWhatsApp() {
    const url = `${window.location.origin}/proposta/${numeroOS}`

    const texto = encodeURIComponent(
      `Olá! Segue sua proposta técnica:\n\n${url}\n\nQualquer dúvida estou à disposição.`
    )

    window.open(`https://wa.me/?text=${texto}`, "_blank")
  }




async function escolherOpcao(index) {

  const confirmar = confirm("Deseja escolher esta opção?")
  if (!confirmar) return

  const opcao = opcoesExtras[index]

  const totalOpcao =
    opcao.itens.reduce((acc, i) => acc + (i.valor || 0), 0) + maoObra

  try {

    const res = await fetchComAuth(`/api/os/${numeroOS}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        opcao_escolhida: index,
        status: "aprovada",
        valor_total: totalOpcao,
        valor_aprovado_em: new Date().toISOString()
      })
    })

    if (!res.ok) throw new Error()

    setOpcaoEscolhida(index)

    alert("Opção escolhida com sucesso!")

  } catch (err) {
    alert("Erro ao selecionar opção")
  }
}












async function aprovar() {
  const confirmar = confirm("Deseja aprovar esta proposta?")
  if (!confirmar) return

  const res = await fetchComAuth(`/api/os/${numeroOS}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: "aprovada",
      valor_total: totalGeral,
      valor_aprovado_em: new Date().toISOString()
    })
  })

  if (res.ok) {
    alert("Proposta aprovada com sucesso!")
    setOS(prev => ({
      ...prev,
      status: "aprovada",
      valor_total: totalGeral
    }))
  }
}





  







  


async function pagarAgora() {
  try {

    const res = await fetchComAuth("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        valor: totalGeral,
        descricao: `OS ${numeroOS}`,
        numeroOS
      })
    })

    const data = await res.json()

    if (!data?.init_point) {
      alert("Erro ao gerar pagamento")
      return
    }

    // ✅ AGORA SIM fora do IF
    window.location.href = data.init_point

  } catch (err) {
    console.error(err)
    alert("Erro ao iniciar pagamento")
  }
}










  async function confirmarPagamento() {

    const confirmar = confirm("Confirmar pagamento realizado?")
    if (!confirmar) return

    const res = await fetchComAuth(`/api/os/${numeroOS}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: "pago" })
    })

    if (res.ok) {
      alert("Pagamento confirmado!")
      window.location.reload()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="text-center space-y-2 border-b pb-4">

        <img src="/logo.png" className="mx-auto h-12" />

        <p className="text-sm text-gray-500">
          Assistência Técnica Profissional Dell
        </p>

        <p className="text-xs text-gray-400">
          Proposta Nº {numeroOS}
        </p>

      </div>

      <h2 className="text-xl font-semibold text-center text-gray-700">
        Proposta de Serviço Técnico
      </h2>

      <div className="border p-4 rounded-xl bg-gray-50 space-y-1">
        <p><strong>Cliente:</strong> {cliente.nome}</p>
        <p><strong>Equipamento:</strong> {equipamento.modelo}</p>
        <p><strong>OS:</strong> {numeroOS}</p>
      </div>

      <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
        ⚠️ Proposta válida por 2 dias úteis.
      </div>




{/* 🔥 ESCOLHA DE OPÇÃO (CLIENTE) */}
{opcoesExtras.length > 0 && (
  <div className="space-y-4">

    <h3 className="text-lg font-bold text-gray-700">
      Escolha uma opção de reparo:
    </h3>

    {opcoesExtras.map((op, index) => {

      const total = op.itens.reduce((acc, i) => acc + (i.valor || 0), 0) + maoObra

      return (
        <div key={index} className="border p-4 rounded bg-white">

          <h4 className="font-bold mb-2">
            {op.nome || `Opção ${index + 1}`}
          </h4>

          {op.itens.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{item.descricao}</span>
              <span>{moeda(item.valor)}</span>
            </div>
          ))}

          <div className="mt-2 font-bold text-green-700">
            Total: {moeda(total)}
          </div>

          <button
            onClick={() => escolherOpcao(index)}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
          >
            Escolher esta opção
          </button>

        </div>
      )
    })}
  </div>
)}

{/* 🔥 BLOCO ORIGINAL (NÃO MEXE) */}





      {Object.entries(itensAgrupados).map(([grupo, lista]) => {

        const subtotal = lista.reduce(
          (acc, item) => acc + (item.valor || 0),
          0
        )

        return (
          <div key={grupo} className="border rounded-xl p-4 bg-white">

            <h3 className="font-bold text-blue-700 mb-3 text-lg">
              🔧 {grupo}
            </h3>

            {lista.map((item, i) => (
              <div key={i} className="flex justify-between mb-2 border-b pb-1 text-sm">
                <span>{item.descricao}</span>
                <span>{moeda(item.valor)}</span>
              </div>
            ))}

            <div className="text-right mt-3 font-semibold text-green-700">
              Subtotal: {moeda(subtotal)}
            </div>

          </div>
        )
      })}

      <div className="flex justify-between text-sm">
        <span>Mão de obra:</span>
        <span>{moeda(maoObra)}</span>
      </div>

      <div className="text-sm text-gray-500">
        Investimento para solução completa e estável do seu equipamento:
      </div>

      <div className="flex justify-between items-center bg-green-100 p-4 rounded-xl">
        <span className="text-lg font-semibold">
          Total
        </span>
        <span className="text-3xl font-bold text-green-700">
          {moeda(totalGeral)}
        </span>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg text-sm">
        ✔ Técnicos profissionais  
        ✔ Garantia no serviço de 6 meses  
        ✔ Peças originais Dell
      </div>



{os.status === "pago" ? (

  <div className="bg-green-100 p-6 text-center rounded space-y-3">

    <h2 className="text-xl font-bold text-green-700">
      ✅ Pagamento aprovado!
    </h2>

    <p className="text-sm text-gray-600">
      Seu pagamento foi confirmado com sucesso.
    </p>

    <p className="text-sm">
      Nossa equipe já iniciou o processo de reparo do seu equipamento.
    </p>

  </div>

) : os.status === "aprovada" ? (

  <div className="bg-blue-100 p-4 text-center rounded">
    ✔ Proposta aprovada — aguardando pagamento
  </div>

) : (

  <div className="space-y-3">

    <button onClick={enviarWhatsApp} className="w-full bg-green-500 text-white py-3 rounded">
      📲 Enviar via WhatsApp
    </button>

    <button onClick={aprovar} className="w-full bg-green-700 text-white py-3 rounded">
      ✔ Aprovar serviço
    </button>

    <button
      onClick={pagarAgora}
      className="w-full bg-blue-600 text-white py-3 rounded"
    >
      💳 Pagar com cartão / PIX
    </button>

    <button onClick={() => window.print()} className="w-full bg-gray-700 text-white py-3 rounded">
      🧾 Baixar PDF
    </button>

  </div>

)}




      








      {/* PIX + CONFIRMAÇÃO */}
      {pix && (
        <div className="bg-white p-4 rounded border text-center space-y-3">

          <h3 className="font-bold text-green-700">
            🔒 Pagamento via PIX
          </h3>

          <img src={`data:image/png;base64,${pix.qr_code_base64}`} />

          <textarea value={pix.qr_code} readOnly className="w-full border p-2 text-xs" />

          <button
            onClick={confirmarPagamento}
            className="w-full bg-green-700 text-white py-3 rounded"
          >
            ✔ Já realizei o pagamento
          </button>

        </div>
      )}

    </div>
  )
}
