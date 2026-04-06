"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import SalvarPropostaButton from "../../../../components/SalvarPropostaButton"

export default function Proposta() {
   // STATES
  const [diagnosticosSelecionados, setDiagnosticosSelecionados] = useState([])
  const { id } = useParams()
  const numeroOS = decodeURIComponent(id)
  const [os, setOS] = useState(null)
  const [propostas, setPropostas] = useState([])
  const [versaoAtiva, setVersaoAtiva] = useState(null)

const [opcoesExtras, setOpcoesExtras] = useState([])

const [opcaoSelecionadaIndex, setOpcaoSelecionadaIndex] = useState(null)


  const [itens, setItens] = useState([
    { descricao: "", valor: 0 }
  ])
  const [form, setForm] = useState({
    diagnostico: "",
    prazoDias: 6,
    descontoDinheiro: 7,
    descontoPix: 3,
    parcelasSemJuros: 3,
    parcelasComJuros: 10,
    validadeDias: 2
  })

  const bloqueado = os?.status === "aprovada" || os?.status === "paga"
  const [novoDiagnostico, setNovoDiagnostico] = useState("")
  const [diagnosticosPadrao, setDiagnosticosPadrao] = useState([])
  const [diagSelecionado, setDiagSelecionado] = useState("")

  // 🔥 REFS (separado dos states)
  const cacheServicos = useRef({})


  // =========================
  // CARREGAR VERSÃO
  // =========================
  function carregarVersao(p) {
    if (!p?.dados) return

    const d = p.dados

    setVersaoAtiva(p.versao)

    setForm({
      diagnostico: d.diagnostico || "",
      prazoDias: d.prazo || 6,
      descontoDinheiro: d.pagamento?.dinheiro || 0,
      descontoPix: d.pagamento?.pix || 0,
      parcelasSemJuros: d.pagamento?.parcelasSemJuros || 0,
      parcelasComJuros: d.pagamento?.parcelasComJuros || 0,
      validadeDias: d.validade || 2
    })

    setItens((d.itens || []).map(item => ({
  ...item,
  auto: true
})))

// 🔥 COLE AQUI 👇
setOpcoesExtras(d.opcoesExtras || [])
setOpcaoSelecionadaIndex(
  d.opcaoSelecionadaIndex !== undefined
    ? d.opcaoSelecionadaIndex
    : null
)
}









  function formatarData(data) {
    if (!data) return ""
    return new Date(data).toLocaleString("pt-BR")
  }




function criarOpcaoExtra() {
  setOpcoesExtras([
    ...opcoesExtras,
    {
      nome: `Opção ${opcoesExtras.length + 1}`,
      itens: []
    }
  ])
}

function addItemOpcaoExtra(opIndex) {
  const novas = [...opcoesExtras]
  novas[opIndex].itens.push({ descricao: "", valor: 0 })
  setOpcoesExtras(novas)
}

function updateItemOpcaoExtra(opIndex, itemIndex, campo, valor) {
  const novas = [...opcoesExtras]
  novas[opIndex].itens[itemIndex][campo] =
    campo === "valor" ? Number(valor) : valor
  setOpcoesExtras(novas)
}

function totalOpcaoExtra(op) {
  return op.itens.reduce((acc, i) => acc + (Number(i.valor) || 0), 0)
}





function totalGeralOpcao(op) {
  return (
    totalOpcaoExtra(op) +
    (Number(maoObra) || 0)
  )
}






  // =========================
  // LOAD
  // =========================
  useEffect(() => {
    async function load() {

      const res = await fetch("/api/os")
const data = await res.json()

const lista = data.ordens || []

const found = lista.find(o => o.numero === numeroOS)

setOS(found)




      const res2 = await fetch(`/api/propostas/${numeroOS}`)
      const data2 = await res2.json()
      setPropostas(data2)



const resDiag = await fetch("/api/diagnosticos")
const dataDiag = await resDiag.json()
setDiagnosticosPadrao(dataDiag)



      if (data2.length > 0) {
        carregarVersao(data2[0])
      }
    }

    load()
  }, [numeroOS])

  if (!os) return <div className="p-6">Carregando...</div>

  const cliente = os.clientes || {}
  const equipamento = os.equipamentos || {}

  // =========================
  // ITENS
  // =========================
  function addItem() {
    setItens([...itens, { descricao: "", valor: 0 }])
  }

  function removeItem(index) {
    const lista = [...itens]
    lista.splice(index, 1)
    setItens(lista)
  }

  function updateItem(index, campo, valor) {
    const lista = [...itens]
    lista[index][campo] = campo === "valor" ? Number(valor) : valor
    setItens(lista)
  }

// salvarNovoDiagnostico
async function salvarNovoDiagnostico() {
  if (!novoDiagnostico) return

  const res = await fetch("/api/diagnosticos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      titulo: novoDiagnostico
    })
  })

  const data = await res.json()

  setDiagnosticosPadrao(prev => [...prev, data[0]])

  setNovoDiagnostico("")
}

