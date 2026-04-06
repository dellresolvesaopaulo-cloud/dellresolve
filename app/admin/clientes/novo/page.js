import ClienteForm from "../../../components/ClienteForm"

export default function NovoCliente(){

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">

      <h1 className="text-3xl font-bold mb-8">
        Novo Cliente
      </h1>

      <ClienteForm />

    </div>
  )

}
