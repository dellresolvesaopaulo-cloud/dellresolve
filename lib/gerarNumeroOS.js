import { supabase } from "./supabase"

export async function gerarNumeroOS(serviceTag){

  const base = "SR1002250"

  // 🔥 pega última OS
  const { data } = await supabase
    .from("ordens_servico")
    .select("numero")
    .order("created_at", { ascending: false })
    .limit(1)

  let sequencia = 1

  if(data && data.length > 0){

    const ultimo = data[0].numero

    const match = ultimo.match(/-(\d+)$/)

    if(match){
      sequencia = parseInt(match[1]) + 1
    }
  }

  const seq = String(sequencia).padStart(3,"0")

  return `${base}-${serviceTag}-${seq}`
}
