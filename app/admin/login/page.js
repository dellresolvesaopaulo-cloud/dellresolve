"use client"

import { supabase } from "../../../lib/supabaseClient"
import { getBrowserSiteUrl } from "../../../lib/siteUrl"

export default function LoginPage() {
  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getBrowserSiteUrl("/auth/callback")
      }
    })
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">Acesso Admin</h1>
        <p className="login-subtitle">
          Entre com sua conta Google para acessar o painel
        </p>

        <button onClick={loginGoogle} className="btn-google">
          Entrar com Google
        </button>
      </div>
    </div>
  )
}
