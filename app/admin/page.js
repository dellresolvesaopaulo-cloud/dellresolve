export default function Admin(){

return(

<div className="max-w-5xl mx-auto py-20 px-6">

<h1 className="text-3xl font-bold mb-10">
Painel Dell Resolve
</h1>

<div className="grid md:grid-cols-3 gap-6">

<a
href="/admin/os"
className="border rounded-xl p-6 hover:shadow-lg"
>
<h2 className="text-xl font-semibold mb-2">
Ordens de Serviço
</h2>

<p className="text-gray-600">
Gerenciar OS abertas, concluídas ou canceladas
</p>
</a>

<a
href="/admin/clientes"
className="border rounded-xl p-6 hover:shadow-lg"
>
<h2 className="text-xl font-semibold mb-2">
Clientes
</h2>

<p className="text-gray-600">
Cadastro de clientes
</p>
</a>

<a
href="/admin/equipamentos"
className="border rounded-xl p-6 hover:shadow-lg"
>
<h2 className="text-xl font-semibold mb-2">
Equipamentos
</h2>

<p className="text-gray-600">
Cadastro de notebooks Dell
</p>
</a>

</div>

</div>

)

}