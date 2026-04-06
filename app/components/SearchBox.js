"use client"

import { useState } from "react"
import Link from "next/link"

export default function SearchBox(){

  const [q,setQ] = useState("")
  const [results,setResults] = useState(null)

  async function handleSearch(value){

    setQ(value)

    if(value.length < 2){
      setResults(null)
      return
    }

    const res = await fetch(`/api/busca?q=${value}`)
    const data = await res.json()

    setResults(data)

  }

  return (

    <div className="mb-10 relative">

      <input
        type="text"
        placeholder="Buscar cliente, service tag ou OS"
        value={q}
        onChange={e=>handleSearch(e.target.value)}
        className="border px-4 py-3 rounded-lg w-full max-w-md"
      />

      {results && (

        <div className="absolute z-10 mt-2 bg-white border rounded-lg p-4 w-full max-w-md shadow-lg space-y-3">

          {/* CLIENTES */}

          {results.clientes?.length > 0 && (
            <div>

              <p className="text-sm font-semibold text-gray-500 mb-1">
                Clientes
              </p>

              {results.clientes.map(c=>(
                <div key={c.id}>

                  <Link
                    href={`/admin/clientes/${c.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {c.nome}
                  </Link>

                </div>
              ))}

            </div>
          )}

          {/* EQUIPAMENTOS */}

          {results.equipamentos?.length > 0 && (
            <div>

              <p className="text-sm font-semibold text-gray-500 mb-1">
                Equipamentos
              </p>

              {results.equipamentos.map(e=>(
                <div key={e.id}>
                  Service Tag: {e.service_tag}
                </div>
              ))}

            </div>
          )}

          {/* ORDENS DE SERVIÇO */}

          {results.os?.length > 0 && (
            <div>

              <p className="text-sm font-semibold text-gray-500 mb-1">
                Ordens de Serviço
              </p>

              {results.os.map(o=>(
                <div key={o.id}>

                  <Link
                    href={`/admin/os/${o.numero}`}
                    className="text-blue-600 hover:underline"
                  >
                    {o.numero}
                  </Link>

                </div>
              ))}

            </div>
          )}

          {results.clientes?.length === 0 &&
           results.equipamentos?.length === 0 &&
           results.os?.length === 0 && (
            <p className="text-gray-500">
              Nenhum resultado
            </p>
          )}

        </div>

      )}

    </div>

  )

}
