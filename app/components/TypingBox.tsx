"use client";

import React, { useEffect, useState } from "react";
import TypingArea from "./TypingArea";
import { getRandomText } from "../utils/textGenerator";
import { useRouter } from "next/navigation";

type TypingBoxProps = {
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TypingBox({ isRunning, setIsRunning }: TypingBoxProps) {
  const router = useRouter();

  const [level, setLevel] = useState<"normal" | "expert" | "master">("normal");
  const [customTime, setCustomTime] = useState<number>(60); // default 60s

  const [totalTime, setTotalTime] = useState(customTime);
  const [text, setText] = useState<string>("Loading...");
  const [typed, setTyped] = useState<string>("");
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(customTime);

  // Load random text when level changes
  useEffect(() => {
    setText(getRandomText(level));
  }, [level]);

  // Update total time when customTime changes (before typing)
  useEffect(() => {
    if (!isRunning) {
      setTotalTime(customTime);
      setTimeLeft(customTime);
    }
  }, [customTime, isRunning]);

  // Calculate results and navigate to results page
  const calculateResults = () => {
    const spent = totalTime - timeLeft || 1;
    const finalWpm = Math.round(correctChars / 5 / (spent / 60));
    const accuracy =
      typed.length === 0 ? 0 : Math.round((correctChars / typed.length) * 100);
    const cps = (correctChars / spent).toFixed(2);

    // defer navigation to avoid "update during render" errors
    setTimeout(() => {
      router.push(
        `/results?accuracy=${accuracy}&wpm=${finalWpm}&cps=${cps}&timeSpent=${spent}`
      );
    }, 0);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Handle end-of-test side effects outside of state-updater to avoid "update during render" errors
  useEffect(() => {
    if (timeLeft !== 0 || !isRunning) return;

    // stop running immediately
    setIsRunning(false);

    // schedule navigation/results after render to avoid updating Router while rendering TypingBox
    setTimeout(() => {
      calculateResults();
    }, 0);
  }, [timeLeft, isRunning]);

  const accuracy =
    typed.length === 0 ? 0 : Math.round((correctChars / typed.length) * 100);

  return (
    <div className="min-h-100 w-full text-white flex flex-col items-center p-6">
      {/* Level & Time Selection */}
      {!isRunning && (
        <div className="mb-6 flex gap-4 items-center flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Level:</label>
            <button
              onClick={() =>
                setLevel((prev) =>
                  prev === "normal"
                    ? "expert"
                    : prev === "expert"
                    ? "master"
                    : "normal"
                )
              }
              className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Time:</label>
            {[15, 30, 60, 90, 120].map((t) => (
              <button
                key={t}
                onClick={() => setCustomTime(t)}
                className={`px-3 py-1 rounded ${
                  customTime === t
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {t}s
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Timer / WPM / Accuracy */}
      <div className="flex justify-between w-full  mb-6 text-lg font-medium">
        <div>Time Left: {timeLeft}s</div>
        <div>
          WPM:{" "}
          {isRunning
            ? Math.round(correctChars / 5 / ((totalTime - timeLeft || 1) / 60))
            : 0}
        </div>
        <div>Accuracy: {accuracy}%</div>
      </div>

      {/* Typing Area */}
      <TypingArea
        text={text}
        typed={typed}
        setTyped={setTyped}
        setCorrectChars={setCorrectChars}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        isSubmitted={false} // no modal on this page
        timeLeft={timeLeft}
        calculateResults={calculateResults}
      />

      {/* Status */}
      {!isRunning && (
        <div className="mt-4 text-gray-400">
          Click any key or start typing to begin the test...
        </div>
      )}
      {isRunning && timeLeft > 0 && (
        <div className="mt-4 text-gray-400">Test in progress...</div>
      )}
    </div>
  );
}