// removerDiagnostico
function removerDiagnostico(titulo) {
  const diagObj = diagnosticosPadrao.find(d => d.titulo === titulo)
  const diagnosticoId = diagObj?.id

  // 🧾 remove do texto
  setForm(prev => ({
    ...prev,
    diagnostico: prev.diagnostico
      .split("\n")
      .filter(linha => !linha.includes(titulo))
      .join("\n")
  }))


 // remove itens automáticos ligados a ele
  if (diagnosticoId) {
    setItens(prev =>
      prev.filter(item => item.diagnosticoId !== diagnosticoId)

    )
  }
}


// 🔥 COLE AQUI 👇
async function aprovarProposta() {

  const confirmar = confirm("Deseja aprovar esta proposta?")
  if (!confirmar) return

  try {

    const res = await fetch(`/api/os/${numeroOS}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: "aprovada"
      })
    })

    if (!res.ok) throw new Error("Erro ao aprovar")

    setOS(prev => ({
      ...prev,
      status: "aprovada"
    }))

    alert("Proposta aprovada com sucesso!")

  } catch (err) {
    console.error(err)
    alert("Erro ao aprovar proposta")
  }
}

// 🔥 COLE AQUI 👇 (EXATAMENTE AQUI)
function enviarWhatsApp() {
  const telefone = cliente?.telefone || cliente?.celular || ""

  if (!telefone) {
    alert("Cliente sem telefone")
    return
  }

  // 🔥 LINK DA PROPOSTA
  const link = `${window.location.origin}/proposta/${numeroOS}`

  const texto = `
Olá ${cliente?.nome || ""},

Segue a proposta do seu equipamento:

🖥 Equipamento: ${equipamento?.modelo || "-"}
📄 OS: ${numeroOS}

💰 Total: ${moeda(
  opcaoSelecionada
    ? totalGeralOpcao(opcaoSelecionada)
    : totalGeral
)}

👉 Acesse sua proposta:
${link}

Caso esteja de acordo, podemos prosseguir com o reparo.

Dell Resolve
`.trim()

  const url = `https://wa.me/55${telefone.replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`

  window.open(url, "_blank")
}




// NOVA FUNÇÃO (aplicarDiagnosticoCompleto)
async function adicionarDiagnostico(diagnosticoId) {

  if (diagnosticosSelecionados.includes(diagnosticoId)) return

  const diagObj = diagnosticosPadrao.find(
  d => String(d.id) === String(diagnosticoId)
)
  const titulo = diagObj?.titulo || ""

  if (!titulo) return

  // 🔥 adiciona no texto do laudo
  setForm(prev => ({
    ...prev,
    diagnostico:
      prev.diagnostico
        ? prev.diagnostico + "\n• " + titulo
        : "• " + titulo
  }))

  // 🔥 adiciona na lista
  setDiagnosticosSelecionados(prev => [...prev, diagnosticoId])

  try {

    // 🔥 CACHE
    let servicos = cacheServicos.current[diagnosticoId]

    if (!servicos) {
      const res = await fetch(`/api/diagnosticos/${diagnosticoId}/servicos`)
      servicos = await res.json()

      cacheServicos.current[diagnosticoId] = servicos
    }

    // 🔥 adiciona serviços sem duplicar
    
setItens(prev => {

  const atualizados = [...prev]

  servicos.forEach(s => {

    const index = atualizados.findIndex(
      p => p.descricao === s.descricao
    )

    if (index >= 0) {
      // 🔥 já existe → ATUALIZA diagnosticoId
      atualizados[index] = {
        ...atualizados[index],
        diagnosticoId: String(diagnosticoId)
      }
    } else {
      // 🔥 novo item → adiciona
      atualizados.push({
        descricao: s.descricao,
        valor: Number(s.valor),
        auto: true,
        diagnosticoId: String(diagnosticoId)
      })
    }

  })

  return atualizados
})


  } catch (err) {
    console.error("Erro:", err)
  }
}



// 🔥 NOVA FUNÇÃO (FIM)












  const totalItens = itens.reduce((acc, i) => acc + (i.valor || 0), 0)


const totalDiagnostico = totalItens

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



const totalGeral = totalItens + maoObra


const opcaoSelecionada =
  opcaoSelecionadaIndex !== null
    ? opcoesExtras[opcaoSelecionadaIndex]
    : null

const totalServicosPrincipal = opcaoSelecionada
  ? totalOpcaoExtra(opcaoSelecionada)
  : totalItens

const totalGeralPrincipal =
  totalServicosPrincipal + (maoObra || 0)










  function moeda(v) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(v || 0)
  }

  function calcularValidadeDiasUteis(dias) {
    const data = new Date()
    let count = 0

    while (count < dias) {
      data.setDate(data.getDate() + 1)
      const d = data.getDay()
      if (d !== 0 && d !== 6) count++
    }

    return data.toLocaleDateString("pt-BR")
  }

  // =========================
  // PDF
  // =========================
  




async function gerarPDF() {

  const logoUrl = window.location.origin + "/logo.png"

  // 🔥 DEFINE O QUE VAI PARA O PDF
  const listaItens = (
    opcaoSelecionada?.itens?.length
      ? opcaoSelecionada.itens
      : itens
  )

  const totalServicosPDF = opcaoSelecionada
    ? totalOpcaoExtra(opcaoSelecionada)
    : totalItens

  const totalGeralPDF = opcaoSelecionada
    ? totalGeralOpcao(opcaoSelecionada)
    : totalGeral

  const conteudo = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial;
          padding: 40px;
          font-size: 12px;
          line-height: 1.5;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .box {
          border-top: 1px solid #000;
          margin-top: 15px;
          padding-top: 10px;
        }

        .total {
          font-size: 16px;
          font-weight: bold;
          margin-top: 10px;
        }
      </style>
    </head>

    <body>

      <div class="header">
        <div>
          <img src="${logoUrl}" style="height:60px;" />
        </div>
        <div style="text-align:right; font-size:11px;">
          Dell Resolve Serv. Tec. de Informática e Eletrônica<br/>
          Fone: 11-2359-3951 – WhatsApp: 11-9.4667-4001<br/>
          techsupport@dellresolve.com<br/>
          CNPJ: 25.171.906/0001-08<br/>
          Rua Francisco Ataíde, 241 Cep 02418-020 – Pq. Mandaqui - SP
        </div>
      </div>

      <hr/>

      <h1>PROPOSTA TÉCNICA COMERCIAL</h1>

      <p><strong>OS:</strong> ${numeroOS}</p>
      <p><strong>Cliente:</strong> ${cliente?.nome || "-"}</p>
      <p><strong>Equipamento:</strong> ${equipamento?.modelo || "-"}</p>

      <div class="box">
        <p><strong>LEIA COM ATENÇÃO TODO O CONTEÚDO DA PROPOSTA</strong></p>

        <p>
        Em referência ao caso listado na proposta, identificamos que o seu equipamento não está mais coberto pela garantia legal e contratual ou apresenta problema não coberto pela garantia ativa.
        </p>

        <p><strong>Proposta referencial Dell GENUÍNOS</strong></p>
        <p><strong>DANO INDUZIDO OU SEM COBERTURA PELA GARANTIA CONTRATUAL</strong></p>
      </div>

      <div class="box">
        <h3>Diagnóstico</h3>
        <p>${form?.diagnostico || "-"}</p>
      </div>

      <div class="box">
        <h3>Serviços | Peças</h3>

        ${
          (listaItens || [])
            .filter(i => i.descricao || i.valor)
            .map((i, idx) => `
              <p>
                <strong>Item ${idx + 1}</strong><br/>
                ${i.descricao || "-"}<br/>
                ${moeda(i.valor)}
              </p>
            `)
            .join("")
        }

      </div>

      <div class="box">
        <p><strong>Total dos serviços:</strong> ${moeda(totalServicosPDF)}</p>
        <p><strong>Mão de obra:</strong> ${moeda(maoObra)}</p>

        <p class="total">
          TOTAL GERAL: ${moeda(totalGeralPDF)}
        </p>
      </div>

      <div class="box">
        <p><strong>PREVISÃO DE REPARO APÓS A AUTORIZAÇÃO E PAGAMENTO NA AUTORIZAÇÃO:</strong></p>
        <p>Até ${form?.prazoDias || 0} dia(s) útil(eis) após autorização.</p>
      </div>

      <div class="box">
        <p><strong>FORMA DE PAGAMENTO:</strong></p>

        <p>Dinheiro: ${form?.descontoDinheiro || 0}% desconto</p>
        <p>PIX: ${form?.descontoPix || 0}% desconto</p>
        <p>Cartão: ${form?.parcelasSemJuros || 0}x sem juros ou ${form?.parcelasComJuros || 0}x com juros</p>
      </div>

      <div class="box">
        <p><strong>GARANTIA:</strong></p>

        <p>
        3 meses legal + 3 meses Dell Resolve (6 meses total), cobrindo o mesmo defeito.
        </p>
      </div>

      <div class="box">
        <p><strong>VALIDADE:</strong></p>

        <p>
        Proposta válida por ${form?.validadeDias || 0} dias úteis.
        </p>

        <p>
        Válido até: ${calcularValidadeDiasUteis(form?.validadeDias || 0)}
        </p>
      </div>

      <div class="box">
        <p><strong>CLIENTE:</strong> ${cliente?.nome || "-"}</p>
        <p><strong>CPF/CNPJ:</strong> ${cliente?.cpf_cnpj || cliente?.cpf || cliente?.cnpj || "-"}</p>

        <div style="text-align:center; margin-top:20px;">
          ____________________________________<br/>
          <strong>DE ACORDO</strong>
        </div>
      </div>

    </body>
  </html>
  `

  const win = window.open("", "_blank")

  if (!win) {
    alert("Permita popups para gerar o PDF")
    return
  }

  win.document.write(conteudo)
  win.document.close()

  setTimeout(() => {
    win.print()
  }, 500)
}










  const dadosProposta = {
  diagnostico: form.diagnostico,
  itens,

  // ✅ NOVO (AQUI)
  opcoesExtras,
  opcaoSelecionadaIndex,

  total: totalGeral,
  mao_obra: maoObra,
  prazo: form.prazoDias,
  pagamento: {
    dinheiro: form.descontoDinheiro,
    pix: form.descontoPix,
    parcelasSemJuros: form.parcelasSemJuros,
    parcelasComJuros: form.parcelasComJuros
  },
  validade: form.validadeDias,
  criado_em: new Date().toISOString()
}

//itensAgrupados
const itensAgrupados = itens.reduce((acc, item) => {
  const key = item.diagnosticoId || "manual"

  if (!acc[key]) acc[key] = []
  acc[key].push(item)

  return acc
}, {})
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      {bloqueado && (
        <div className="bg-yellow-100 p-3 rounded">
          Proposta aprovada — edição bloqueada
        </div>
      )}

      <h1 className="text-2xl font-bold">Proposta Técnica</h1>


{/* 💼 RESUMO PREMIUM */}
<div className="bg-white border rounded-lg p-4 shadow-sm space-y-3">

  <h2 className="text-lg font-bold text-gray-700">
    💼 Resumo do Orçamento
  </h2>

  <div className="flex justify-between text-sm">
  <span className="text-gray-600">Serviços:</span>
  <span className="font-semibold">
  {opcaoSelecionada
    ? moeda(totalOpcaoExtra(opcaoSelecionada))
    : moeda(totalItens)}
</span>
</div>

  <div className="flex justify-between text-sm">
    <span className="text-gray-600">Mão de obra:</span>
    <span className="font-semibold">{moeda(maoObra)}</span>
  </div>

  <hr />

  <div className="flex justify-between text-2xl bg-gradient-to-r from-green-50 to-white font-bold text-green-700">
    <span>
  {opcaoSelecionada
  ? moeda(totalGeralOpcao(opcaoSelecionada))
  : moeda(totalGeral)}
</span>
  </div>

</div>

<p><strong>OS:</strong> {numeroOS}</p>
<p><strong>Cliente:</strong> {cliente.nome}</p>
<p><strong>Equipamento:</strong> {equipamento.modelo}</p>

<hr />

<div className="text-sm space-y-3">

  <p><strong>LEIA COM ATENÇÃO TODO O CONTEÚDO DA PROPOSTA</strong></p>

  <p>
    Em referência ao caso listado na proposta, identificamos que o seu equipamento não está mais coberto pela garantia legal e contratual ou apresenta problema não coberto pela garantia ativa e, conforme imagens/vídeos enviados previamente, a garantia não cobre o dano induzido apontado.
  </p>

  <p><strong><i>Proposta referencial Dell GENUÍNOS</i></strong></p>
  <p><strong>DANO INDUZIDO OU SEM COBERTURA PELA GARANTIA CONTRATUAL</strong></p>

</div>

<hr />      




      {/* HISTÓRICO */}
      <div>
        <p className="font-semibold">Histórico:</p>
        <div className="flex gap-2 flex-wrap">
          {propostas.map(p => (
            <button
              key={p.id}
              onClick={() => carregarVersao(p)}
              className={`px-3 py-1 rounded ${
                versaoAtiva === p.versao ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              v{p.versao} {versaoAtiva === p.versao && "✔"}
            </button>
          ))}
        </div>
      </div>




