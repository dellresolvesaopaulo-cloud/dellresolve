"use client"

import { supabase } from "../../lib/supabaseClient"
import { getBrowserSiteUrl } from "../../lib/siteUrl"

export default function Login() {

  async function login(provider) {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getBrowserSiteUrl("/auth/callback")
      }
    })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">

        <h1 className="text-lg font-semibold mb-4 text-center">
          Acesso Admin
        </h1>

        <div className="flex flex-col gap-3">

          <button onClick={() => login("google")} className="border p-2 rounded">
            Entrar com Google
          </button>

        </div>

      </div>
    </div>
  )
}
