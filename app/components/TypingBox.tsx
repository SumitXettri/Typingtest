"use client";

import { useEffect, useState } from "react";
import { getRandomText } from "../utils/textGenerator";

export default function TypingBox() {
  const [text, setText] = useState<string>("Loading...");
  const [typed, setTyped] = useState<string>("");
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  const [level, setLevel] = useState<"easy" | "medium" | "hard">("medium");
  const [totalTime, setTotalTime] = useState<number>(60);

  const [timeLeft, setTimeLeft] = useState<number>(totalTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Load random text
  useEffect(() => {
    setText(getRandomText(level));
  }, [level]);

  // Update total time for level
  useEffect(() => {
    const defaultTimes = { easy: 30, medium: 60, hard: 90 };
    const newTime = defaultTimes[level];
    setTotalTime(newTime);
    setTimeLeft(newTime);
  }, [level]);

  // Timer countdown
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (!isSubmitted) calculateResults();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  // Start typing on any key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isRunning && !isSubmitted) setIsRunning(true);

      if (isSubmitted || timeLeft <= 0) return;

      if (e.key.length === 1 || e.key === "Backspace") {
        setTyped((prev) => {
          let newValue = prev;
          if (e.key === "Backspace") {
            newValue = prev.slice(0, -1);
          } else {
            newValue = prev + e.key;
          }

          // Count correct characters
          let correct = 0;
          for (let i = 0; i < newValue.length; i++) {
            if (newValue[i] === text[i]) correct++;
          }
          setCorrectChars(correct);

          // Finish test if all typed
          if (newValue.length >= text.length) calculateResults();

          return newValue;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, isSubmitted, text, timeLeft]);

  function calculateResults() {
    setIsSubmitted(true);
    setIsRunning(false);
    const spent = totalTime - timeLeft || 1;
    setTimeSpent(spent);
    setWpm(Math.round(correctChars / 5 / (spent / 60)));
  }

  function nextText() {
    setTyped("");
    setCorrectChars(0);
    setWpm(0);
    setTimeSpent(0);
    setIsSubmitted(false);
    setIsRunning(false);
    setTimeLeft(totalTime);
    setText(getRandomText(level));
  }

  function startNewTest() {
    setTyped("");
    setCorrectChars(0);
    setWpm(0);
    setTimeSpent(0);
    setIsSubmitted(false); // reset submission
    setIsRunning(false); // allow starting again
    setTimeLeft(totalTime);
    setText(getRandomText(level));
  }

  const accuracy =
    typed.length === 0 ? 0 : Math.round((correctChars / typed.length) * 100);
  const cps = timeSpent > 0 ? (correctChars / timeSpent).toFixed(2) : "0";

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-start p-6">
      {/* Level selector */}
      <div className="mb-6 flex gap-4 items-center">
        <label className="font-semibold">Level:</label>
        <select
          value={level}
          onChange={(e) =>
            setLevel(e.target.value as "easy" | "medium" | "hard")
          }
          disabled={isRunning}
          className="bg-gray-800 border border-gray-600 px-2 py-1 rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Timer and WPM / Accuracy */}
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

      {/* Typing text */}
      <div className="w-full p-6 bg-gray-800 rounded-lg shadow-lg mb-6 min-h-40 text-xl leading-relaxed">
        {text.split("").map((char, index) => {
          let className = "text-gray-400";
          if (index < typed.length) {
            className =
              typed[index] === char ? "text-green-400" : "text-red-500";
          }
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      {/* Results modal */}
      {isSubmitted && (
        <div className="w-full p-6 bg-gray-800 rounded-lg shadow-xl space-y-4 text-center">
          <h2 className="text-2xl font-bold">Results</h2>
          <div>Accuracy: {accuracy}%</div>
          <div>WPM: {wpm}</div>
          <div>Characters per second: {cps}</div>
          <div>Total Time Spent: {timeSpent}s</div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={startNewTest}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
            >
              Retest
            </button>
            <button
              onClick={startNewTest}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Next Text
            </button>
          </div>
        </div>
      )}

      {!isSubmitted && (
        <p className="mt-4 text-gray-400">Start typing to begin the test...</p>
      )}
    </div>
  );
}
