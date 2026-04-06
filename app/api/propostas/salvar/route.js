import { NextResponse } from "next/server"
import { supabase } from "../../../../lib/supabase"

export async function POST(req) {
  try {
    const { numero, dados } = await req.json()

    // pega última versão
    const { data } = await supabase
      .from("propostas")
      .select("versao")
      .eq("numero_os", numero)
      .order("versao", { ascending: false })
      .limit(1)

    const versao = data?.[0]?.versao + 1 || 1

    const { error } = await supabase
      .from("propostas")
      .insert({
        numero_os: numero,
        versao,
        dados
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })

  } catch (err) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
