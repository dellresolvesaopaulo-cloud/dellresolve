import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { getRequestSiteUrl } from "../../../lib/siteUrl"

export const dynamic = "force-dynamic"

function getSafeNextPath(value) {
  if (!value || typeof value !== "string") {
    return "/admin/dashboard"
  }

  return value.startsWith("/") ? value : "/admin/dashboard"
}

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = getSafeNextPath(requestUrl.searchParams.get("next"))

  if (!code) {
    return NextResponse.redirect(getRequestSiteUrl(request, "/admin/login?error=missing_code"))
  }

  let response = NextResponse.redirect(getRequestSiteUrl(request, next))

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headersToSet) {
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

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error("ERRO CALLBACK AUTH:", error)
    return NextResponse.redirect(getRequestSiteUrl(request, "/admin/login?error=auth_callback"))
  }

  return response
}
