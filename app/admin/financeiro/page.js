"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function Financeiro() {

  const [dados, setDados] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/financeiro")
        const data = await res.json()

        console.log("FINANCEIRO:", data)

        setDados(data)

      } catch (err) {
        console.error(err)

        setDados({
          totalMes: 0,
          rankingTecnicos: [],
          evolucao: [],
          dono: {}
        })
      }
    }

    load()
  }, [])

  function moeda(v) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(v || 0)
  }

  if (!dados) return <div className="p-6">Carregando...</div>

  const progresso =
    (dados.dono.faturamentoMes / dados.dono.metaEmpresa) * 100

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold">
        📊 Dashboard Financeiro
      </h1>

      {/* 👑 DONO */}
      <div className="grid md:grid-cols-4 gap-4">

        <KPI title="💰 Faturamento" value={moeda(dados.dono.faturamentoMes)} />
        <KPI title="📄 Propostas" value={moeda(dados.dono.faturamentoPropostas)} />
        <KPI title="🏆 Melhor Técnico" value={dados.dono.melhorTecnico} />
        <KPI title="👥 Técnicos" value={dados.dono.totalTecnicos} />

      </div>

      {/* ⚠️ META */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <div className="flex justify-between">
          <span>
            {moeda(dados.dono.faturamentoMes)} / {moeda(dados.dono.metaEmpresa)}
          </span>
          <span>{progresso.toFixed(0)}%</span>
        </div>

        <div className="w-full bg-gray-200 h-3 rounded mt-2">
          <div
            className="bg-green-600 h-3 rounded"
            style={{ width: `${Math.min(progresso, 100)}%` }}
          />
        </div>

        <div className="mt-4 text-sm space-y-1">

          {dados.dono.vaiBaterMeta ? (
            <p className="text-green-600 font-semibold">
              🚀 Você vai bater a meta este mês!
            </p>
          ) : (
            <>
              <p className="text-red-500 font-semibold">
                ⚠️ Nesse ritmo você NÃO vai bater a meta
              </p>

              <p className="text-gray-500">
                Faltam {moeda(dados.dono.falta)}
              </p>

              <p className="text-blue-600 font-medium">
                Precisa vender {moeda(dados.dono.necessarioPorDia)} por dia
              </p>
            </>
          )}

        </div>

      </div>

      {/* 🏆 TÉCNICOS */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-lg font-bold mb-4">
          🏆 Ranking de Técnicos
        </h2>

        {dados.rankingTecnicos.map((t, i) => (

          <div key={i} className="mb-5">

            <div className="flex justify-between">
              <span>{t.medalha} {t.nome}</span>
              <span>{moeda(t.total)}</span>
            </div>

            {/* META */}
            <div className="w-full bg-gray-200 h-2 rounded mt-2">
              <div
                className="bg-blue-600 h-2 rounded"
                style={{ width: `${t.percentual}%` }}
              />
            </div>

            <div className="text-sm text-gray-500">
              {moeda(t.total)} / {moeda(t.meta)}
            </div>

            {/* PROPOSTAS */}
            <div className="text-xs text-gray-500">
              Propostas: {moeda(t.propostas)}
            </div>

            {/* COMISSÃO */}
            <div className="text-green-600 text-sm font-semibold">
              Comissão: {moeda(t.comissao)}
            </div>

            {/* PRÊMIO */}
            <div className="text-yellow-600 text-sm font-bold">
              🏆 Bônus: {moeda(t.premio)}
            </div>

          </div>

        ))}

      </div>

      {/* 📊 EVOLUÇÃO */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="text-lg font-bold mb-4">
          📊 Evolução por Técnico
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dados.evolucao}>
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip />

            {dados.rankingTecnicos.map((t, i) => (
              <Line
                key={i}
                dataKey={t.nome}
                strokeWidth={2}
                dot={false}
              />
            ))}

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  )
}

function KPI({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}
