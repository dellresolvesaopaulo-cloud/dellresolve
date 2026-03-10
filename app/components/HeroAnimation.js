"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function HeroAnimation() {

  return (

    <section className="relative overflow-hidden bg-gradient-to-r from-[#4f8fb0] via-[#5fa9c6] to-[#6aa7c3] text-white">

      {/* LUZ RADIAL */}

      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">

        {/* TEXTO */}

        <div>

          <span className="inline-block text-sm bg-white/20 px-4 py-1 rounded-full mb-6 backdrop-blur">
            Assistência Técnica Profissional Notebook Dell
          </span>

          <motion.h1
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6 }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            Assistência Técnica Especializada em Notebook Dell
          </motion.h1>

          <p className="mt-6 text-white/90 text-lg">
            Orçamento sem custo, peças novas e atendimento rápido
            prioritário na Zona Norte de São Paulo.
          </p>


          {/* BOTÕES */}

          <div className="mt-8 flex gap-4">

            <a
              href="https://wa.me/5511999999999"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
            >
              Falar no WhatsApp
            </a>

            <a
              href="#servicos"
              className="border border-white/60 px-6 py-3 rounded-lg font-semibold hover:bg-white/10"
            >
              Ver serviços
            </a>

          </div>


          {/* PROVA SOCIAL GOOGLE */}

          <div className="flex items-center gap-3 mt-6">

            <div className="flex text-yellow-300">

              <Star size={18}/>
              <Star size={18}/>
              <Star size={18}/>
              <Star size={18}/>
              <Star size={18}/>

            </div>

            <span className="text-sm text-white/90">
              Avaliação <strong>4.9 / 5</strong> no Google • mais de 200 avaliações
            </span>

          </div>

        </div>


        {/* FORMULÁRIO */}

        <motion.div
          initial={{ opacity:0, scale:0.95 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.5 }}
          className="bg-white/90 backdrop-blur text-gray-800 rounded-2xl shadow-2xl p-7"
        >

          <h3 className="font-semibold text-lg mb-4">
            Solicite atendimento agora
          </h3>

          <div className="space-y-3">

            <input
              className="w-full border rounded-md p-3"
              placeholder="Seu nome"
            />

            <input
              className="w-full border rounded-md p-3"
              placeholder="WhatsApp com DDD"
            />

            <input
              className="w-full border rounded-md p-3"
              placeholder="E-mail (opcional)"
            />

            <textarea
              className="w-full border rounded-md p-3"
              placeholder="Meu notebook Dell não liga."
            />

            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-semibold shadow-md"
            >
              Receber orçamento no WhatsApp
            </button>

          </div>

        </motion.div>

      </div>

    </section>

  );

}