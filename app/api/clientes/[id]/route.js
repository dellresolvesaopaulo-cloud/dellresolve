import { supabase } from "../../../../lib/supabase"
import { requireApiRole } from "../../../../lib/apiAuth"

export const dynamic = "force-dynamic"

// =========================
// UPDATE CLIENTE
// =========================
export async function PUT(req, { params }) {

  try {
    const { errorResponse } = await requireApiRole(["admin", "tecnico"])

    if (errorResponse) {
      return errorResponse
    }

    const { id } = await params
    const body = await req.json()

    const {
      nome,
      cpf,
      telefone,
      email,
      endereco,
      cidade,
      estado,
      cep // 🔥 AQUI
    } = body

    const { data, error } = await supabase
      .from("clientes")
      .update({
        nome,
        cpf_cnpj: cpf,
        telefone,
        email,
        endereco,
        cidade,
        estado,
        cep // 🔥 AQUI (ESSENCIAL)
      })
      .eq("id", id)
      .select()

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return Response.json(data[0])

  } catch (err) {
    return Response.json(
      { error: "Erro ao atualizar cliente" },
      { status: 500 }
    )
  }
}


// =========================
// DELETE CLIENTE
// =========================
export async function DELETE(req, { params }) {
  const { errorResponse } = await requireApiRole(["admin", "tecnico"])

  if (errorResponse) {
    return errorResponse
  }

  const { id } = await params

  const { data: equipamentos } = await supabase
    .from("equipamentos")
    .select("id")
    .eq("cliente_id", id)

  if (equipamentos && equipamentos.length > 0) {
    return Response.json({
      error: "Cliente possui equipamentos cadastrados"
    }, { status: 400 })
  }

  const { error } = await supabase
    .from("clientes")
    .delete()
    .eq("id", id)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ success: true })
}
