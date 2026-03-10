export async function GET() {

  const placeId = "ChIJuyZJ2br3zpQR32r76rVI824"
  const apiKey = process.env.GOOGLE_API_KEY

  const url = `https://places.googleapis.com/v1/places/${placeId}`

  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey || "",
      "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews"
    },
    next: { revalidate: 3600 }
  })

  const data = await res.json()

  return new Response(
    JSON.stringify(data),
    {
      headers: { "Content-Type": "application/json" }
    }
  )
}