"use client";

import siteConfig from "../config/site";
import Link from "next/link";

export default function HeroAnimation() {

return (

<section className="relative py-28 text-white">

<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

{/* TEXTO HERO */}

<div>

<h1 className="text-4xl md:text-5xl font-bold leading-tight">
Assistência Técnica Especializada em Notebook Dell
</h1>

<p className="mt-6 text-lg text-white/90">
Diagnóstico profissional, reparo avançado e peças de qualidade para notebooks Dell na Zona Norte de São Paulo.
</p>

<div className="flex gap-6 mt-10">

<a
href={`https://wa.me/${siteConfig.whatsapp}`}
className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-semibold shadow-lg"
>
Falar no WhatsApp
</a>

<Link
href="/servicos"
className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#1F5F8B] transition"
>
Ver serviços
</Link>

</div>

</div>


{/* FORMULÁRIO HERO */}

<div className="bg-white rounded-xl shadow-xl p-8 text-gray-800">

<h3 className="text-lg font-semibold mb-6">
Solicite atendimento agora
</h3>

<form className="flex flex-col gap-4">

<input
type="text"
placeholder="Seu nome"
className="border rounded-lg px-4 py-3"
/>

<input
type="text"
placeholder="WhatsApp com DDD"
className="border rounded-lg px-4 py-3"
/>

<input
type="email"
placeholder="E-mail (opcional)"
className="border rounded-lg px-4 py-3"
/>

<textarea
placeholder="Meu notebook Dell não liga."
className="border rounded-lg px-4 py-3"
/>

<button
type="submit"
className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
>
Receber orçamento no WhatsApp
</button>

</form>

</div>

</div>

</section>

);
}