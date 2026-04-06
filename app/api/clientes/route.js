import { supabase } from "../../../lib/supabase"
import { requireApiRole } from "../../../lib/apiAuth"

export const dynamic = "force-dynamic"

// GET
export async function GET(){
  const { errorResponse } = await requireApiRole(["admin", "tecnico"])

  if (errorResponse) {
    return errorResponse
  }

  const { data, error } = await supabase
    .from("clientes")
    .select("*")
    .order("created_at", { ascending: false })

  if(error){
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data || [])
}

// POST
export async function POST(req){
  try{
    const { errorResponse } = await requireApiRole(["admin", "tecnico"])

    if (errorResponse) {
      return errorResponse
    }

    const body = await req.json()

    const { data, error } = await supabase
      .from("clientes")
      .insert({
        nome: body.nome,
        cpf_cnpj: body.cpf_cnpj || "",
        telefone: body.telefone || "",
        email: body.email || "",
        endereco: body.endereco || "",
        cidade: body.cidade || "",
        estado: body.estado || "",
        cep: body.cep || ""
      })
      .select()

    if(error){
      return Response.json({ error: error.message }, { status: 500 })
    }

    return Response.json(data[0])

  }catch(err){
    return Response.json({ error: err.message }, { status: 500 })
  }
}
