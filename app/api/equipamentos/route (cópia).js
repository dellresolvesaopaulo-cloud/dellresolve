import { supabase } from "../../../lib/supabase"

// ✅ GET (LISTAR)
export async function GET(){

  const { data, error } = await supabase
    .from("equipamentos")
    .select(`
      *,
      clientes(nome)
    `)
    .order("created_at",{ ascending:false })

  if(error){
    return Response.json(
      { error:error.message },
      { status:500 }
    )
  }

  return Response.json(data)
}


// ✅ POST (CRIAR)
export async function POST(req){

  try{

    const body = await req.json()

    const {
      cliente_id,
      equipamento,
      modelo,
      service_tag,
      acessorios,
      estado_visual,
      tentativa_reparo,
      garantia_status,
      garantia_data
    } = body

    const { data, error } = await supabase
      .from("equipamentos")
      .insert([{
        cliente_id,
        equipamento,
        modelo,
        service_tag,
        acessorios,
        estado_visual,
        tentativa_reparo,
        garantia_status,
        garantia_data
      }])
      .select()

    if(error){
      return Response.json(
        { error:error.message },
        { status:500 }
      )
    }

    return Response.json(data[0])

  }catch(err){
    return Response.json(
      { error:"Erro ao salvar equipamento" },
      { status:500 }
    )
  }

}