{/* DIAGNÓSTICO */}
<div className="space-y-2">

  


<div className="flex gap-2">



<select
  onChange={(e) => {
  const id = e.target.value
  if (!id) return

  adicionarDiagnostico(id)

  setDiagSelecionado("")
}}
>



  



    <option value="">Selecione um diagnóstico</option>
    {diagnosticosPadrao.map((d) => (
      <option key={d.id} value={d.id}>
        {d.titulo}
      </option>
    ))}
  </select>

</div>




{/* 👇 COLE AQUI */}
<div className="flex flex-wrap gap-2 mt-2">
  {diagnosticosSelecionados.map(id => {
    const d = diagnosticosPadrao.find(x => String(x.id) === String(id))

    return (
      <span
        key={id}
        className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-2"
      >
        {d?.titulo || id}

        <button
          onClick={() => {
            setDiagnosticosSelecionados(prev =>
              prev.filter(x => x !== id)
            )

            setItens(prev =>
              prev.filter(i => i.diagnosticoId !== id)
            )
          }}
          className="text-red-500"
        >
          x
        </button>
      </span>
    )
  })}
</div>















{/* 🔽 COLE EXATAMENTE AQUI */}
  <div className="flex gap-2">

    <input
      placeholder="Novo diagnóstico"
      value={novoDiagnostico}
      onChange={(e) => setNovoDiagnostico(e.target.value)}
      className="border p-2 flex-1"
    />

    <button
      onClick={salvarNovoDiagnostico}
      className="bg-green-600 text-white px-3 rounded"
    >
      Salvar
    </button>

  </div>
  {/* 🔼 FIM */}



    <textarea
    value={form.diagnostico}
    onChange={(e) =>
      setForm({ ...form, diagnostico: e.target.value })
    }
    className="border p-3 w-full min-h-[140px]"
  />

