"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Header(){

  const [open,setOpen] = useState(false)

  return(

    <header className="bg-white border-b">

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

        {/* LOGO */}

        <Link href="/" className="flex items-center gap-2">

          <Image
            src="/lamp.svg"
            alt="Dell Resolve"
            width={34}
            height={34}
            priority
          />

          <span className="text-xl font-bold text-[#1F5F8B]">
            Dell Resolve
          </span>

        </Link>


        {/* MENU DESKTOP */}

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800">

          <Link href="/" className="hover:text-[#1F5F8B]">Início</Link>
          <Link href="/servicos" className="hover:text-[#1F5F8B]">Serviços</Link>
          <Link href="/blog" className="hover:text-[#1F5F8B]">Blog</Link>
          <Link href="/assistencia-dell/santana" className="hover:text-[#1F5F8B]">Zona Norte</Link>
          <Link href="/contato" className="hover:text-[#1F5F8B]">Contato</Link>

          <a
            href="https://wa.me/5511946674001"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            WhatsApp
          </a>

        </nav>


        {/* BOTÃO MOBILE */}

        <button
  onClick={()=>setOpen(!open)}
  className="md:hidden text-2xl text-gray-800 transition-transform duration-200"
>

  {open ? "✕" : "☰"}

</button>

      </div>


      {/* MENU MOBILE COM TRANSIÇÃO */}

      <div
        className={`md:hidden border-t bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >

        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 text-gray-800">

          <Link href="/" onClick={()=>setOpen(false)}>Início</Link>
          <Link href="/servicos" onClick={()=>setOpen(false)}>Serviços</Link>
          <Link href="/blog" onClick={()=>setOpen(false)}>Blog</Link>
          <Link href="/assistencia-dell/santana" onClick={()=>setOpen(false)}>Zona Norte</Link>
          <Link href="/contato" onClick={()=>setOpen(false)}>Contato</Link>

        </div>

      </div>

    </header>

  )

}
