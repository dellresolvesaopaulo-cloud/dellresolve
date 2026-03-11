import siteConfig from "../config/site"

export default function WhatsappButton() {

  return (

    <a
      href={`https://wa.me/${siteConfig.whatsapp}`}
      target="_blank"
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-xl"
    >
      WhatsApp: "5511946674001"
    </a>

  )

}