{/* 🔥 LISTA DE DIAGNÓSTICOS COM REMOÇÃO */}
<div className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded text-sm">
  {form.diagnostico?.split("\n").map((linha, i) => {
    const titulo = linha.replace("• ", "").trim()

    return (
      <div
        key={i}
        className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded"
      >
        <span>{linha}</span>

        <button
          onClick={() => removerDiagnostico(titulo)}
          className="text-red-500 text-sm"
        >
          ✕
        </button>
      </div>
    )
  })}
</div>





</div>



{/* 🔥 NOVO — OPÇÕES DE UPGRADE (ISOLADO) */}
<div className="border rounded p-4 bg-blue-50 mb-6">

  <h2 className="font-bold text-lg mb-3">
    🔁 Opções de Upgrade / Reparo (Alternativas)
  </h2>

  {opcoesExtras.map((op, opIndex) => (

    <div key={opIndex} className="mb-4 border rounded p-3 bg-white">

      <input
        value={op.nome}
        onChange={(e) => {
          const novas = [...opcoesExtras]
          novas[opIndex].nome = e.target.value
          setOpcoesExtras(novas)
        }}
        className="border p-2 mb-2 w-full"
      />

      {op.itens.map((item, itemIndex) => (

        <div key={itemIndex} className="flex gap-2 mb-2">

          <input
  placeholder="Ex: SSD 512GB"
  className="border p-2 flex-1"
  value={item.descricao || ""}
  onChange={(e) =>
    updateItemOpcaoExtra(opIndex, itemIndex, "descricao", e.target.value)
  }
/>

          <input
  type="number"
  placeholder="Valor"
  className="border p-2 w-32"
  value={item.valor || 0}
  onChange={(e) =>
    updateItemOpcaoExtra(opIndex, itemIndex, "valor", e.target.value)
  }
/>

        </div>

      ))}

      <button
        onClick={() => addItemOpcaoExtra(opIndex)}
        className="text-blue-600 text-sm"
      >
        + Adicionar item
      </button>

      


<div className="mt-3 border-t pt-3">

  <h3 className="font-bold text-gray-800 mb-2">
    {op.nome || `Opção ${opIndex + 1}`}
  </h3>

  <div className="flex justify-between text-sm">
    <span className="text-gray-600">Serviços:</span>
    <span>{moeda(totalOpcaoExtra(op))}</span>
  </div>

  <div className="flex justify-between text-sm">
    <span className="text-gray-600">Mão de obra:</span>
    <span>{moeda(maoObra)}</span>
  </div>

  <div className="flex justify-between text-lg font-bold text-green-700 mt-1">
    <span>TOTAL GERAL:</span>
    <span>{moeda(totalGeralOpcao(op))}</span>
  </div>

  {/* 🔥 AQUI 👇 */}
  <button
    onClick={() => setOpcaoSelecionadaIndex(opIndex)}
    className={`mt-3 px-3 py-2 rounded text-sm ${
      opcaoSelecionadaIndex === opIndex
        ? "bg-green-600 text-white"
        : "bg-gray-200"
    }`}
  >
    {opcaoSelecionadaIndex === opIndex
      ? "✔ Opção selecionada"
      : "Selecionar esta opção"}
  </button>

</div>














    </div>

  ))}

  <button
    onClick={criarOpcaoExtra}
    className="bg-gray-700 text-white px-3 py-2 rounded"
  >
    + Nova opção
  </button>

