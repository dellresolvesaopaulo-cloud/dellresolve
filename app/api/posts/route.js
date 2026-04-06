import { supabase } from "../../../lib/supabase"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")

  if (!slug) {
    return Response.json(null)
  }

  const { data } = await supabase
    .from("posts")
    .select("*")
    .ilike("slug", slug)
    .limit(1)

  return Response.json(data?.[0] || null)
}
