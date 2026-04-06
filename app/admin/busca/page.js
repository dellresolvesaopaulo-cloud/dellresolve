import Link from "next/link"
import { headers } from "next/headers"
import { requireRole } from "../../../lib/requireRole"
import { getHeadersSiteUrl } from "../../../lib/siteUrl"

async function getClientes(baseUrl, cookie) {
  const res = await fetch(`${baseUrl}/api/clientes`, {
    cache: "no-store",
    headers: {
      cookie
    }
  })
  return res.json()
}

async function getEquipamentos(baseUrl, cookie) {
  const res = await fetch(`${baseUrl}/api/equipamentos`, {
    cache: "no-store",
    headers: {
      cookie
    }
  })
  return res.json()
}

async function getOS(baseUrl, cookie) {
  const res = await fetch(`${baseUrl}/api/os`, {
    cache: "no-store",
    headers: {
      cookie
    }
  })
  return res.json()
}

export default async function Busca({ searchParams }) {
  await requireRole(["admin", "tecnico"])

  const headerList = await headers()
  const baseUrl = getHeadersSiteUrl(headerList)
  const cookie = headerList.get("cookie") || ""

  const params = await searchParams
  const q = params?.q?.toLowerCase() || ""

  const clientes = await getClientes(baseUrl, cookie)
  const equipamentos = await getEquipamentos(baseUrl, cookie)
  const osResponse = await getOS(baseUrl, cookie)
  const osList = osResponse?.ordens || osResponse || []

  const clientesFiltrados = clientes.filter(c =>
    c.nome?.toLowerCase().includes(q)
  )

  const equipamentosFiltrados = equipamentos.filter(e =>
    e.service_tag?.toLowerCase().includes(q)
  )

  const osFiltradas = osList.filter(o =>
    o.numero?.toLowerCase().includes(q)
  )

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">

      <h1 className="text-3xl font-bold mb-8">
        Resultados da busca: &quot;{q}&quot;
      </h1>

      {clientesFiltrados.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Clientes</h2>

          <ul className="mb-10">
            {clientesFiltrados.map(c => (
              <li key={c.id}>
                <Link
                  href={`/admin/clientes/${c.id}`}
                  className="text-blue-600 underline"
                >
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {equipamentosFiltrados.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Equipamentos</h2>

          <ul className="mb-10">
            {equipamentosFiltrados.map(e => (
              <li key={e.id}>
                Service Tag: {e.service_tag}
              </li>
            ))}
          </ul>
        </>
      )}

      {osFiltradas.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">Ordens de Serviço</h2>

          <ul>
            {osFiltradas.map(o => (
              <li key={o.numero}>
                <Link
                  href={`/admin/os/${o.id || o.numero}`}
                  className="text-blue-600 underline"
                >
                  {o.numero}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {clientesFiltrados.length === 0 &&
       equipamentosFiltrados.length === 0 &&
       osFiltradas.length === 0 && (
        <p>Nenhum resultado encontrado.</p>
      )}

    </div>
  )
}
