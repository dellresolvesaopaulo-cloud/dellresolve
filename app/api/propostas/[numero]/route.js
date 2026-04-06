import { supabase } from "../../../../lib/supabase"

export async function GET(req, context) {

  const { numero } = await context.params

  const { data, error } = await supabase
    .from("propostas")
    .select("*")
    .eq("numero_os", numero)
    .order("versao", { ascending: false })

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data)
}
