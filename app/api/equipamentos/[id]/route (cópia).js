import { supabase } from "../../../../lib/supabase"

export async function GET(req, { params }){

  const { id } = await params

  const { data, error } = await supabase
    .from("equipamentos")
    .select("*") // 🔥 IMPORTANTE: traz todos os campos
    .eq("id", id)
    .single()

  if(error){
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return Response.json(data)
}


export async function PUT(req, { params }){

  const { id } = await params
  const body = await req.json()

  const { data, error } = await supabase
    .from("equipamentos")
    .update({
      cliente_id: body.cliente_id,
      equipamento: body.equipamento,
      modelo: body.modelo,
      service_tag: body.service_tag,
      acessorios: body.acessorios,
      estado_visual: body.estado_visual,
      tentativa_reparo: body.tentativa_reparo
    })
    .eq("id", id)
    .select()

  if(error){
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return Response.json(data[0])
}
