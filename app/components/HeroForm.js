"use client"

import { useState } from "react"
import siteConfig from "../config/site"

export default function HeroForm() {

const [name,setName] = useState("")
const [whatsapp,setWhatsapp] = useState("")
const [email,setEmail] = useState("")
const [problem,setProblem] = useState("")

function handleSubmit(e){

e.preventDefault()

const message = `
Olá, meu nome é ${name}

WhatsApp: ${whatsapp}
Email: ${email}

Problema no notebook Dell:
${problem}

Gostaria de um orçamento.
`

const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`

window.open(url,"_blank")

}

return (

<div className="bg-white rounded-xl shadow-xl p-8 text-gray-800">

<h3 className="text-lg font-semibold mb-6">
Solicite atendimento agora
</h3>

<form
onSubmit={handleSubmit}
className="flex flex-col gap-4"
>

<input
type="text"
placeholder="Seu nome"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border rounded-lg px-4 py-3"
/>

<input
type="text"
placeholder="WhatsApp com DDD"
value={whatsapp}
onChange={(e)=>setWhatsapp(e.target.value)}
className="border rounded-lg px-4 py-3"
/>

<input
type="email"
placeholder="E-mail (opcional)"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border rounded-lg px-4 py-3"
/>

<textarea
placeholder="Meu notebook Dell não liga."
value={problem}
onChange={(e)=>setProblem(e.target.value)}
className="border rounded-lg px-4 py-3"
/>

<button
type="submit"
className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
>
Receber orçamento no WhatsApp
</button>

</form>

</div>

)
}