"use client"

import { useEffect, useState } from "react"

export default function GoogleReviews() {

  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {

    fetch("/api/google-reviews")
      .then(res => res.json())
      .then(data => {

        if (data.result) {
          setReviews(data.result.reviews || [])
          setRating(data.result.rating || 0)
          setTotal(data.result.user_ratings_total || 0)
        }

      })

  }, [])

  return (

    <div className="text-center">

      <div className="text-yellow-500 text-xl mb-2">
        {"★".repeat(Math.round(rating))}
      </div>

      <p className="text-gray-600 mb-10">
        {rating} estrelas • {total} avaliações
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        {reviews.slice(0,3).map((r, i) => (

          <div
            key={i}
            className="bg-white rounded-xl shadow p-6 text-left"
          >

            <div className="flex items-center gap-3 mb-3">

              <img
                src={r.profile_photo_url}
                className="w-10 h-10 rounded-full"
              />

              <div>

                <p className="font-semibold">
                  {r.author_name}
                </p>

                <p className="text-yellow-500">
                  {"★".repeat(r.rating)}
                </p>

              </div>

            </div>

            <p className="text-gray-700 text-sm">
              {r.text}
            </p>

          </div>

        ))}

      </div>

    </div>

  )

}
