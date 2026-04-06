"use client"

import { useParams } from "next/navigation"

import { servicos } from "../../../data/servicos"
import { bairros } from "../../../data/bairros"

import Breadcrumb from "../../components/Breadcrumb"
import MapaZonaNorte from "../../components/MapaZonaNorte"
import SidebarServicos from "../../components/SidebarServicos"


export default function Page() {

  const params = useParams()
  const slug = params?.slug

  if (!slug) return null


  const servicoKey = Object.keys(servicos).find(s =>
    slug.startsWith(s)
  )

  if (!servicoKey) return null


  const bairroKey = slug.replace(`${servicoKey}-`, "")

  const servico = servicos[servicoKey]
  const bairro = bairros[bairroKey]

  if (!servico || !bairro) return null


  return (

    <main className="min-h-screen bg-white py-12 md:py-20">

      <div className="max-w-6xl mx-auto px-4 md:px-6">

        <Breadcrumb
          items={[
            { label: "Serviços Dell", href: "/servicos" },
            { label: bairro.nome }
          ]}
        />

        <div className="flex flex-col md:flex-row gap-10 mt-6">

          {/* conteúdo principal */}

          <div className="flex-1 min-w-0 order-1 md:order-2">

            <h1 className="text-2xl md:text-4xl font-bold text-[#1F5F8B] leading-tight">
              {servico.titulo} em {bairro.nome}
            </h1>

            <p className="mt-6 text-gray-700 leading-relaxed text-base md:text-lg">
              {servico.descricao}
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">

              A Dell Resolve oferece assistência técnica especializada em notebooks
              Dell na região de <strong>{bairro.nome}</strong>, Zona Norte de São Paulo.

            </p>

            <h2 className="text-xl md:text-2xl font-semibold mt-10">
              Serviços realizados
            </h2>

            <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-2">

              <li>Troca de SSD em notebook Dell</li>
              <li>Upgrade de memória RAM</li>
              <li>Reparo de placa-mãe Dell</li>
              <li>Troca de tela notebook Dell</li>
              <li>Limpeza interna e manutenção</li>

            </ul>

          </div>


          {/* sidebar */}

          <div className="w-full md:w-72 shrink-0 order-2 md:order-1">

            <SidebarServicos />

          </div>

        </div>

      </div>

      <MapaZonaNorte />

    </main>

  )

}
