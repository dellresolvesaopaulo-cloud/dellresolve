"use client"

import { useState } from "react"

export default function NovaOS(){

const [cliente,setCliente] = useState("")
const [telefone,setTelefone] = useState("")
const [serviceTag,setServiceTag] = useState("")
const [modelo,setModelo] = useState("")
const [acessorios,setAcessorios] = useState("")
const [defeito,setDefeito] = useState("")
const [observacoes,setObservacoes] = useState("")

function handleSubmit(e){

e.preventDefault()

const base = 1002250

const numeroAleatorio = Math.floor(Math.random() * 900) + 100

const numeroOS = "SR" + (base + numeroAleatorio) + "-" + serviceTag.toUpperCase()

alert("OS criada: " + numeroOS)

}

return(

<div className="max-w-4xl mx-auto py-16 px-6">

<h1 className="text-3xl font-bold mb-10">
Nova Ordem de Serviço
</h1>

<form
onSubmit={handleSubmit}
className="grid gap-6"
>

<input
type="text"
placeholder="Nome do cliente"
value={cliente}
onChange={(e)=>setCliente(e.target.value)}
className="border rounded-lg px-4 py-3"
/>

<input
type="text"
placeholder="Telefone / WhatsApp"
value={telefone}
onChange={(e)=>setTelefone(e.target.value)}
className="border rounded-lg px-4 py-3"
/>

<input
type="text"
placeholder="Service Tag Dell"
value={serviceTag}
onChange={(e)=>setServiceTag(e.target.value)}
className="border rounded-lg px-4 py-3"
/>

<input
type="text"
placeholder="Modelo do notebook"
value={modelo}
onChange={(e)=>setModelo(e.target.value)}
className="border rounded-lg px-4 py-3"
/>

<input
type="text"
placeholder="Acessórios (fonte, mochila, etc)"
value={acessorios}
onChange={(e)=>setAcessorios(e.target.value)}
className="border rounded-lg px-4 py-3"
/>

<textarea
placeholder="Defeito relatado"
value={defeito}
onChange={(e)=>setDefeito(e.target.value)}
className="border rounded-lg px-4 py-3"
/>

<textarea
placeholder="Observações internas"
value={observacoes}
onChange={(e)=>setObservacoes(e.target.value)}
className="border rounded-lg px-4 py-3"
/>

<button
type="submit"
className="bg-blue-600 text-white py-3 rounded-lg font-semibold"
>
Criar OS
</button>

</form>

</div>

)

}