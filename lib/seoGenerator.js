export function gerarArtigoSEO({ problema, modelo, bairro }) {

  const titulo = `${modelo} com problema de ${problema} em ${bairro}`

  const slug = `${problema}-${modelo}-${bairro}`
    .toLowerCase()
    .replace(/\s+/g, "-")

  const descricao = `Veja como resolver ${problema} em ${modelo} na região de ${bairro}.`

  const conteudo = `
Se o seu ${modelo} está com ${problema}, isso pode indicar falha comum de hardware ou software.

## Possíveis causas
- Desgaste de componentes
- Falha de sistema
- Problema elétrico

## Solução
Recomendamos diagnóstico técnico especializado.

## Atendimento em ${bairro}
Atendemos toda região com rapidez e garantia.
`

  return {
    titulo,
    slug,
    descricao,
    conteudo,
    categoria: "reparo-dell",
    autor: "Dell Resolve",
    tempo_leitura: 3
  }
}
