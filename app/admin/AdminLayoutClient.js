"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayoutClient({ children, user, role }) {

  const pathname = usePathname()

  function linkClass(path) {
    return pathname.startsWith(path)
      ? "text-blue-400 font-semibold"
      : "text-gray-300 hover:text-white"
  }

  return (
    <div className="min-h-screen flex">

      <aside className="w-64 bg-gray-900 text-white p-6">

        <h2 className="text-xl font-bold mb-8">
          Painel Admininstrativo
        </h2>

        {user && (
          <div className="mb-6 flex items-center gap-3">
            <img
              src={user.user_metadata?.avatar_url}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">
                {user.user_metadata?.name}
              </p>
              <p className="text-xs text-gray-400">
                {user.email}
              </p>
              <p className="text-xs text-blue-400">
                {role}
              </p>
            </div>
          </div>
        )}

        {/* MENU */}
        <nav className="flex flex-col gap-4">

          <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
            Dashboard
          </Link>

          <Link href="/admin/os" className={linkClass("/admin/os")}>
            Ordens de Serviço
          </Link>

          {/* 🔒 só admin */}
          {role === "admin" && (
            <>
              <Link href="/admin/equipamentos" className={linkClass("/admin/equipamentos")}>
                Equipamentos
              </Link>

              <Link href="/admin/clientes" className={linkClass("/admin/clientes")}>
                Clientes
              </Link>

              <Link href="/admin/servicos" className={linkClass("/admin/servicos")}>
                Serviços
              </Link>

              {/* 🔥 NOVO */}
              <Link href="/admin/usuarios" className={linkClass("/admin/usuarios")}>
                Usuários
              </Link>

<Link href="/admin/financeiro" className={linkClass("/admin/financeiro")}>
  Financeiro
</Link>

{/* 🔥 BLOG CMS */}
<Link href="/admin/blog" className={linkClass("/admin/blog")}>
  Blog
</Link>

            </>
          )}

        </nav>

      </aside>

      <main className="flex-1 bg-gray-50">
        {children}
      </main>

    </div>
  )
}
