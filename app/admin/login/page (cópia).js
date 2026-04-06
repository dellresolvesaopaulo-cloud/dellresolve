"use client"

import { createClient } from "@supabase/supabase-js"
import { getBrowserSiteUrl } from "../../../lib/siteUrl"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function LoginPage() {

  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getBrowserSiteUrl("/admin")
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-lg shadow w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Acesso Admin
        </h1>

        <button
          onClick={loginGoogle}
          className="bg-red-500 hover:bg-red-600 transition text-white w-full py-3 rounded font-semibold"
        >
          Entrar com Google
        </button>

      </div>

    </div>
  )
}
