import Link from "next/link"

export default function Breadcrumb({ items = [] }) {

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dellresolve.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: item.href ? `https://dellresolve.com${item.href}` : undefined
      }))
    ]
  }

  return (

    <div className="max-w-6xl mx-auto px-6 mb-6 text-sm text-gray-500">

      {/* Schema SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <nav className="flex items-center gap-2">

        <Link href="/" className="hover:text-[#1F5F8B]">
          Home
        </Link>

        {items.map((item, index) => (

          <span key={index} className="flex items-center gap-2">

            <span>›</span>

            {item.href ? (

              <Link
                href={item.href}
                className="hover:text-[#1F5F8B]"
              >
                {item.label}
              </Link>

            ) : (

              <span className="text-gray-700">
                {item.label}
              </span>

            )}

          </span>

        ))}

      </nav>

    </div>

  )

}
