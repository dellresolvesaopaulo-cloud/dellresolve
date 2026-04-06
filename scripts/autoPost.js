import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import { gerarConteudoIA } from "../lib/aiGenerator.js"
import { salvarPost } from "../lib/savePost.js"


function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-")
}

const problemas = ["não liga"]
const modelos = ["dell inspiron"]
const bairros = ["santana"]

async function rodar() {

  for (const problema of problemas) {
    for (const modelo of modelos) {
      for (const bairro of bairros) {

        console.log("Gerando:", problema, modelo, bairro)

        const conteudo = await gerarConteudoIA({
          problema,
          modelo,
          bairro
        })

        if (!conteudo) continue

        const slug = slugify(`${problema}-${modelo}-${bairro}`)

        await salvarPost({
          ...conteudo,
          slug,
          categoria: "reparo-dell"
        })

      }
    }
  }
}

rodar()
