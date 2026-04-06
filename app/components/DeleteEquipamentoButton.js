"use client"

import { useRouter } from "next/navigation"

export default function DeleteEquipamentoButton({id}){

  const router = useRouter()

  async function handleDelete(){

    const confirmar = confirm(
      "Tem certeza que deseja excluir este equipamento?"
    )

    if(!confirmar) return

    const res = await fetch(`/api/equipamentos/${id}`,{
      method:"DELETE"
    })

    if(res.ok){

      router.push("/admin/equipamentos")
      router.refresh()

    }else{

      alert("Erro ao excluir equipamento")

    }

  }

  return(

    <button
      onClick={handleDelete}
      className="text-red-600 underline"
    >
      Excluir
    </button>

  )

}
