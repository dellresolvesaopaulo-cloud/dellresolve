export const dynamic = "force-dynamic"

import OSPdfButton from "../../../components/OSPdfButton"
import GerarPropostaButton from "../../../components/GerarPropostaButton"
import AprovarPropostaButton from "../../../components/AprovarPropostaButton"
import ConfirmarPagamentoButton from "../../../components/ConfirmarPagamentoButton.jsx"
import ReabrirOSButton from "../../../components/ReabrirOSButton.jsx"
import PrazosEditor from "../../../components/PrazosEditor"
import { requireRole } from "../../../../lib/requireRole"
import { supabase } from "../../../../lib/supabase"
import { moeda } from "../../../../lib/moeda"

// 🔥 AGORA BUSCA POR ID (UUID)
async function getOS(id){

  const { data, error } = await supabase
    .from("ordens_servico")
    .select(`
      *,
      clientes(*),
      equipamentos(*)
    `)
    .eq("id", id)
    .single()

  if(error){
    return null
  }

  return data
}

export default async function OrdemServico({ params }){
  await requireRole(["admin", "tecnico"])

  // 🔥 AGORA USA ID
  const { id } = await params

  const os = await getOS(id)

  if(!os){
    return <div className="p-6">OS não encontrada</div>
  }

  const cliente = os.clientes || {}
  const equipamento = os.equipamentos || {}

  const bloqueado = os.status === "fechada"
  const status = os.status

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  return (

    <div className="max-w-3xl mx-auto py-16 px-6">

      <h1 className="text-3xl font-bold mb-6">
        Ordem de Serviço
      </h1>

      <p className="mb-4">
        <strong>Número:</strong> {os.numero}
      </p>

      <hr className="my-4" />

      {/* CLIENTE */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-2">Cliente</h2>
        <div className="text-sm leading-6">
          <p>{cliente.nome || "-"}</p>
          <p>{cliente.telefone || "-"}</p>
          <p>{cliente.email || "-"}</p>
        </div>
      </div>

      {/* EQUIPAMENTO */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-2">Equipamento</h2>
        <div className="text-sm leading-6">
          <p><strong>Modelo:</strong> {equipamento.modelo || "-"}</p>
          <p><strong>Service Tag:</strong> {equipamento.service_tag || "-"}</p>
          <p><strong>Acessórios:</strong> {equipamento.acessorios || "-"}</p>
        </div>
      </div>

      {/* DEFEITO */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-2">Defeito Identificado</h2>
        <div className="text-sm leading-6">
          <p>{os.defeito || "-"}</p>
        </div>
      </div>

      {/* GARANTIA */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-2">Garantia Contratual</h2>
        <div className="text-sm leading-6">
          <p>{os.garantia || "-"}</p>
        </div>
      </div>

      {/* VALORES */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-2">Valores Mão de obra/Tipo de equipamento</h2>
        <div className="text-sm leading-6">
          <p>Tipo: {os.tipo || "-"}</p>
        </div>
      </div>

      <p>
        Mão de obra: R$ {
          os.mao_obra ||
          ({
            basic: 240,
            premium: 320,
            avancado: 480
          }[(os.tipo || "").toLowerCase()] || 0)
        }
      </p>

      <p className="text-sm text-gray-600 mt-1">
        Obs.: cobrança ocorrerá somente mediante a aprovação formal do orçamento.
      </p>

      <p className="text-sm text-gray-500">
        Aguardando avaliação técnica para diagnóstico e elaboração do orçamento.
      </p>

      <p>
        Frete: R$ {(os.frete ?? 0).toFixed(2)}
      </p>

      <hr className="my-4" />

      <h2 className="font-semibold">Prazos</h2>

      <PrazosEditor
        numero={os.numero}
        inicial={os}
      />

      <hr className="my-4" />

      {/* ENDEREÇO */}
      <div className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-2">Endereço</h2>
        <div className="text-sm leading-6">
          <p>{os.endereco || "-"}</p>
          <p>CEP: {os.cep || "-"}</p>
        </div>
      </div>

      {/* BOTÕES */}
      <div className="flex gap-3 flex-wrap">

        <a
          href={`https://wa.me/55${(cliente.telefone || "").replace(/\D/g, "")}?text=${encodeURIComponent(
`Olá ${cliente.nome || ""},

Segue sua OS:

${baseUrl}/api/os/${encodeURIComponent(os.numero)}/pdf`
          )}`}
          target="_blank"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          WhatsApp
        </a>

        <OSPdfButton numero={os.numero} />

        {status !== "paga" && (
          <GerarPropostaButton numero={os.numero} />
        )}

        {status === "em_proposta" && (
          <AprovarPropostaButton numero={os.numero} />
        )}

        {status !== "paga" && (
          <ConfirmarPagamentoButton numero={os.numero} />
        )}

        {status !== "fechada" && (
          <ReabrirOSButton numero={os.numero} />
        )}

        {status === "fechada" && (
          <span className="text-gray-500 font-semibold">
            OS Finalizada (pode gerar nova proposta)
          </span>
        )}

      </div>

    </div>
  )
}
