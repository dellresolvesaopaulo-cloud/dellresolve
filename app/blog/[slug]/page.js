export default function Post({ params }) {

  const slug = params?.slug || ""

  const title = slug
    .split("-")
    .join(" ")

  return (

    <main className="min-h-screen bg-white py-20">

      <div className="max-w-3xl mx-auto px-6">

        <h1 className="text-3xl font-bold text-[#1F5F8B]">
          {title}
        </h1>

        <p className="mt-6 text-gray-700">

          Este artigo explicará em detalhes o problema e como resolver em notebooks Dell.

        </p>

      </div>

    </main>

  )

}