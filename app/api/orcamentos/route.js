import { supabase } from "../../../lib/supabase"

export async function POST(req){

const form = await req.formData()

const os_id = form.get("os_id")
const descricao = form.get("descricao")
const valor = form.get("valor")

await supabase
.from("orcamentos")
.insert({

os_id,
descricao,
valor

})

return Response.redirect("/admin/dashboard")

}
