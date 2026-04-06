import { supabase } from "../../../lib/supabase"

export async function GET(req){

const { searchParams } = new URL(req.url)
const q = searchParams.get("q") || ""

if(!q){
return Response.json({
clientes:[],
equipamentos:[],
os:[]
})
}

const termo = `%${q}%`

/* CLIENTES */

const { data:clientes } = await supabase
.from("clientes")
.select("*")
.ilike("nome",termo)

/* EQUIPAMENTOS */

const { data:equipamentos } = await supabase
.from("equipamentos")
.select("*")
.or(`service_tag.ilike.${termo},modelo.ilike.${termo}`)

/* OS */

const { data:os } = await supabase
.from("ordens_servico")
.select("*")
.or(`numero.ilike.${termo},defeito.ilike.${termo}`)

/* SE ACHOU CLIENTE → BUSCAR EQUIPAMENTOS DELE */

if(clientes.length){

const ids = clientes.map(c=>c.id)

const { data:eqCliente } = await supabase
.from("equipamentos")
.select("*")
.in("cliente_id",ids)

equipamentos.push(...eqCliente)

}

return Response.json({

clientes:clientes || [],
equipamentos:equipamentos || [],
os:os || []

})

}
