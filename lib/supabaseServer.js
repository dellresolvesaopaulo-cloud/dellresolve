import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createSupabaseServer({ allowWriteFailure = true } = {}) {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          if (!allowWriteFailure) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })

            return
          }

          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Em alguns contextos de route handler/read-only isso pode falhar.
            // Para leitura de sessão, tudo bem seguir sem quebrar.
          }
        }
      }
    }
  )
}
