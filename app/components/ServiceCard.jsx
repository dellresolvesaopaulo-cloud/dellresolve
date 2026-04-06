"use client";

import { motion } from "framer-motion";

export default function ServiceCard({ icon, title, children }) {

  return (

    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-8 border border-gray-200 text-center shadow-sm hover:shadow-lg"
    >

      {/* ÍCONE */}

      <div className="flex justify-center mb-6">

        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm">

          {icon}

        </div>

      </div>

      {/* TÍTULO */}

      <h4 className="text-lg font-semibold text-gray-900">
        {title}
      </h4>

      {/* TEXTO */}

      <p className="mt-3 text-gray-600 text-sm leading-relaxed">
        {children}
      </p>

    </motion.div>

  );

}