"use client"

import { MessageCircle } from "lucide-react"
import siteConfig from "../config/site"

export default function WhatsAppButton(){

return(

<a
href={`https://wa.me/${siteConfig.whatsapp}`}
target="_blank"
rel="noopener noreferrer"
className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg"
>

<MessageCircle size={26}/>

</a>

)

}