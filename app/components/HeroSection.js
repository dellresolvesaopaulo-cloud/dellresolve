import HeroForm from "./HeroForm"
import siteConfig from "../config/site"
import Link from "next/link"

export default function HeroSection() {

return (

<section className="relative py-28 text-white">

<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

<div>

<h1 className="text-4xl md:text-5xl font-bold leading-tight">
Assistência Técnica Especializada em Notebook Dell
</h1>

<p className="mt-6 text-lg text-white/90">
Diagnóstico profissional, reparo avançado e peças de qualidade
para notebooks Dell na Zona Norte de São Paulo.
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
className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#1F5F8B]"
>
Ver serviços
</Link>

</div>

</div>

<HeroForm />

</div>

</section>

)
}