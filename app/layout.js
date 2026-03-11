import "./globals.css"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import siteConfig from "./config/site"

export const metadata = {
  title: "Dell Resolve - Assistência Técnica Dell em São Paulo",
  description:
    "Assistência técnica especializada em notebooks Dell na Zona Norte de São Paulo."
}

export default function RootLayout({ children }) {

  return (

    <html lang="pt-BR">

      <body className="bg-white text-gray-800">

        {/* GOOGLE ANALYTICS */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7LT53FLS35"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7LT53FLS35');
          `}
        </Script>

        {/* HEADER */}

        <header className="border-b bg-white">

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

            <nav className="hidden md:flex space-x-10 text-sm font-medium text-gray-700">

              <Link href="/">Início</Link>
              <Link href="/servicos">Serviços</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contato">Contato</Link>

            </nav>

          </div>

        </header>


        {/* CONTEÚDO DAS PÁGINAS */}

        {children}


        {/* FOOTER */}

        <footer className="bg-[#0f172a] text-white py-16 mt-20">

          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">

            <div>

              <h4 className="font-bold text-lg mb-4">
                {siteConfig.name}
              </h4>

              <p className="text-gray-300">
                Assistência técnica profissional em notebooks Dell em São Paulo.
              </p>

            </div>


            <div>

              <h4 className="font-bold text-lg mb-4">
                Navegação
              </h4>

              <ul className="space-y-2 text-gray-300">

                <li><Link href="/">Início</Link></li>
                <li><Link href="/servicos">Serviços</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contato">Contato</Link></li>

              </ul>

            </div>


            <div>

              <h4 className="font-bold text-lg mb-4">
                Contato
              </h4>

              <div className="space-y-3 text-gray-300">

                <p>
                  {siteConfig.address.street} • {siteConfig.address.city}
                </p>

                <p>
                  {siteConfig.phone}
                </p>

                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  className="text-green-400"
                >
                  WhatsApp
                </a>

              </div>

            </div>

          </div>

          <div className="text-center text-gray-400 mt-10 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}
          </div>

        </footer>

      </body>

    </html>

  )

}