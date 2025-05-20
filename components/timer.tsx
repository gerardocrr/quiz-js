"use client";

import { useState, useEffect, useRef } from "react";

interface TimerProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  setModalLose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Timer({
  timeLeft,
  setTimeLeft,
  setModalLose,
}: TimerProps) {
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialTime = 60;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      setModalLose(true);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = initialTime > 0 ? (timeLeft / initialTime) * 100 : 0;

  return (
    <div className="w-full">
      <div className="pt-6">
        <div className={"text-6xl font-bold text-center mb-8 text-red-500"}>
          {formatTime(timeLeft)}
        </div>

        <div className="relative h-2 mb-8 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
