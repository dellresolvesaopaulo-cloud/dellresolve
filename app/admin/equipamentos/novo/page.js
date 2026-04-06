"use client"

import { useState,useEffect } from "react"

export default function NovoEquipamento(){

const [clientes,setClientes] = useState([])
const [cliente,setCliente] = useState("")

const [equipamento,setEquipamento] = useState("")
const [serviceTag,setServiceTag] = useState("")
const [modelo,setModelo] = useState("")
const [acessorios,setAcessorios] = useState("")
const [estado,setEstado] = useState("")
const [tentativa,setTentativa] = useState("")

useEffect(()=>{

fetch("/api/clientes")
.then(res=>res.json())
.then(setClientes)

},[])

async function handleSubmit(e){

e.preventDefault()

const data = {

cliente_id:cliente,
equipamento,
service_tag:serviceTag,
modelo,
acessorios,
estado_visual:estado,
tentativa_reparo:tentativa

}

await fetch("/api/equipamentos",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)

})

alert("Equipamento cadastrado")

}

return(

<div className="max-w-3xl mx-auto py-16 px-6">

<h1 className="text-3xl font-bold mb-10">
Cadastrar Equipamento
</h1>

<form
onSubmit={handleSubmit}
className="grid gap-6"
>

<div>

<label className="block mb-2">
Cliente
</label>

<select
value={cliente}
onChange={(e)=>setCliente(e.target.value)}
className="border rounded px-4 py-3 w-full"
>

<option value="">
Selecione o cliente
</option>

{clientes.map(c=>(
<option key={c.id} value={c.id}>
{c.nome}
</option>
))}

</select>

</div>


<input
placeholder="Equipamento"
value={equipamento}
onChange={(e)=>setEquipamento(e.target.value)}
className="border rounded px-4 py-3"
/>

<input
placeholder="Service Tag"
value={serviceTag}
onChange={(e)=>setServiceTag(e.target.value)}
className="border rounded px-4 py-3"
/>

<input
placeholder="Modelo"
value={modelo}
onChange={(e)=>setModelo(e.target.value)}
className="border rounded px-4 py-3"
/>

<input
placeholder="Acessórios"
value={acessorios}
onChange={(e)=>setAcessorios(e.target.value)}
className="border rounded px-4 py-3"
/>

<textarea
placeholder="Estado visual"
value={estado}
onChange={(e)=>setEstado(e.target.value)}
className="border rounded px-4 py-3"
/>

<select
value={tentativa}
onChange={(e)=>setTentativa(e.target.value)}
className="border rounded px-4 py-3"
>

<option value="">Tentativa de reparo?</option>
<option value="nao">Não</option>
<option value="sim">Sim</option>

</select>

<button
className="bg-blue-600 text-white py-3 rounded font-semibold"
>

Cadastrar equipamento

</button>

</form>

</div>

)

}
