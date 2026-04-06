"use client"

import { useRouter } from "next/navigation"

export default function DeleteClienteButton({id}){

  const router = useRouter()

  async function handleDelete(){

    const confirmar = confirm(
      "Tem certeza que deseja excluir este cliente?"
    )

    if(!confirmar) return

    const res = await fetch(`/api/clientes/${id}`,{
      method:"DELETE"
    })

    if(res.ok){

      router.push("/admin/clientes")
      router.refresh()

    }else{

      const erro = await res.json()
      alert(erro.error)

    }

  }

  return(

    <button
      onClick={handleDelete}
      className="text-red-600 underline"
    >
      Excluir Cliente
    </button>

  )

}
