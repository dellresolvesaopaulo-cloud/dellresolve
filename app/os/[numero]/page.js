import { headers } from "next/headers"
import { getHeadersSiteUrl } from "../../../lib/siteUrl"

async function getOS(baseUrl, numero){

  const res = await fetch(`${baseUrl}/api/os/${encodeURIComponent(numero)}`,{
    cache:"no-store"
  })

  return res.json()

}

export default async function AcompanharOS({params}){
  const headerList = await headers()
  const baseUrl = getHeadersSiteUrl(headerList)

  const {numero} = await params

  const os = await getOS(baseUrl, numero)

  if(!os){
    return <div className="p-10">Ordem de serviço não encontrada</div>
  }

  const cliente = os.cliente || os.clientes?.nome || "-"
  const serviceTag = os.service_tag || os.equipamentos?.service_tag || "-"
  const historico = Array.isArray(os.historico) ? os.historico : []

  return(

    <div className="max-w-3xl mx-auto py-16 px-6">

      <h1 className="text-3xl font-bold mb-8">
        Acompanhamento da Ordem de Serviço
      </h1>

      <div className="space-y-4 mb-10">

        <p><strong>OS:</strong> {os.numero}</p>

        <p><strong>Cliente:</strong> {cliente}</p>

        <p><strong>Service Tag:</strong> {serviceTag}</p>

        <p><strong>Status:</strong> {os.status}</p>

      </div>

      <h2 className="text-xl font-bold mb-4">
        Histórico do atendimento
      </h2>

      <div className="space-y-3">

        {historico.map((item,index)=>(

          <div
            key={index}
            className="border rounded p-3 bg-gray-50 text-sm"
          >

            <div className="text-gray-500">
              {new Date(item.data).toLocaleString()}
            </div>

            <div>
              {item.evento}
            </div>

          </div>

        ))}

      </div>

    </div>

  )

}
