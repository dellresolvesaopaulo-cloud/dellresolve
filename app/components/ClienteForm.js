"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ClienteForm({ cliente }){

  const router = useRouter()

  const [nome,setNome] = useState(cliente?.nome || "")
  const [cpf_cnpj,setCpf] = useState(cliente?.cpf_cnpj || "")
  const [telefone,setTelefone] = useState(cliente?.telefone || "")
  const [email,setEmail] = useState(cliente?.email || "")
  const [endereco,setEndereco] = useState(cliente?.endereco || "")
  const [cidade,setCidade] = useState(cliente?.cidade || "")
  const [estado,setEstado] = useState(cliente?.estado || "")
  const [cep,setCep] = useState(cliente?.cep || "")

  async function handleSubmit(e){

    e.preventDefault()

    const metodo = cliente?.id ? "PUT" : "POST"
    const url = cliente?.id
      ? `/api/clientes/${cliente.id}`
      : "/api/clientes"

    const res = await fetch(url,{
      method: metodo,
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        nome,
        cpf_cnpj,
        telefone,
        email,
        endereco,
        cidade,
        estado,
        cep
      })
    })

    if(res.ok){
      router.push("/admin/clientes")
      router.refresh()
    }else{
      alert("Erro ao salvar cliente")
    }

  }

  return(

    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl">

      <input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} className="border p-2 w-full"/>
      <input placeholder="CPF/CNPJ" value={cpf_cnpj} onChange={e=>setCpf(e.target.value)} className="border p-2 w-full"/>
      <input placeholder="Telefone" value={telefone} onChange={e=>setTelefone(e.target.value)} className="border p-2 w-full"/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 w-full"/>

      <input placeholder="Endereço" value={endereco} onChange={e=>setEndereco(e.target.value)} className="border p-2 w-full"/>
      <input placeholder="Cidade" value={cidade} onChange={e=>setCidade(e.target.value)} className="border p-2 w-full"/>
      <input placeholder="Estado" value={estado} onChange={e=>setEstado(e.target.value)} className="border p-2 w-full"/>
      <input placeholder="CEP" value={cep} onChange={e=>setCep(e.target.value)} className="border p-2 w-full"/>

      <button className="bg-green-600 text-white px-6 py-2 rounded">
        Salvar Cliente
      </button>

    </form>
  )
}
