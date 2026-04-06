import { supabase } from "./supabaseClient"

export async function fetchComAuth(url, options = {}) {

  const {
    data: { session }
  } = await supabase.auth.getSession()

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token}`,
      ...(options.headers || {})
    }
  })
}
