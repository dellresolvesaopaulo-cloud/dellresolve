import { supabase } from "../../../../lib/supabase"
import EquipamentoEditForm from "../../../components/EquipamentoEditForm"
import { requireRole } from "../../../../lib/requireRole"

async function getEquipamento(id){

  const { data, error } = await supabase
    .from("equipamentos")
    .select(`
      *,
      clientes(nome)
    `)
    .eq("id", id)
    .single()

  if(error){
    return null
  }

  return data
}

export default async function EquipamentoPage({ params }){
  await requireRole(["admin", "tecnico"])

  const { id } = await params

  const equipamento = await getEquipamento(id)

  if(!equipamento){
    return <div>Equipamento não encontrado</div>
  }

  return (

    <div className="max-w-3xl mx-auto py-16 px-6">

      <h1 className="text-3xl font-bold mb-6">
        Equipamento
      </h1>

      {/* 🔥 DETALHES */}
      <div className="space-y-2 mb-8">

        <p><strong>Cliente:</strong> {equipamento.clientes?.nome}</p>
        <p><strong>Equipamento:</strong> {equipamento.equipamento}</p>
        <p><strong>Service Tag:</strong> {equipamento.service_tag}</p>
        <p><strong>Modelo:</strong> {equipamento.modelo}</p>
        <p><strong>Acessórios:</strong> {equipamento.acessorios}</p>
        <p><strong>Estado visual:</strong> {equipamento.estado_visual}</p>
        <p><strong>Tentativa de reparo:</strong> {equipamento.tentativa_reparo}</p>

      </div>

      <h2 className="text-xl font-semibold mb-4">
        Editar Equipamento
      </h2>

      <EquipamentoEditForm equipamento={equipamento} />

    </div>

  )
}
