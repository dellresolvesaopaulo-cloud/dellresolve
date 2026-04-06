import OpenAI from "openai"

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY não configurada")
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
}

export async function gerarConteudoIA({ problema, modelo, bairro }) {
  const openai = getOpenAIClient()

  const prompt = `
Crie um artigo SEO profissional para assistência técnica Dell.

Tema: ${modelo} com problema de ${problema} em ${bairro}

Responda em JSON:
{
  "titulo": "",
  "descricao": "",
  "conteudo": ""
}
`

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: prompt }
    ],
  })

  const text = response.choices[0].message.content

  const clean = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  try {
    return JSON.parse(clean)
  } catch {
    console.error("Erro ao interpretar resposta da IA")
    return null
  }
}
