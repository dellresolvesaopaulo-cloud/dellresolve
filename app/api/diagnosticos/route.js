import { supabase } from "../../../lib/supabase"

export async function GET() {
  const { data, error } = await supabase
    .from("diagnosticos")
    .select("*")
    .order("titulo")

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data)
}


export async function POST(req) {
  const body = await req.json()

  const { titulo } = body

  const { data, error } = await supabase
    .from("diagnosticos")
    .insert([{ titulo }])
    .select()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json(data)
}
