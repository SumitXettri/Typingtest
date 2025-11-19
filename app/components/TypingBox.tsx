"use client";

import React, { useState, useEffect, useCallback } from "react";
import TypingArea from "./TypingArea";
import ResultsModal from "./ResultsModal";
import { getRandomText } from "../utils/textGenerator";

export default function TypingBox() {
  const [level, setLevel] = useState<"normal" | "expert" | "master">("normal");
  const [totalTime, setTotalTime] = useState(60);

  const [text, setText] = useState<string>("Loading...");
  const [typed, setTyped] = useState<string>("");
  const [correctChars, setCorrectChars] = useState<number>(0);

  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);

  // Update text when level changes
  useEffect(() => {
    setText(getRandomText(level));
  }, [level]);

  // Update total time when level changes
  useEffect(() => {
    const times = { normal: 30, expert: 60, master: 90 };
    const newTime = times[level];
    setTotalTime(newTime);
    setTimeLeft(newTime);
  }, [level]);

  // Timer countdown
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (!isSubmitted && isRunning) calculateResults();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  // Calculate results
  const calculateResults = useCallback(() => {
    setIsSubmitted(true);
    setIsRunning(false);
    const spent = totalTime - timeLeft || 1;
    setTimeSpent(spent);
    setWpm(Math.round(correctChars / 5 / (spent / 60)));
  }, [totalTime, timeLeft, correctChars]);

  // Reset for new test
  const startNewTest = () => {
    setTyped("");
    setCorrectChars(0);
    setTimeLeft(totalTime);
    setIsSubmitted(false);
    setIsRunning(false);
    setTimeSpent(0);
    setWpm(0);
    setText(getRandomText(level));
  };

  const accuracy =
    typed.length === 0 ? 0 : Math.round((correctChars / typed.length) * 100);
  const cps = timeSpent > 0 ? (correctChars / timeSpent).toFixed(2) : "0";

  return (
    <div className="min-h-100 w-full text-white flex flex-col items-center p-6">
      {/* Level selector */}
      <div className="mb-6 flex gap-4 items-center">
        <label className="font-semibold">English:</label>
        {!isRunning ? (
        <button
          onClick={() => {
            // Cycle levels: easy → medium → hard → easy
            setLevel((prev) => {
              if (prev === "normal") return "expert";
              if (prev === "expert") return "master";
              return "normal";
            });
          }}
          className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
           ) : (
    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded cursor-not-allowed">
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
      </div>

      {/* Timer / WPM / Accuracy */}
      <div className="flex justify-between w-full mb-6 text-lg font-medium">
        <div>Time Left: {timeLeft}s</div>
        <div>
          WPM:{" "}
          {isRunning
            ? Math.round(correctChars / 5 / ((totalTime - timeLeft || 1) / 60))
            : 0}
        </div>
        <div>Accuracy: {accuracy}%</div>
      </div>

      {/* Typing area */}
      <TypingArea
        text={text}
        typed={typed}
        setTyped={setTyped}
        setCorrectChars={setCorrectChars}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        isSubmitted={isSubmitted}
        timeLeft={timeLeft}
        calculateResults={calculateResults}
      />

      {/* Results modal */}
      {isSubmitted && (
        <ResultsModal
          accuracy={accuracy}
          wpm={wpm}
          cps={cps}
          timeSpent={timeSpent}
          startNewTest={startNewTest}
        />
      )}

      {!isSubmitted && (
        <p className="mt-4 text-gray-400">Start typing to begin the test...</p>
      )}
    </div>
  );
}