</div>










     
     {/* ITENS */}
      <div>
        <h2 className="font-semibold">Itens</h2>

   
{Object.entries(itensAgrupados).map(([diagId, lista]) => {

  const diag = diagnosticosPadrao.find(
    d => String(d.id) === String(diagId)
  )

  const titulo = diag?.titulo || "Serviços adicionais"

  // 🔥 AQUI SIM (fora do JSX)
  const subtotal = lista.reduce(
    (acc, item) => acc + (item.valor || 0),
    0
  )

  return (
    <div key={diagId} className="mb-6 border rounded p-4 bg-white shadow-sm">

      <h3 className="font-bold text-lg mb-3 text-blue-700">
        🔧 {titulo}
      </h3>

      {lista.map((item) => {

        const indexGlobal = itens.findIndex(x => x === item)

        return (
          <div
            key={indexGlobal}
            className="border rounded p-3 mb-2 bg-gray-50"
          >

            <div className="flex gap-2 mb-2">

              <input
                className="border p-2 flex-1"
                value={item.descricao}
                onChange={e =>
                  updateItem(indexGlobal, "descricao", e.target.value)
                }
              />

              <input
                type="number"
                className="border p-2 w-32"
                value={item.valor}
                onChange={e =>
                  updateItem(indexGlobal, "valor", e.target.value)
                }
              />

            </div>

            <div className="flex justify-between items-center">

              <span className="font-semibold text-green-700">
                {moeda(item.valor)}
              </span>

              <button
                onClick={() => removeItem(indexGlobal)}
                className="text-red-500 text-sm"
              >
                remover
              </button>

            </div>

          </div>
        )
      })}

      {/* 🔥 SUBTOTAL */}
      <div className="flex justify-end mt-3">
        <div className="bg-green-50 border border-green-200 px-3 py-2 rounded">

          <span className="text-sm text-gray-600 mr-2">
            Subtotal:
          </span>

          <span className="font-bold text-green-700">
            {moeda(subtotal)}
          </span>

        </div>
      </div>

    </div>
  )
})}





    
















