export const problemas = [

"nao-liga",
"lento",
"nao-carrega-bateria",
"nao-reconhece-carregador",
"tela-preta",
"sem-som",
"sem-wifi",
"reiniciando",
"esquentando",
"nao-da-video"

]

export const modelos = [

"inspiron",
"latitude",
"xps",
"alienware",
"vostro",
"precision"

]

export function generatePosts() {

const posts = {}

modelos.forEach((modelo)=>{

problemas.forEach((problema)=>{

const slug = `notebook-dell-${modelo}-${problema}`

posts[slug] = {

title:`Notebook Dell ${modelo} ${problema.replaceAll("-", " ")}`,

description:`Veja por que o notebook Dell ${modelo} pode apresentar problema de ${problema.replaceAll("-", " ")} e como resolver.`,

image:`/blog/${problema}.jpg`,

content:`
Se o seu notebook Dell ${modelo} apresenta problema de ${problema.replaceAll("-", " ")}, isso pode estar relacionado a diversas causas.

Entre os motivos mais comuns:

• falha de hardware  
• problema de bateria  
• falha de memória RAM  
• defeito na placa-mãe  

Muitos notebooks Dell podem apresentar esse tipo de comportamento após anos de uso ou devido a superaquecimento.

Realizar um diagnóstico técnico é a forma mais segura de identificar a origem do problema.

A Dell Resolve realiza diagnóstico e reparo especializado em notebooks Dell na Zona Norte de São Paulo.
`

}

})

})

return posts

}
