import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

export default function CardMidu() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hiddenVideo, setHiddenVideo] = useState(true);

  useEffect(() => {
    const audio = new Audio("/sounds/epic-music.mp3");
    audio.loop = false;
    audioRef.current = audio;

    const handleEnded = () => {
      if (!hiddenVideo) {
        audio.currentTime = 0;
        audio.play().catch((e) => console.error("Error en loop:", e));
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, []);

  const handleMouseEnter = () => {
    setHiddenVideo(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };
  const handleMouseLeave = () => {
    setHiddenVideo(true);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  const handleEnded = () => {
    if (!hiddenVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-red-400"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={!hiddenVideo ? "hidden" : ""}>
        <h3 className="text-2xl font-bold text-red-600 mb-4">Nivel midudev</h3>
        <p className="text-gray-600 mb-6">
          Para expertos y amantes de los desafíos. Preguntas complejas que
          pondrán a prueba tus conocimientos avanzados.
        </p>
        <ul className="space-y-2 mb-8">
          <li className="flex items-center gap-2">
            <span>⭐ Tiempo limitado para responder</span>
          </li>
          <li className="flex items-center gap-2">
            <span>⭐ Preguntas complejas</span>
          </li>
          <li className="flex items-center gap-2">
            <span>⭐ Clasificación disponible</span>
          </li>
        </ul>
      </div>
      <div className={`${hiddenVideo ? "hidden" : ""} mb-5`}>
        <div className="flex justify-center mb-5">
          <video
            className="rounded-md"
            width={"50%"}
            ref={videoRef}
            onEnded={handleEnded}
            muted
          >
            <source src="/demon.mp4" type="video/mp4" />
          </video>
        </div>
        <span>
          ⭐ Midu se ha vuelto un demonio y ha escrito preguntas muy dificiles,
          podras con ellas?
        </span>
      </div>

      <SignedIn>
        <Link
          href="/midu"
          className="block w-full py-3 text-center rounded-full bg-red-500 text-white font-bold hover:bg-red-400 transition-colors"
        >
          Comenzar
        </Link>
      </SignedIn>
      <SignedOut>
        <Link
          href="/midu"
          className="block w-full py-3 text-center rounded-full bg-red-500 text-white font-bold hover:bg-red-400 transition-colors"
        >
          Iniciar sesión para comenzar
        </Link>
      </SignedOut>
    </div>
  );
}
