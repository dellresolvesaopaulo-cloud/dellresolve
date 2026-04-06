const DEFAULT_LOCAL_URL = "http://localhost:3000"

function normalizeBaseUrl(value) {
  if (!value) return DEFAULT_LOCAL_URL
  return value.endsWith("/") ? value.slice(0, -1) : value
}

export function getBrowserSiteUrl(path = "") {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_LOCAL_URL

  if (!path) {
    return normalizeBaseUrl(baseUrl)
  }

  return new URL(path, normalizeBaseUrl(baseUrl)).toString()
}

export function getRequestSiteUrl(request, path = "") {
  const forwardedHost = request.headers.get("x-forwarded-host")
  const host = forwardedHost || request.headers.get("host")
  const proto = request.headers.get("x-forwarded-proto")

  const baseUrl = host
    ? `${proto || (host.includes("localhost") ? "http" : "https")}://${host}`
    : process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_LOCAL_URL

  if (!path) {
    return normalizeBaseUrl(baseUrl)
  }

  return new URL(path, normalizeBaseUrl(baseUrl)).toString()
}

export function getHeadersSiteUrl(headersList, path = "") {
  const forwardedHost = headersList.get("x-forwarded-host")
  const host = forwardedHost || headersList.get("host")
  const proto = headersList.get("x-forwarded-proto")

  const baseUrl = host
    ? `${proto || (host.includes("localhost") ? "http" : "https")}://${host}`
    : process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_LOCAL_URL

  if (!path) {
    return normalizeBaseUrl(baseUrl)
  }

  return new URL(path, normalizeBaseUrl(baseUrl)).toString()
}
