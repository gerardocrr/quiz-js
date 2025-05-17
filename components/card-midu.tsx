import Link from "next/link";

export default function CardMidu() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-orange-400">
      <h3 className="text-2xl font-bold text-orange-600 mb-4">
        Preguntas Difíciles
      </h3>
      <p className="text-gray-600 mb-6">
        Para expertos y amantes de los desafíos. Preguntas complejas que pondrán
        a prueba tus conocimientos avanzados.
      </p>
      <ul className="space-y-2 mb-8">
        <li className="flex items-center gap-2">
          <span>⭐ Tiempo limitado para responder</span>
        </li>
        <li className="flex items-center gap-2">
          <span>⭐ Sin pistas disponibles</span>
        </li>
        <li className="flex items-center gap-2">
          <span>⭐ Puntuación multiplicada x3</span>
        </li>
      </ul>
      <Link
        href="/midu"
        className="block w-full py-3 text-center rounded-full bg-orange-500 text-white font-bold hover:bg-orange-400 transition-colors"
      >
        Aceptar el Desafío
      </Link>
    </div>
  );
}
