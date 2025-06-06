"use client";

import Link from "next/link";
import Background from "@/components/background";
import ModalLose from "@/components/modal-lose";
import ModalWin from "@/components/modal-win";
import Timer from "@/components/timer";
import { UserButton, useUser, SignedIn } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { Questions, Answers } from "@/lib/types";

export default function Senior() {
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [answers, setAnswers] = useState<Answers[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalLose, setModalLose] = useState(false);
  const [modalWin, setModalWin] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const videoRef = useRef<HTMLVideoElement>(null);
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const { user } = useUser();

  const handleClickAnswer = async (answer: Answers) => {
    if (answer.is_correct === "true" && currentIndex < questions.length - 1) {
      correctAudioRef.current?.play();
      setCurrentIndex(currentIndex + 1);
    } else if (answer.is_correct === "false") {
      const randomAudio = new Audio("/sounds/incorrect.mp3");
      incorrectAudioRef.current = randomAudio;
      incorrectAudioRef.current?.play();
      setShowResult(true);
      await saveUserData(
        user?.id ?? "",
        currentIndex,
        user?.imageUrl ?? "",
        user?.fullName ?? ""
      );
      setTimeout(() => {
        setModalLose(true);
      }, 1000);
    } else {
      correctAudioRef.current?.play();
      await saveUserData(
        user?.id ?? "",
        10,
        user?.imageUrl ?? "",
        user?.fullName ?? ""
      );
      setTimeout(() => {
        setModalWin(true);
      }, 1000);
    }
  };

  useEffect(() => {
    correctAudioRef.current = new Audio("/sounds/correct.mp3");
    const bgAudio = new Audio("/sounds/epic-music.mp3");
    backgroundAudioRef.current = bgAudio;
    bgAudio.volume = 0.1;
    bgAudio.play();

    const fetchData = async () => {
      const res = await fetch("/api/questions?level=midu");
      const questionsData = await res.json();
      setQuestions(questionsData);
      if (questionsData.length > 0) {
        fetchAnswers(questionsData[0].id);
      }
    };
    fetchData();

    return () => {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (questions.length > 0 && questions[currentIndex]) {
      fetchAnswers(questions[currentIndex].id);
    }
  }, [currentIndex, questions]);

  const currentQuestion = questions[currentIndex];

  const fetchAnswers = async (questionId: string) => {
    const res = await fetch(`/api/answers?id=${questionId}`);
    const answersData = await res.json();
    setAnswers(answersData);
  };

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const saveUserData = async (
    user_id: string,
    questions: number,
    image_url: string,
    name: string
  ) => {
    const time = 60 - timeLeft;
    const points = questions * 1000 + (60 - time) * 10;

    if (currentIndex > 0) {
      await fetch("/api/ranking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          questions,
          time,
          image_url,
          name,
          points,
        }),
      });
    }
  };

  return (
    <div className="relative flex flex-col h-dvh text-black">
      <ModalLose
        level="senior"
        questions={currentIndex}
        isVisible={modalLose}
      />
      <ModalWin level="senior" isVisible={modalWin} />
      <Background background={"senior"} />
      <header className="container mx-auto flex justify-between p-4">
        <Link href="/">
          <h1 className="font-bold">🎮🕹️ Quiz Js</h1>
        </Link>
        <div className="flex items-center gap-10">
          <SignedIn>
            <Link href="/senior/ranking" className="hover:underline">
              Ranking 🏆
            </Link>
            <UserButton showName />
          </SignedIn>
          <a href="https://github.com/gerardocrr/quiz-js" target="_blank">
            <svg
              viewBox="0 0 256 250"
              width="30"
              height="30"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
            </svg>
          </a>
        </div>
      </header>

      <main className="flex-grow container mx-auto mt-5">
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 bg-gray-100 rounded-md flex items-center justify-center p-4 md:p-8">
              <div className="relative w-full h-full max-h-[600px] rounded-xl overflow-hidden">
                <video
                  className="rounded-md"
                  ref={videoRef}
                  onEnded={handleEnded}
                  muted
                  autoPlay
                >
                  <source src={"/demon.mp4"} type="video/mp4" />
                </video>
                <Timer
                  timeLeft={timeLeft}
                  setTimeLeft={setTimeLeft}
                  setModalLose={setModalLose}
                  currentIndex={currentIndex}
                  user={
                    user
                      ? {
                          id: user.id,
                          fullName: user.fullName ?? "",
                          imageUrl: user.imageUrl,
                        }
                      : undefined
                  }
                />
              </div>
            </div>

            <div className="w-full md:w-3/4 p-6 md:p-12 flex flex-col">
              <div className="flex-1">
                {currentQuestion && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-700">
                      {String(currentQuestion.question)}
                    </h2>
                    <div className="space-y-4 mt-8">
                      {answers.map((row) => (
                        <button
                          key={row.id}
                          onClick={() => handleClickAnswer(row)}
                          disabled={showResult}
                          className="w-full text-left p-4 rounded-lg border-2 transition-all hover:shadow-md border-gray-300 hover:border-rose-500 hover:bg-rose-100 bg-white"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-lg">{row.answer}</span>
                            {showResult && (
                              <>
                                {row.is_correct === "true" ? (
                                  <span>✅</span>
                                ) : (
                                  <span>❌</span>
                                )}
                              </>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center p-4">
        <p>
          💻 Developed by{" "}
          <strong>
            <a href="https://github.com/gerardocrr" target="_blank">
              Gerardo Cruz
            </a>
          </strong>
        </p>
      </footer>
    </div>
  );
}
