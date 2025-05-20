import Link from "next/link";

interface Props {
  questions: number;
  isVisible: boolean;
}

export default function ModalLose({ questions, isVisible }: Props) {
  return (
    <div
      className={
        !isVisible
          ? "hidden"
          : "absolute flex flex-row h-dvh justify-center items-center w-full backdrop-blur-xs"
      }
    >
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
    </div>
  );
}
