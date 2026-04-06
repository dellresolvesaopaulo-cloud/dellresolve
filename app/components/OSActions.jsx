"use client"

import { useState } from "react"

export default function OSActions({numero,observacoes}){

const [obs,setObs] = useState(observacoes || "")

async function salvarObservacao(){

await fetch("/api/os",{
method:"PATCH",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
numero,
observacoes:obs
})
})

}

async function cancelarOS(){

await fetch("/api/os",{
method:"PATCH",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
numero,
status:"cancelada"
})
})

location.reload()

}

return(

<div className="mt-8">

<p className="font-semibold mb-2">
Observações internas
</p>

<textarea
value={obs}
onChange={(e)=>setObs(e.target.value)}
onBlur={salvarObservacao}
className="border p-3 rounded w-full"
/>

<button
onClick={cancelarOS}
className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
>

Cancelar OS

</button>

</div>

)

}
