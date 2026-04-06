import { supabase } from "../../../../lib/supabase"
import DeleteClienteButton from "../../../components/DeleteClienteButton"
import ClienteForm from "../../../components/ClienteForm"
import { requireRole } from "../../../../lib/requireRole"

async function getCliente(id){

  const { data, error } = await supabase
    .from("clientes")
    .select("*")
    .eq("id", id)
    .single()

  if(error){
    return null
  }

  return data
}

export default async function ClientePage({ params }){
  await requireRole(["admin", "tecnico"])

  // 🔥 CORREÇÃO AQUI
  const { id } = await params

  const cliente = await getCliente(id)

  if(!cliente){
    return (
      <div className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-2xl font-bold">Cliente não encontrado</h1>
      </div>
    )
  }

  return (

    <div className="max-w-3xl mx-auto py-16 px-6">

      <h1 className="text-3xl font-bold mb-6">
        Detalhes do Cliente
      </h1>

      <div className="space-y-2 mb-8">
        <p><strong>Nome:</strong> {cliente.nome}</p>
        <p><strong>CPF/CNPJ:</strong> {cliente.cpf_cnpj}</p>
        <p><strong>Telefone:</strong> {cliente.telefone}</p>
        <p><strong>Email:</strong> {cliente.email}</p>
        <p><strong>Endereço:</strong> {cliente.endereco}</p>
        <p><strong>Cidade:</strong> {cliente.cidade}</p>
        <p><strong>Estado:</strong> {cliente.estado}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Editar Cliente
      </h2>

      <ClienteForm cliente={cliente} />

      <div className="mt-6">
        <DeleteClienteButton id={cliente.id} />
      </div>

    </div>
  )
}
