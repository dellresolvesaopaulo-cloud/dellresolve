"use client"

export default function OSPdfButton({ numero }) {

  function gerarPDF() {

    if (!numero) {
      alert("Erro: número da OS não encontrado")
      return
    }

    window.open(`/api/os/${numero}/pdf`, "_blank")
  }

  return (
    <button
      onClick={gerarPDF}
      className="bg-gray-800 text-white px-4 py-2 rounded mt-6"
    >
      Gerar PDF
    </button>
  )
}