<button
  onClick={addItem}
  className="bg-green-600 text-white px-3 py-2 rounded mt-2"
>
  + Adicionar Item
</button>


      </div>


    {/* TOTAL */}
<div className="bg-gray-100 p-4 rounded border space-y-2">

  <p>
    <strong>Total dos serviços:</strong> {moeda(totalServicosPrincipal)}
  </p>

  <p>
    <strong>Mão de obra:</strong> {moeda(maoObra)}
  </p>

  <hr />

  <p className="text-lg font-bold text-green-700">
  TOTAL GERAL: {moeda(totalGeralPrincipal)}
</p>

</div>



<hr />


{/* PRAZO */}
<p><strong>PREVISÃO DE REPARO APÓS A AUTORIZAÇÃO E PAGAMENTO NA AUTORIZAÇÃO:</strong></p>

<input
  type="number"
  value={form.prazoDias}
  onChange={(e) =>
    setForm({ ...form, prazoDias: Number(e.target.value) })
  }
  className="border p-2 w-32"
/>

<p className="mt-2">
  <i>Até {form.prazoDias} dia(s) útil(eis) após autorização e recepção formal do equipamento, se possível.</i>
</p>

<hr />

{/* PAGAMENTO */}
<div className="space-y-3">

  <p><strong>FORMA E CONDIÇÕES DE PAGAMENTO:</strong></p>

  <div className="flex gap-4">

    <div>
      <label className="text-sm">Dinheiro (%)</label>
      <input
        type="number"
        value={form.descontoDinheiro}
        onChange={(e) =>
          setForm({ ...form, descontoDinheiro: Number(e.target.value) })
        }
        className="border p-2 w-24"
      />
    </div>

    <div>
      <label className="text-sm">PIX (%)</label>
      <input
        type="number"
        value={form.descontoPix}
        onChange={(e) =>
          setForm({ ...form, descontoPix: Number(e.target.value) })
        }
        className="border p-2 w-24"
      />
    </div>

  </div>

  <div className="flex gap-4 mt-2">

    <div>
      <label className="text-sm">Parcelas s/ juros</label>
      <input
        type="number"
        value={form.parcelasSemJuros}
        onChange={(e) =>
          setForm({ ...form, parcelasSemJuros: Number(e.target.value) })
        }
        className="border p-2 w-20"
      />
    </div>

    <div>
      <label className="text-sm">Parcelas c/ juros</label>
      <input
        type="number"
        value={form.parcelasComJuros}
        onChange={(e) =>
          setForm({ ...form, parcelasComJuros: Number(e.target.value) })
        }
        className="border p-2 w-20"
      />
    </div>

  </div>

