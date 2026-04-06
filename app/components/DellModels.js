"use client";

import { Laptop } from "lucide-react";

export default function DellModels() {

  const models = [
    "Inspiron",
    "XPS",
    "Latitude",
    "Alienware"
  ];

  return (

    <section className="py-20 bg-white border-b border-gray-100">

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* TÍTULO */}

        <h2 className="text-3xl md:text-4xl font-bold text-[#1F5F8B]">
          Atendemos toda a linha Dell
        </h2>

        {/* SUBTÍTULO */}

        <p className="mt-4 text-gray-600">
          Reparo, upgrade e manutenção profissional para notebooks Dell.
        </p>

        {/* PROVA SOCIAL */}

        <p className="mt-3 text-sm text-gray-500">
          + de <span className="font-semibold text-[#1F5F8B]">2000 notebooks Dell reparados</span>
        </p>


        {/* MODELOS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-14">

          {models.map((model) => (

            <div
              key={model}
              className="flex flex-col items-center group"
            >

              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 text-[#1F5F8B] transition duration-300 group-hover:scale-110 shadow-sm">

                <Laptop size={28}/>

              </div>

              <span className="mt-4 text-gray-700 font-medium">
                {model}
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}