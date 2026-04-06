import Link from "next/link"

export default function Footer(){

  return(

    <footer className="bg-[#0f172a] text-white py-16 mt-20">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">

        {/* EMPRESA */}

        <div>

          <h4 className="font-bold text-lg mb-4">
            Dell Resolve
          </h4>

          <p className="text-gray-300">
            Assistência técnica profissional em notebooks Dell em São Paulo.
          </p>

        </div>


        {/* BAIRROS */}

        <div>

          <h4 className="font-bold text-lg mb-4">
            Bairros atendidos
          </h4>

          <ul className="space-y-2 text-gray-300 text-sm">

            <li><Link href="/assistencia-dell/santana" className="hover:text-white">Santana</Link></li>
            <li><Link href="/assistencia-dell/tucuruvi" className="hover:text-white">Tucuruvi</Link></li>
            <li><Link href="/assistencia-dell/casa-verde" className="hover:text-white">Casa Verde</Link></li>
            <li><Link href="/assistencia-dell/mandaqui" className="hover:text-white">Mandaqui</Link></li>
            <li><Link href="/assistencia-dell/parada-inglesa" className="hover:text-white">Parada Inglesa</Link></li>

          </ul>

        </div>


        {/* CONTATO */}

        <div>

          <h4 className="font-bold text-lg mb-4">
            Contato
          </h4>

          <div className="space-y-3 text-gray-300 text-sm">

            <p>
              <a
                href="https://g.page/r/Cd9q--q1SPNuEBM"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline"
              >
                Rua Francisco Ataíde, 241<br/>
                Mandaqui - Zona Norte<br/>
                São Paulo
              </a>
            </p>

            <p>(11) 2359-3951</p>

            <a
              href="https://wa.me/5511946674001"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400"
            >
              WhatsApp
            </a>

          </div>

        </div>

      </div>


      <div className="text-center text-gray-400 mt-10 text-sm">
        © 1998-2026 Dell Resolve • Todos os direitos reservados
      </div>

    </footer>

  )

}
