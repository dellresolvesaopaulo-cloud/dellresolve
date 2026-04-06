import "./globals.css"
import LayoutShell from "./components/LayoutShell"

export const metadata = {
  metadataBase: new URL("https://dellresolve.com"),

  title: {
    default: "Assistência Técnica Dell em São Paulo | Dell Resolve",
    template: "%s | Dell Resolve",
  },

  description:
    "Assistência técnica profissional em notebooks Dell em São Paulo. Conserto, upgrade, diagnóstico e suporte completo com peças originais e 6 meses de garantia.",

  openGraph: {
    title: "Dell Resolve",
    description: "Assistência técnica profissional Dell em São Paulo",
    url: "https://dellresolve.com",
    siteName: "Dell Resolve",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
