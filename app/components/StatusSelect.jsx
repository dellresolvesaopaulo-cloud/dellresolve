"use client"

export default function StatusSelect({ numero, status }) {

  async function handleChange(e) {

    await fetch("/api/os",{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        numero,
        status: e.target.value
      })
    })

    location.reload()

  }

  return (

    <select
      defaultValue={status}
      onChange={handleChange}
      className="border px-4 py-2 rounded"
    >

      <option value="aberta">aberta</option>
      <option value="em análise">em análise</option>
      <option value="orçamento enviado">orçamento enviado</option>
      <option value="aprovada">aprovada</option>
      <option value="concluída">concluída</option>
      <option value="entregue">entregue</option>

    </select>

  )

}
