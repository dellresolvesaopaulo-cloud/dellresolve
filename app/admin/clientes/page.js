import Link from "next/link"
import { headers } from "next/headers"
import { requireRole } from "../../../lib/requireRole"
import { getHeadersSiteUrl } from "../../../lib/siteUrl"

async function getClientes(baseUrl, cookie) {

  try {

    const res = await fetch(`${baseUrl}/api/clientes`, {
      cache: "no-store",
      headers: {
        cookie
      }
    })

    if (!res.ok) return []

    const text = await res.text()
    if (!text) return []

    return JSON.parse(text)

  } catch {
    return []
  }
}

export default async function ClientesPage() {
  await requireRole(["admin", "tecnico"])

  const headerList = await headers()
  const baseUrl = getHeadersSiteUrl(headerList)
  const cookie = headerList.get("cookie") || ""

  const lista = await getClientes(baseUrl, cookie)

  return (

    <div className="max-w-6xl mx-auto py-16 px-6">

      {/* 🔥 TOPO COM BOTÃO */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-3xl font-bold">
          Clientes
        </h1>

        <Link
          href="/admin/clientes/novo"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          + Novo Cliente
        </Link>

      </div>

      {/* 🔥 TABELA */}
      <table className="w-full border">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-3 border text-left">
              Nome
            </th>

            <th className="p-3 border text-left">
              Telefone
            </th>

            <th className="p-3 border text-left">
              Email
            </th>

            <th className="p-3 border text-left">
              Cidade
            </th>

          </tr>

        </thead>

        <tbody>

          {lista.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                Nenhum cliente encontrado
              </td>
            </tr>
          )}

          {lista.map((c) => (

            <tr key={c.id} className="hover:bg-gray-50">

              <td className="p-3 border">

                <Link
                  href={`/admin/clientes/${c.id}`}
                  className="text-blue-600 underline"
                >
                  {c.nome || "-"}
                </Link>

              </td>

              <td className="p-3 border">
                {c.telefone || "-"}
              </td>

              <td className="p-3 border">
                {c.email || "-"}
              </td>

              <td className="p-3 border">
                {c.cidade || "-"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}
