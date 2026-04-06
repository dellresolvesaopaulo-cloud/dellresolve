"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import { servicos } from "../../data/servicos"
import { bairros } from "../../data/bairros"

export default function SidebarServicos() {

  const params = useParams()
  const slug = params?.slug

  if (!slug) return null

  const servicoKey = Object.keys(servicos).find(s =>
    slug.startsWith(s)
  )

  if (!servicoKey) return null

  const bairroKey = slug.replace(`${servicoKey}-`, "")

  const servicoAtual = servicos[servicoKey]
  const bairroAtual = bairros[bairroKey]

  return (

    <aside className="w-full md:w-72 space-y-8">

      <div className="bg-gray-100 p-6 rounded-lg">

        <h3 className="font-semibold mb-4">
          {servicoAtual.nome} em outros bairros
        </h3>

        <ul className="space-y-2 text-sm">

          {Object.entries(bairros)
            .filter(([slug]) => slug !== bairroKey)
            .slice(0,8)
            .map(([slug, bairro]) => (

              <li key={slug}>

                <Link
                  href={`/servicos-dell/${servicoKey}-${slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {servicoAtual.nome} em {bairro.nome}
                </Link>

              </li>

          ))}

        </ul>

      </div>


      <div className="bg-gray-100 p-6 rounded-lg">

        <h3 className="font-semibold mb-4">
          Outros serviços em {bairroAtual.nome}
        </h3>

        <ul className="space-y-2 text-sm">

          {Object.entries(servicos)
            .filter(([slug]) => slug !== servicoKey)
            .map(([slug, servico]) => (

              <li key={slug}>

                <Link
                  href={`/servicos-dell/${slug}-${bairroKey}`}
                  className="text-blue-600 hover:underline"
                >
                  {servico.nome} em {bairroAtual.nome}
                </Link>

              </li>

          ))}

        </ul>

      </div>

    </aside>

  )

}
