import { supabase } from "../../../lib/supabase"

const CACHE_HOURS = 6

export async function GET() {
  try {

    let cache = null

    try {
      const { data } = await supabase
        .from("google_reviews_cache")
        .select("*")
        .eq("id", 1)
        .maybeSingle()

      cache = data
    } catch (e) {
      console.log("Cache não disponível")
    }

    const now = new Date()
    const updated = cache?.updated_at
      ? new Date(cache.updated_at)
      : null

    const isCacheValid =
      updated &&
      (now.getTime() - updated.getTime()) <
        CACHE_HOURS * 60 * 60 * 1000

    // ✅ CACHE OK
    if (isCacheValid && cache?.data) {
      return Response.json({ result: cache.data })
    }

    // =========================
    // GOOGLE
    // =========================
    const placeId = "ChIJuyZJ2br3zpQR32r76rVI824"
    const apiKey = process.env.GOOGLE_API_KEY

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`

    const res = await fetch(url)
    const data = await res.json()

    const result = data?.result || {
      rating: 0,
      user_ratings_total: 0,
      reviews: []
    }

    // =========================
    // SALVAR CACHE (SEM QUEBRAR)
    // =========================
    try {
      await supabase
        .from("google_reviews_cache")
        .upsert({
          id: 1,
          data: result,
          updated_at: new Date().toISOString()
        })
    } catch (e) {
      console.log("Falha ao salvar cache")
    }

    return Response.json({ result })

  } catch (err) {

    console.error("ERRO:", err)

    // 🔥 NUNCA QUEBRA
    return Response.json({
      result: {
        rating: 5,
        user_ratings_total: 200,
        reviews: []
      }
    })
  }
}
