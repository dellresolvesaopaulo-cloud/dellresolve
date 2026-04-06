"use client"

import { useEffect, useState } from "react"

export default function EquipamentosPage() {

  const [equipamentos, setEquipamentos] = useState([])

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/equipamentos")
      const data = await res.json()
      setEquipamentos(data || [])
    }
    load()
  }, [])

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Equipamentos
        </h1>

        <a
          href="/admin/equipamentos/novo"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Novo Equipamento
        </a>
      </div>

      {/* TABELA */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">

          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Equipamento</th>
              <th className="border p-3 text-left">Service Tag</th>
              <th className="border p-3 text-left">Modelo</th>
              <th className="border p-3 text-left">Cliente</th>
            </tr>
          </thead>

          <tbody>
            {equipamentos.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">

                {/* 🔥 LINK RESTAURADO */}
                <td className="border p-3">
                  <a
                    href={`/admin/equipamentos/${e.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {e.equipamento}
                  </a>
                </td>

                <td className="border p-3">
                  {e.service_tag}
                </td>

                <td className="border p-3">
                  {e.modelo}
                </td>

                <td className="border p-3">
                  {e.cliente?.nome || "-"}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}
