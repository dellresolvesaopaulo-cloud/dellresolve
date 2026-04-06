import { modelos } from "./modelos"
import { bairros } from "./bairros"

export function generateModeloBairroPages(){

const pages = {}

Object.entries(modelos).forEach(([modeloSlug, modelo])=>{

Object.entries(bairros).forEach(([bairroSlug, bairro])=>{

const slug = `${modeloSlug}-${bairroSlug}`

pages[slug] = {

title:`Assistência técnica ${modelo.nome} em ${bairro.nome}`,

description:`Assistência técnica especializada em notebooks ${modelo.nome} em ${bairro.nome}, Zona Norte de São Paulo.`,

content:`
Se você procura assistência técnica ${modelo.nome} em ${bairro.nome}, a Dell Resolve oferece diagnóstico especializado, manutenção completa e reparo de notebooks Dell.

Realizamos serviços como:

• troca de SSD
• upgrade de memória
• reparo de placa-mãe
• troca de tela
• limpeza interna

Atendemos clientes em ${bairro.nome} e toda a Zona Norte de São Paulo.
`

}

})

})

return pages

}
