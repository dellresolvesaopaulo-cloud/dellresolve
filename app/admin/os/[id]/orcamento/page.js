import { supabase } from "../../../../../lib/supabase"
import { requireRole } from "../../../../../lib/requireRole"

async function getOS(numero){

  const { data: os } = await supabase
    .from("ordens_servico")
    .select("*")
    .eq("numero", numero)
    .single()

  if(!os){
    return null
  }

  const { data: cliente } = await supabase
    .from("clientes")
    .select("nome, cpf_cnpj")
    .eq("id", os.cliente_id)
    .single()

  const { data: equipamento } = await supabase
    .from("equipamentos")
    .select("modelo, service_tag")
    .eq("id", os.equipamento_id)
    .single()

  return {
    ...os,
    clientes: cliente,
    equipamentos: equipamento
  }

}

export default async function OrcamentoPage({ params }) {
  await requireRole(["admin", "tecnico"])

  const { numero } = await params

  const os = await getOS(numero)

  if(!os){
    return (
      <div className="max-w-4xl mx-auto py-16">
        <h1 className="text-3xl font-bold">
          OS não encontrada
        </h1>
      </div>
    )
  }

  return (

    <div className="max-w-4xl mx-auto py-16 px-6">

      <h1 className="text-3xl font-bold mb-8">
        Orçamento da OS {numero}
      </h1>

      <div className="mb-6 space-y-2">

        <p>
          <strong>Cliente:</strong> {os.clientes?.nome}
        </p>

        <p>
          <strong>CPF/CNPJ:</strong> {os.clientes?.cpf_cnpj}
        </p>

        <p>
          <strong>Modelo:</strong> {os.equipamentos?.modelo}
        </p>

        <p>
          <strong>Service Tag:</strong> {os.equipamentos?.service_tag}
        </p>

      </div>

      <form
        action="/api/orcamentos"
        method="POST"
        className="border p-6 rounded"
      >

        <input type="hidden" name="os_id" value={os.id} />

        <div className="mb-4">

          <label className="block font-semibold mb-2">
            Descrição do serviço
          </label>

          <textarea
            name="descricao"
            className="border w-full p-3 rounded"
          />

        </div>

        <div className="mb-4">

          <label className="block font-semibold mb-2">
            Valor
          </label>

          <input
            type="number"
            name="valor"
            step="0.01"
            className="border w-full p-3 rounded"
          />

        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Adicionar item
        </button>

      </form>

    </div>

  )

}
