"use client"

import { useState } from "react"

function statusColor(status){

if(status === "aberta") return "bg-yellow-500"
if(status === "em análise") return "bg-blue-500"
if(status === "orçamento enviado") return "bg-orange-500"
if(status === "aprovada") return "bg-green-600"
if(status === "concluída") return "bg-purple-600"
if(status === "entregue") return "bg-gray-600"
if(status === "cancelada") return "bg-red-600"

return "bg-gray-400"

}

export default function OSList({ordens}){

const [busca,setBusca] = useState("")

const filtradas = ordens.filter(os => {

const termo = busca.toLowerCase()

return(

os.cliente?.toLowerCase().includes(termo) ||
os.service_tag?.toLowerCase().includes(termo) ||
os.numero?.toLowerCase().includes(termo)

)

})

return(

<div>

<input
type="text"
placeholder="Buscar por cliente, service tag ou OS"
value={busca}
onChange={(e)=>setBusca(e.target.value)}
className="border px-4 py-2 rounded w-full mb-6"
/>

<table className="w-full border">

<thead>

<tr className="bg-gray-100">

<th className="p-3 border text-left">OS</th>
<th className="p-3 border text-left">Cliente</th>
<th className="p-3 border text-left">Service Tag</th>
<th className="p-3 border text-left">Status</th>

</tr>

</thead>

<tbody>

{filtradas.map((os)=>(

<tr key={os.numero}>

<td className="p-3 border">

<a
href={`/admin/os/${os.numero}`}
className="text-blue-600 underline"
>

{os.numero}

</a>

</td>

<td className="p-3 border">
{os.cliente}
</td>

<td className="p-3 border">
{os.service_tag}
</td>

<td className="p-3 border">

<span
className={`text-white text-sm px-3 py-1 rounded ${statusColor(os.status)}`}
>

{os.status}

</span>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}
