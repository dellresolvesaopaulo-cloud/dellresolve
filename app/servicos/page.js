import { HardDrive, Monitor, Cpu, MemoryStick, Wind, Search } from "lucide-react"
import MapaZonaNorte from "../components/MapaZonaNorte"
import BairrosAtendidos from "../components/BairrosAtendidos"
import FaqDell from "../components/FaqDell"

export default function Servicos() {

  const services = [
    {
      icon: <HardDrive size={28} />,
      title: "Troca de SSD em notebook Dell",
      description:
        "Upgrade ou substituição de SSD para aumentar a velocidade e desempenho do notebook Dell."
    },
    {
      icon: <Monitor size={28} />,
      title: "Troca de tela notebook Dell",
      description:
        "Substituição de telas quebradas, riscadas ou com problemas de imagem em notebooks Dell."
    },
    {
      icon: <Cpu size={28} />,
      title: "Reparo de placa-mãe Dell",
      description:
        "Diagnóstico e reparo avançado em placa-mãe de notebooks Dell com equipamentos profissionais."
    },
    {
      icon: <MemoryStick size={28} />,
      title: "Upgrade de memória RAM",
      description:
        "Instalação ou upgrade de memória RAM para melhorar desempenho e multitarefa."
    },
    {
      icon: <Wind size={28} />,
      title: "Limpeza interna e manutenção",
      description:
        "Limpeza completa do sistema de ventilação para evitar aquecimento e travamentos."
    },
    {
      icon: <Search size={28} />,
      title: "Diagnóstico técnico especializado",
      description:
        "Análise completa do notebook Dell para identificar defeitos de hardware ou software."
    }
  ]

  return (

    <main className="min-h-screen bg-white py-20">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center text-[#1F5F8B]">
          Serviços especializados em notebooks Dell
        </h1>

        <p className="text-center text-gray-600 mt-6 max-w-3xl mx-auto">
          Somos especialistas em manutenção e reparo de notebooks Dell.
          Atendemos toda a linha Inspiron, Latitude, XPS e Alienware com diagnóstico
          profissional e peças de qualidade.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-16">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition"
            >

              <div className="text-[#1F5F8B] mb-4">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {service.description}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Seção mapa */}
      <MapaZonaNorte />

<BairrosAtendidos />
<FaqDell />

    </main>

  )
}
