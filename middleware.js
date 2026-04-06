import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request) {
  let response = NextResponse.next({
    request
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headersToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })

          response = NextResponse.next({
            request
          })

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })

          Object.entries(headersToSet || {}).forEach(([key, value]) => {
            response.headers.set(key, value)
          })
        }
      }
    }
  )

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"]
}
