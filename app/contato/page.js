"use client"

import siteConfig from "../config/site"
import { MapPin, Phone, MessageCircle } from "lucide-react"
import MapaZonaNorte from "../components/MapaZonaNorte"

export default function Contato() {

  return (

    <main className="min-h-screen bg-white py-20">

      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center text-[#1F5F8B]">
          Fale com a Dell Resolve
        </h1>

        <p className="text-center text-gray-600 mt-4">
          Entre em contato conosco para diagnóstico ou orçamento do seu notebook Dell.
        </p>

        <div className="grid md:grid-cols-2 gap-16 mt-16">

          {/* FORMULÁRIO */}

          <form className="space-y-6">

            <input
              type="text"
              placeholder="Seu nome"
              className="w-full border p-4 rounded-lg"
            />

            <input
              type="tel"
              placeholder="Telefone / WhatsApp"
              className="w-full border p-4 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-4 rounded-lg"
            />

            <textarea
              placeholder="Descreva o problema do seu notebook Dell"
              rows="5"
              className="w-full border p-4 rounded-lg"
            />

            <button
              className="bg-[#1F5F8B] hover:bg-[#17496b] text-white px-8 py-4 rounded-lg font-semibold"
            >
              Enviar mensagem
            </button>

          </form>


          {/* INFORMAÇÕES */}

          <div className="space-y-6">

            <div className="flex items-center gap-4">

              <Phone size={24} className="text-[#1F5F8B]" />

              <div>

                <p className="font-semibold">Telefone</p>

                <p className="text-gray-600">
                  {siteConfig.phone}
                </p>

              </div>

            </div>


            <div className="flex items-center gap-4">

              <MessageCircle size={24} className="text-[#1F5F8B]" />

              <div>

                <p className="font-semibold">WhatsApp</p>

                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  className="text-green-600 hover:underline"
                >
                  Iniciar conversa
                </a>

              </div>

            </div>


            <div className="flex items-center gap-4">

              <MapPin size={24} className="text-[#1F5F8B]" />

              <div>

                <p className="font-semibold">Endereço</p>

                <p className="text-gray-600">
                  {siteConfig.address.street} — {siteConfig.address.city}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* MAPA ZONA NORTE */}

      <MapaZonaNorte />

    </main>

  )

}
