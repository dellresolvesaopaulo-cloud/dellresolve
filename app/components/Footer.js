import siteConfig from "../config/site"
import { MapPin, Phone, MessageCircle } from "lucide-react"

export default function Footer() {

  return (

    <footer className="bg-[#0f172a] text-white py-16">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">

        <div>
          <h4 className="font-bold text-lg mb-4">
            {siteConfig.name}
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
              <MapPin size={18}/>
              {siteConfig.address.street} • {siteConfig.address.city}
            </p>

            <p className="flex items-center gap-2">
              <Phone size={18}/>
              {siteConfig.phone}
            </p>

            <p className="flex items-center gap-2">
              <MessageCircle size={18}/>
              WhatsApp
            </p>

          </div>

        </div>

      </div>

      <div className="text-center text-gray-400 mt-10 text-sm">
        © 2026 {siteConfig.name} • Todos os direitos reservados
      </div>

    </footer>

  )

}
