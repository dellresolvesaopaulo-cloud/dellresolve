"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"

export default function GoogleReviews() {

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/google-reviews")
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return null

  return (

    <div>

      {/* NOTA */}
      <div className="flex flex-col items-center mb-10">

        <div className="flex text-yellow-500">

          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={20} fill="currentColor"/>
          ))}

        </div>

        <p className="mt-2 text-gray-700">
          <span className="font-semibold">{data.rating}</span> estrelas • {data.userRatingCount} avaliações
        </p>

      </div>


      {/* REVIEWS */}
      <div className="grid md:grid-cols-3 gap-8">

        {data.reviews?.slice(0,3).map((review:any, i:number) => (

          <div key={i} className="bg-white p-8 rounded-2xl shadow border">

            <div className="flex items-center gap-3 mb-4">

              <img
                src={review.authorAttribution.photoUri}
                alt={review.authorAttribution.displayName}
                className="w-10 h-10 rounded-full"
              />

              <div className="text-left">

                <p className="font-semibold text-sm">
                  {review.authorAttribution.displayName}
                </p>

                <div className="flex text-yellow-500">

                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor"/>
                  ))}

                </div>

              </div>

            </div>

            <p className="text-gray-600 text-sm">
              {review.text.text}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}