import Link from "next/link";

interface Props {
  level: string;
  questions: number;
  isVisible: boolean;
}

export default function ModalLose({ level, questions, isVisible }: Props) {
  return (
    <div
      className={
        !isVisible
          ? "hidden"
          : "absolute flex flex-row h-dvh justify-center items-center w-full backdrop-blur-xs"
      }
    >
      {level === "junior" ? (
        <div className="w-1/4 h-1/4 bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-red-400">
          <h1 className="text-xl text-center font-bold mb-5">
            ¡Has sido derrotado por JavaScript!
          </h1>
          <p className="text-center mb-10">
            Has respondido correctamente a {questions} de 10 preguntas.
          </p>
          <Link
            href="/"
            className="block w-full py-3 text-center rounded-full bg-red-500 text-white font-bold hover:bg-red-400 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      ) : (
        <div className="w-1/4 h-1/4 bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-red-400">
          <h1 className="text-xl text-center font-bold mb-5">
            console.error(&quot;Jugador eliminado&quot;);
          </h1>
          <p className="text-center mb-10">
            Has respondido {questions} de 10. Más que suficiente para hacer un
            console.log, pero no para derrotar a midudev.
          </p>
          <Link
            href="/"
            className="block w-full py-3 text-center rounded-full bg-red-500 text-white font-bold hover:bg-red-400 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      )}
    </div>
  );
}
