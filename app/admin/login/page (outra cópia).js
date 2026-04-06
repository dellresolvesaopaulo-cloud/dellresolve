"use client"

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function LoginPage() {
  async function loginGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/admin`
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
