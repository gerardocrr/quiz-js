"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [hoverJunior, setHoverJunior] = useState(false);
  const [hoverMidu, setHoverMidu] = useState(false);

  return (
    <div className="h-dvh w-full flex flex-row overflow-hidden">
      {/* Left Side */}
      <motion.div
        className="relative h-full bg-gradient-to-r from-sky-300 to-blue-400 flex items-center justify-center overflow-hidden"
        animate={{
          width: hoverJunior ? "60%" : hoverMidu ? "40%" : "50%",
        }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setHoverJunior(true)}
        onMouseLeave={() => setHoverJunior(false)}
      >
        <motion.div
          className="z-10 text-center"
          animate={{ scale: hoverJunior ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Junior
          </h1>
          <p className="mt-2 text-white text-xl max-w-md mx-auto">
            Paz, armonía y luz eterna
          </p>
          <Link href={"/junior"}>Junior</Link>
        </motion.div>
      </motion.div>

      {/* Divider 80px 64px*/}
      <div className="w-2 h-full bg-gradient-to-b from-orange-500 via-red-600 to-orange-500 relative z-20">
        <div className="w-[316px] h-[80px] rounded-md absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-orange-500 via-red-600 to-orange-500 flex items-center justify-center">
          <div className="w-[300px] h-[64px] rounded-md bg-black flex items-center justify-center">
            <div className="text-white text-2xl font-bold">
              ¿Eres un junior o crees poder vencer a midudev?
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <motion.div
        className="relative h-full bg-gradient-to-l from-red-800 to-black flex items-center justify-center overflow-hidden"
        animate={{
          width: hoverMidu ? "60%" : hoverJunior ? "40%" : "50%",
        }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setHoverMidu(true)}
        onMouseLeave={() => setHoverMidu(false)}
      >
        <motion.div
          className="z-10 text-center"
          animate={{ scale: hoverMidu ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-red-500 drop-shadow-lg">
            Midudev
          </h1>
          <p className="mt-2 text-orange-300 text-xl max-w-md mx-auto">
            Caos, fuego y tormento eterno
          </p>
          <Link href={"/midu"}>Midudev</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