</div>

<hr />

{/* GARANTIA */}
<div className="text-sm space-y-2">
  <p><strong>GARANTIA LEGAL OFERTADA:</strong></p>

  <p>
    <strong>3 meses legal CDC + 3 meses Dell Resolve<i> (6 meses total)</i></strong> (O&M) p/ peças novas, genuínas e apenas contemplando o <strong>mesmo defeito</strong>, exceto <i>“sistema operacional, bios, programas e aplicativos, updates e atualizações espontâneas online ou executada pelo usuário, carcaça, periféricos, etc.”</i>; só sendo possível após execução de <i>Laudo técnico</i> interno com previsão de finalização média de até 30 dias, se tecnicamente possível.
  </p>

</div>

<hr />

{/* VALIDADE */}
<div className="text-sm space-y-2">

  <p><strong>Prazo de validade da proposta:</strong></p>

  <input
    type="number"
    value={form.validadeDias}
    onChange={(e) =>
      setForm({ ...form, validadeDias: Number(e.target.value) })
    }
    className="border p-2 w-32"
  />

  <p><i>Esta cotação permanecerá válida durante {form.validadeDias} dias úteis a contar da data do envio deste orçamento.
    Não reservamos e nem garantimos disponibilidades de peças e valores.</i></p>

  <p className="font-semibold">
    Válidade até: <i>{calcularValidadeDiasUteis(form.validadeDias)}</i>
  </p>

</div>

<hr />



{/* TERMO */}
<div className="text-sm">

  <p><strong>CLIENTE/PORTADOR:</strong> <i>{cliente.nome}</i></p>
  <p>
  <strong>CPF/CNPJ:</strong>{" "}
  {cliente.cpf_cnpj || cliente.cpf || cliente.cnpj || "-"}
</p>

  

  <div className="text-center mt-10">
    ____________________________________<br/>
    <strong>DE ACORDO</strong>
  </div>

</div>

<hr />

{/* BOTÕES */}
{/* BOTÕES */}
<div className="flex flex-wrap gap-3 items-center">

  <button
    onClick={gerarPDF}
    className="bg-black text-white px-4 py-2 rounded"
  >
    Gerar PDF
  </button>

  <SalvarPropostaButton
    numero={numeroOS}
    dados={dadosProposta}
    ultimaVersao={propostas[0]}
    disabled={bloqueado}
  />

  {/* 🔥 COLE AQUI 👇 */}
  <button
    onClick={enviarWhatsApp}
    className="bg-green-500 text-white px-4 py-2 rounded"
  >
    Enviar WhatsApp
  </button>

</div>

  

    </div>
  )
}
