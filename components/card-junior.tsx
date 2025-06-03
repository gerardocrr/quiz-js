import Link from "next/link";
import { useRef, useState } from "react";

export default function CardJunior() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hiddenVideo, setHiddenVideo] = useState(true);

  const handleMouseEnter = () => {
    setHiddenVideo(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };
  const handleMouseLeave = () => {
    setHiddenVideo(true);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
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
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-blue-400"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={!hiddenVideo ? "hidden" : ""}>
        <h3 className="text-2xl font-bold text-blue-600 mb-4">Nivel junior</h3>
        <p className="text-gray-600 mb-6">
          Perfecto para principiantes o para un rato divertido sin
          complicaciones. Preguntas sencillas sobre javascript.
        </p>
        <ul className="space-y-2 mb-8">
          <li className="flex items-center gap-2">
            <span>⭐ Sin limite de tiempo</span>
          </li>
          <li className="flex items-center gap-2">
            <span>⭐ Ideal para principintes</span>
          </li>
          <li className="flex items-center gap-2">
            <span>⭐ No necesitas iniciar sesión</span>
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
            <source src="/jesus.mp4" type="video/mp4" />
          </video>
        </div>
        <span>
          ⭐ Jesús siempre esta disponible para ayudar a cualquier junior que lo
          necesite
        </span>
      </div>

      <Link
        href="/junior"
        className="block w-full py-3 text-center rounded-full bg-blue-500 text-white font-bold hover:bg-blue-400 transition-colors"
      >
        Comenzar nivel junior
      </Link>
    </div>
  );
}
