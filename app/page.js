"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  HardDrive,
  Monitor,
  Cpu,
  MemoryStick,
  Wind,
  Search,
  Menu,
  X,
  MapPin,
  Phone,
  MessageCircle,
  BadgeCheck,
  ShieldCheck,
  CreditCard
} from "lucide-react";

import { motion } from "framer-motion";

import HeroAnimation from "./components/HeroAnimation";
import GoogleReviews from "./components/GoogleReviews";
import ServiceCard from "./components/ServiceCard";
import TrustItem from "./components/TrustItem";
import DellModels from "./components/DellModels";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <main className="min-h-screen bg-white">

      {/* HEADER */}

      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">

        <div className="max-w-6xl mx-auto flex justify-between items-center py-5 px-6">

          <Link href="/" className="flex items-center gap-2">

            <Image
              src="/lamp.svg"
              alt="Dell Resolve"
              width={34}
              height={34}
            />

            <h1 className="text-xl md:text-2xl font-bold tracking-wide">
              <span style={{color:"#5FA9C6"}}>DELL</span>
              <span style={{color:"#1F5F8B"}}> RESOLVE</span>
            </h1>

          </Link>

          {/* MENU DESKTOP */}

          <nav className="hidden md:flex space-x-10 text-sm font-medium text-gray-700">

            <a href="#">Início</a>
            <a href="#servicos">Serviços</a>
            <a href="#">Blog</a>
            <a href="#contato">Contato</a>

          </nav>

          {/* MENU MOBILE */}

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28}/> : <Menu size={28}/>}
          </button>

        </div>

        {menuOpen && (

          <motion.div
            initial={{ opacity:0, y:-20 }}
            animate={{ opacity:1, y:0 }}
            className="md:hidden bg-white border-t"
          >

            <div className="flex flex-col p-6 space-y-4 text-lg">

              <a href="#">Início</a>
              <a href="#servicos">Serviços</a>
              <a href="#">Blog</a>
              <a href="#contato">Contato</a>

            </div>

          </motion.div>

        )}

      </header>



      {/* HERO */}

      <section className="relative overflow-hidden">
        <HeroAnimation />
      </section>



      {/* MODELOS DELL */}

      <DellModels />



      {/* PROBLEMAS */}

      <section className="py-16 bg-[#f8fafc]">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-[#1F5F8B]">
            Seu notebook está te deixando louco?
          </h2>

          <p className="mt-6 text-gray-700 leading-relaxed">

            Notebook lento, travando, desligando, sem imagem, sem carregar,
            aquecendo, teclado falhando, Wi-Fi instável, não identifica o carregador,
            leds piscando, Windows não carrega ou simplesmente não liga.

          </p>

          <a
            href="https://wa.me/5511999999999"
            className="inline-block mt-8 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg"
          >
            Chamar no WhatsApp agora
          </a>

        </div>

      </section>



      {/* SERVIÇOS */}

      <section id="servicos" className="bg-gray-50 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h3 className="text-3xl font-bold text-center text-[#1F5F8B]">
            Serviços Dell
          </h3>

          <p className="text-center text-gray-600 mt-4">
            Especialistas em reparo e manutenção de notebooks Dell.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">

            <ServiceCard icon={<HardDrive size={26} />} title="Troca de SSD">
              Upgrade de armazenamento para deixar seu notebook muito mais rápido.
            </ServiceCard>

            <ServiceCard icon={<Monitor size={26} />} title="Troca de Tela">
              Substituição de telas quebradas ou com defeito.
            </ServiceCard>

            <ServiceCard icon={<Cpu size={26} />} title="Reparo de Placa">
              Diagnóstico e reparo avançado de placa-mãe Dell.
            </ServiceCard>

            <ServiceCard icon={<MemoryStick size={26} />} title="Upgrade de Memória">
              Aumento de RAM para melhorar desempenho do sistema.
            </ServiceCard>

            <ServiceCard icon={<Wind size={26} />} title="Limpeza Interna">
              Limpeza e manutenção preventiva do sistema de refrigeração.
            </ServiceCard>

            <ServiceCard icon={<Search size={26} />} title="Diagnóstico Técnico">
              Análise completa do equipamento com orçamento detalhado.
            </ServiceCard>

          </div>

        </div>

      </section>



      {/* DIFERENCIAIS */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h3 className="text-3xl font-bold text-[#1F5F8B]">
            Por que escolher a Dell Resolve?
          </h3>

          <div className="grid md:grid-cols-4 gap-10 mt-14">

            <TrustItem icon={<BadgeCheck size={36}/>}>
              Especialistas em equipamentos Dell
            </TrustItem>

            <TrustItem icon={<ShieldCheck size={36}/>}>
              Peças originais garantidas
            </TrustItem>

            <TrustItem icon={<ShieldCheck size={36}/>}>
              Garantia de até 6 meses
            </TrustItem>

            <TrustItem icon={<CreditCard size={36}/>}>
              Pagamento facilitado
            </TrustItem>

          </div>

        </div>

      </section>



      {/* REVIEWS GOOGLE */}

      <section className="bg-gray-50 py-20">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h3 className="text-3xl font-bold text-[#1F5F8B]">
            Avaliações de Clientes
          </h3>

          <p className="mt-4 text-gray-600">
            Veja o que nossos clientes dizem no Google.
          </p>

          <div className="mt-14">
            <GoogleReviews />
          </div>

        </div>

      </section>



      {/* MAPA */}

      <section className="py-20 bg-white border-t border-gray-100">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-[#1F5F8B]">
            Estamos na Zona Norte de São Paulo
          </h2>

          <p className="mt-4 text-gray-600">
            Atendimento especializado em notebooks Dell para Santana, Tucuruvi,
            Casa Verde, Mandaqui e região.
          </p>

          <div className="mt-10 rounded-xl overflow-hidden shadow-lg">

            <iframe
              src="https://www.google.com/maps?q=Assist%C3%AAncia+T%C3%A9cnica+Dell+Zona+Norte+-+Dell+Resolve&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </section>



      {/* FOOTER */}

      <footer id="contato" className="bg-[#0f172a] text-white py-16">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">

          <div>

            <h4 className="font-bold text-lg mb-4">
              Dell Resolve
            </h4>

            <p className="text-gray-300">
              Assistência técnica especializada em notebooks Dell em São Paulo.
            </p>

          </div>

          <div>

            <h4 className="font-bold text-lg mb-4">
              Bairros atendidos
            </h4>

            <ul className="space-y-2 text-gray-300">

              <li>Santana</li>
              <li>Tucuruvi</li>
              <li>Casa Verde</li>
              <li>Mandaqui</li>
              <li>Parada Inglesa</li>

            </ul>

          </div>

          <div>

            <h4 className="font-bold text-lg mb-4">
              Contato
            </h4>

            <div className="space-y-3 text-gray-300">

              <p className="flex items-center gap-2">
                <MapPin size={18}/> Zona Norte • São Paulo
              </p>

              <p className="flex items-center gap-2">
                <Phone size={18}/> (11) 99999-9999
              </p>

              <p className="flex items-center gap-2">
                <MessageCircle size={18}/> WhatsApp
              </p>

            </div>

          </div>

        </div>

        <div className="text-center text-gray-400 mt-10 text-sm">
          © 1998-2026 Dell Resolve • Todos os direitos reservados
        </div>

      </footer>



      {/* WHATSAPP FLOAT */}

      <a
        href="https://wa.me/5511999999999"
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-xl"
      >
        WhatsApp
      </a>

    </main>

  );

}