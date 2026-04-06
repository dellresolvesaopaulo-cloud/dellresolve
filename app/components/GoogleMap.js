"use client";

export default function GoogleMap() {

  return (

    <section className="py-20 bg-white border-t border-gray-100">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-[#1F5F8B]">
          Estamos na Zona Norte de São Paulo
        </h2>

        <p className="mt-4 text-gray-600">
          Atendimento especializado em notebooks Dell para Santana, Tucuruvi,
          Casa Verde, Mandaqui e região.
        </p>

        <div className="mt-10 rounded-xl overflow-hidden shadow-lg">

          <iframe
            src="https://www.google.com/maps?q=Assist%C3%AAncia+T%C3%A9cnica+Dell+Zona+Norte+-+Dell+Resolve&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

        </div>

      </div>

    </section>

  );

}