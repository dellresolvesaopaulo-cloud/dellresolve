import { supabase } from "../../../lib/supabase"

export async function GET(request) {
  try {

    // =========================
    // 🏢 MULTI EMPRESA (SAFE)
    // =========================
    let empresa_id = null

    try {
      const url = new URL(request.url)
      empresa_id = url.searchParams.get("empresa_id")
    } catch (e) {
      empresa_id = null
    }

    let query = supabase
      .from("ordens_servico")
      .select("*")

    if (empresa_id) {
      query = query.eq("empresa_id", empresa_id)
    }

    const { data, error } = await query

    if (error) {
      console.error("ERRO SUPABASE:", error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    const lista = data || []

    const hoje = new Date()
    const mes = hoje.getMonth()
    const ano = hoje.getFullYear()

    // =========================
    // 📅 FILTROS
    // =========================
    const pagas = lista.filter(o => o.status === "paga")
    const aprovadas = lista.filter(o => o.status === "aprovada")

    const listaMes = pagas.filter(o => {
      const d = new Date(o.pago_em || o.created_at)
      return d.getMonth() === mes && d.getFullYear() === ano
    })

    // =========================
    // 💰 TOTAIS
    // =========================
    const totalMes = listaMes.reduce((acc, o) =>
      acc + Number(o.valor_total || o.mao_obra || 0), 0)

    const totalPropostas = aprovadas.reduce((acc, o) =>
      acc + Number(o.valor_total || o.mao_obra || 0), 0)

    // =========================
    // 🎯 METAS
    // =========================
    const META_EMPRESA = 10000

    const metas = {
      Admin: 8000,
      Rafael: 6000,
      Carlos: 5000,
      Nicole: 4000,
      "Sem técnico": 3000
    }

    const tecnicos = {}

    // =========================
    // 💰 FATURAMENTO
    // =========================
    listaMes.forEach(o => {

      const nome = o.tecnico?.trim() || "Sem técnico"
      const valor = Number(o.valor_total || o.mao_obra || 0)

      if (!tecnicos[nome]) {
        tecnicos[nome] = {
          total: 0,
          propostas: 0,
          dias: {}
        }
      }

      tecnicos[nome].total += valor

      const d = new Date(o.pago_em || o.created_at)
      const dia = d.getDate()

      if (!tecnicos[nome].dias[dia]) {
        tecnicos[nome].dias[dia] = 0
      }

      tecnicos[nome].dias[dia] += valor
    })

    // =========================
    // 📄 PROPOSTAS
    // =========================
    aprovadas.forEach(o => {

      const nome = o.tecnico?.trim() || "Sem técnico"
      const valor = Number(o.valor_total || o.mao_obra || 0)

      if (!tecnicos[nome]) {
        tecnicos[nome] = { total: 0, propostas: 0, dias: {} }
      }

      tecnicos[nome].propostas += valor
    })

    // =========================
    // 🏆 RANKING
    // =========================
    let rankingTecnicos = Object.entries(tecnicos)
      .map(([nome, t]) => {

        const meta = metas[nome] || 5000
        const percentual = (t.total / meta) * 100

        const comissao =
          (t.total * 0.10) +
          (t.propostas * 0.05)

        return {
          nome,
          total: t.total,
          propostas: t.propostas,
          meta,
          percentual: Math.min(percentual, 100),
          comissao: Number(comissao.toFixed(2)),
          medalha: "",
          premio: 0,
          dias: t.dias
        }
      })
      .sort((a, b) => b.total - a.total)

    // =========================
    // 🥇 MEDALHAS + 💰 PRÊMIO
    // =========================
    rankingTecnicos = rankingTecnicos.map((t, i) => {

      let medalha = ""
      let premio = 0

      if (i === 0) {
        medalha = "🥇"
        premio = 500
      } else if (i === 1) {
        medalha = "🥈"
        premio = 300
      } else if (i === 2) {
        medalha = "🥉"
        premio = 200
      }

      return {
        ...t,
        medalha,
        premio
      }
    })

    // =========================
    // 📊 EVOLUÇÃO
    // =========================
    const diasNoMes = new Date(ano, mes + 1, 0).getDate()
    const evolucao = []

    for (let dia = 1; dia <= diasNoMes; dia++) {

      const linha = { dia }

      rankingTecnicos.forEach(t => {
        linha[t.nome] = t.dias[dia] || 0
      })

      evolucao.push(linha)
    }

    // =========================
    // ⚠️ ALERTA META
    // =========================
    const diasPassados = hoje.getDate()
    const media = totalMes / Math.max(diasPassados, 1)
    const previsao = media * diasNoMes

    const vaiBaterMeta = previsao >= META_EMPRESA
    const falta = Math.max(META_EMPRESA - totalMes, 0)
    const diasRestantes = diasNoMes - diasPassados
    const necessarioPorDia = falta / Math.max(diasRestantes, 1)

    // =========================
    // 👑 DONO
    // =========================
    const dono = {
      faturamentoMes: totalMes,
      faturamentoPropostas: totalPropostas,
      melhorTecnico: rankingTecnicos[0]?.nome || "-",
      melhorValor: rankingTecnicos[0]?.total || 0,
      totalTecnicos: rankingTecnicos.length,
      metaEmpresa: META_EMPRESA,
      previsao,
      vaiBaterMeta,
      falta,
      necessarioPorDia
    }

    return Response.json({
      totalMes,
      rankingTecnicos,
      evolucao,
      dono
    })

  } catch (err) {
    console.error("ERRO FINANCEIRO:", err)
    return Response.json({ error: "Erro interno" }, { status: 500 })
  }
}
