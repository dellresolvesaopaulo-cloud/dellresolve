import { gerarArtigoSEO } from "../lib/seoGenerator.js"

const problemas = ["não liga", "bateria não carrega", "tela quebrada"]
const modelos = ["dell inspiron", "dell vostro"]
const bairros = ["santana", "tucuruvi"]

const posts = []

for (const problema of problemas) {
  for (const modelo of modelos) {
    for (const bairro of bairros) {

      posts.push(
        gerarArtigoSEO({ problema, modelo, bairro })
      )

    }
  }
}

console.log(posts)
