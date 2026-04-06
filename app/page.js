"use client";

import Link from "next/link";
import { useState } from "react";

import {
HardDrive,
Monitor,
Cpu,
MemoryStick,
Wind,
Search,
BadgeCheck,
ShieldCheck,
CreditCard
} from "lucide-react";

import HeroSection from "./components/HeroSection";
import GoogleReviews from "./components/GoogleReviews";
import ServiceCard from "./components/ServiceCard";
import TrustItem from "./components/TrustItem";
import DellModels from "./components/DellModels";

import siteConfig from "./config/site";

export default function Home() {

const [menuOpen, setMenuOpen] = useState(false);

const trackWhatsAppClick = (label) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "click_whatsapp", {
      event_category: "engagement",
      event_label: label
    });
  }
};

return (

<main className="min-h-screen bg-white">


{/* HERO */}

<section className="relative overflow-hidden">

<div className="absolute inset-0 bg-gradient-to-r from-[#5FA9C6] to-[#1F5F8B] opacity-90"></div>

<HeroSection />

</section>


{/* LINHA DELL */}

<DellModels />


{/* PROBLEMAS */}

<section className="py-16 bg-[#f8fafc]">

<div className="max-w-4xl mx-auto px-6 text-center">

<h2 className="text-3xl md:text-4xl font-bold text-[#1F5F8B]">
Seu notebook está te deixando louco?
</h2>

<p className="mt-6 text-gray-700 leading-relaxed">

Notebook lento, travando, desligando, sem imagem,
sem carregar, aquecendo, teclado falhando,
Wi-Fi instável, não identifica o carregador,
leds piscando, Windows não carrega
ou simplesmente não liga.

</p>

<a
href={`https://wa.me/${siteConfig.whatsapp}`}
onClick={() => trackWhatsAppClick("Hero WhatsApp Button")}
className="inline-block mt-8 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg"
>
Chamar no WhatsApp agora
</a>

</div>

</section>


{/* SERVIÇOS */}

<section className="bg-gray-50 py-20">

<div className="max-w-6xl mx-auto px-6">

<h3 className="text-3xl font-bold text-center text-[#1F5F8B]">
Serviços Dell
</h3>

<p className="text-center text-gray-600 mt-4">
            Especialistas Profissionais em reparo e manutenção de notebooks Dell.
          </p>

<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">

<ServiceCard icon={<HardDrive size={26}/>} title="Troca de SSD">
              Upgrade de armazenamento para deixar seu notebook até 10x muito mais rápido.
            </ServiceCard>

            <ServiceCard icon={<Monitor size={26}/>} title="Troca de Tela">
              Substituição de telas LCD/LED quebrada ou com defeito.
            </ServiceCard>

            <ServiceCard icon={<Cpu size={26}/>} title="Reparo de Placa">
              Diagnóstico e reparo avançado de placa-mãe Dell genuína.
            </ServiceCard>

            <ServiceCard icon={<MemoryStick size={26}/>} title="Upgrade de Memória">
              Aumento/upgrade de memória RAM para otimizar o desempenho do sistema.
            </ServiceCard>

            <ServiceCard icon={<Wind size={26}/>} title="Limpeza Interna">
              Limpeza e manutenção preventiva do sistema de refrigeração e dissipação.
            </ServiceCard>

            <ServiceCard icon={<Search size={26}/>} title="Diagnóstico Técnico">
              Análise completa do equipamento com orçamento detalhado.
            </ServiceCard>

</div>

</div>

</section>


{/* CONFIANÇA */}

<section className="py-20 bg-white">

<div className="max-w-6xl mx-auto px-6 text-center">

<h3 className="text-3xl font-bold text-[#1F5F8B]">
Mais de 2000 notebooks Dell reparados
</h3>

<div className="grid md:grid-cols-4 gap-10 mt-14">

<TrustItem icon={<BadgeCheck size={36}/>}>
              Profissionais em equipamentos Dell
            </TrustItem>

            <TrustItem icon={<ShieldCheck size={36}/>}>
              Peças novas e originais garantidas direto do fabricante
            </TrustItem>

            <TrustItem icon={<ShieldCheck size={36}/>}>
              Garantia de até 6 meses ou até 9 meses (consulte antes)
            </TrustItem>

            <TrustItem icon={<CreditCard size={36}/>}>
              Pagamento facilitado em até 10x (consulte antes)
            </TrustItem>

</div>

</div>

</section>


{/* GOOGLE REVIEWS */}

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

<section className="py-20 bg-white">

<div className="max-w-6xl mx-auto px-6 text-center">

<h3 className="text-3xl font-bold text-[#1F5F8B]">
Estamos na Zona Norte de São Paulo
</h3>

<p className="mt-4 text-gray-600">
            Atendimento especializado em notebooks Dell
            para Santana, Tucuruvi, Casa Verde, Mandaqui, Tremembé, Jd. São Paulo, Parada Inglesa, Lauzane Paulista, Cachoeirinha, Limão, Imirim, Vila Guilherme, Guarulhos, Mairiporã, Lapa, Barra Funda, Perus, Paulista, Faria Lima, Aeroporto, Jd. Europa, Jd. Paulista, Vila Olímpia, Moema e região e + Coleta e entrega programada (consulte antes).
          </p>

<div className="mt-12 rounded-xl overflow-hidden shadow-lg">

<iframe
src={siteConfig.googleMapsEmbed}
width="100%"
height="420"
style={{ border: 0 }}
loading="lazy"
referrerPolicy="no-referrer-when-downgrade"
/>

</div>

</div>

</section>




</main>

);

}
