import Link from "next/link";

export default function CardJunior() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-green-400">
      <h3 className="text-2xl font-bold text-green-600 mb-4">Nivel junior</h3>
      <p className="text-gray-600 mb-6">
        Perfecto para principiantes o para un rato divertido sin complicaciones.
        Preguntas sencillas sobre javascript.
      </p>
      <ul className="space-y-2 mb-8">
        <li className="flex items-center gap-2">
          <span>⭐ Tiempo extendido para responder</span>
        </li>
        <li className="flex items-center gap-2">
          <span>⭐ Pistas disponibles</span>
        </li>
        <li className="flex items-center gap-2">
          <span>⭐ Ideal para toda la familia</span>
        </li>
      </ul>
      <Link
        href="/junior"
        className="block w-full py-3 text-center rounded-full bg-green-500 text-white font-bold hover:bg-green-400 transition-colors"
      >
        Comenzar Nivel Fácil
      </Link>
    </div>
  );
}
