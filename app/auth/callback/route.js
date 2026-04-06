import { NextResponse } from "next/server"
import { createSupabaseServer } from "../../../lib/supabaseServer"
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

  const supabase = createSupabaseServer({ allowWriteFailure: false })
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error("ERRO CALLBACK AUTH:", error)
    return NextResponse.redirect(getRequestSiteUrl(request, "/admin/login?error=auth_callback"))
  }

  return NextResponse.redirect(getRequestSiteUrl(request, next))
}
