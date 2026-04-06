"use client"

import { usePathname } from "next/navigation"
import Header from "./Header"
import Footer from "./Footer"
import WhatsAppButton from "./WhatsAppButton"

export default function LayoutShell({ children }) {
  const pathname = usePathname()

  const hidePublicLayout =
    pathname === "/admin/login"

  if (hidePublicLayout) {
    return children
  }

  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />

      <WhatsAppButton />
    </>
  )
}
