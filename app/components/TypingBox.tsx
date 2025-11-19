"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { getRandomText } from "../utils/textGenerator";

export default function TypingBox() {
  const [text, setText] = useState<string>("Loading...");
  const [typed, setTyped] = useState<string>("");
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  // Configurable options
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("medium");
  const [totalTime, setTotalTime] = useState<number>(60); // default medium = 60s

  // Timer
  const [timeLeft, setTimeLeft] = useState<number>(totalTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Results
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [inputVisible, setInputVisible] = useState<boolean>(false);

  // Load random text based on level
  useEffect(() => {
    setText(getRandomText(level));
  }, [level]);

  // Update timer automatically when level changes
  useEffect(() => {
    const defaultTimes = { easy: 30, medium: 60, hard: 90 };
    const newTime = defaultTimes[level];
    setTotalTime(newTime);
    setTimeLeft(newTime);
  }, [level]);

  // Timer countdown
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (!isSubmitted && inputVisible) calculateResults();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  // Start typing on any key press
  useEffect(() => {
    function handleKeyDown() {
      if (!inputVisible) {
        setInputVisible(true);
        setIsRunning(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputVisible]);

  function handleTyping(e: ChangeEvent<HTMLTextAreaElement>) {
    if (timeLeft <= 0 || isSubmitted) return;

    const value = e.target.value;
    setTyped(value);

    // Count correct characters
    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === text[i]) correct++;
    }
    setCorrectChars(correct);

    // Finish test if text completed
    if (value.length >= text.length && !isSubmitted) calculateResults();
  }

  function calculateResults() {
    setIsSubmitted(true);
    setIsRunning(false);

    const spent = totalTime - timeLeft || 1;
    setTimeSpent(spent);

    const calculatedWpm = Math.round(correctChars / 5 / (spent / 60));
    setWpm(calculatedWpm);
  }

  function nextText() {
    setTyped("");
    setCorrectChars(0);
    setWpm(0);
    setTimeSpent(0);
    setIsSubmitted(false);
    setIsRunning(false);
    setInputVisible(false);
    setTimeLeft(totalTime);
    setText(getRandomText(level));
  }

  function retest() {
    setTyped("");
    setCorrectChars(0);
    setWpm(0);
    setTimeSpent(0);
    setIsSubmitted(false);
    setIsRunning(false);
    setTimeLeft(totalTime);
  }

  const accuracy =
    typed.length === 0 ? 0 : Math.round((correctChars / typed.length) * 100);
  const cps = timeSpent > 0 ? (correctChars / timeSpent).toFixed(2) : "0";

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* ===== CONFIG OPTIONS ===== */}
      <div className="mb-4 flex flex-wrap gap-4">
        <div>
          <label className="mr-2 font-semibold">Level:</label>
          <select
            value={level}
            onChange={(e) =>
              setLevel(e.target.value as "easy" | "medium" | "hard")
            }
            disabled={inputVisible}
            className="border p-1 rounded"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* ===== TIMER ===== */}
      <div className="text-2xl font-bold mb-4">Time Left: {timeLeft}s</div>

      {/* ===== TEXT HIGHLIGHTING ===== */}
      <div className="bg-black/40 p-4 rounded-md mb-4 leading-relaxed min-h-[140px]">
        {text.split("").map((char, index) => {
          let colorClass = "";
          if (index < typed.length) {
            colorClass =
              typed[index] === char ? "text-green-400" : "text-red-400";
          } else {
            colorClass = "text-gray-400";
          }
          return (
            <span key={index} className={colorClass}>
              {char}
            </span>
          );
        })}
      </div>

      {/* ===== TYPING INPUT ===== */}
      {inputVisible && (
        <textarea
          value={typed}
          onChange={handleTyping}
          rows={5}
          disabled={isSubmitted || timeLeft <= 0}
          className="w-full bg-black/30 border border-gray-700 p-4 rounded-md focus:outline-none focus:border-blue-500 disabled:opacity-50"
          placeholder={
            isSubmitted || timeLeft <= 0
              ? "Finished! Click Next or Retest."
              : "Start typing here..."
          }
        />
      )}

      {/* ===== RESULTS MODAL / CARD ===== */}
      {isSubmitted && (
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg text-white space-y-4">
          <h2 className="text-2xl font-bold">Results</h2>
          <div>Accuracy: {accuracy}%</div>
          <div>WPM: {wpm}</div>
          <div>Characters per second: {cps}</div>
          <div>Total Time Spent: {timeSpent}s</div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={retest}
              className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700"
            >
              Retest
            </button>
            <button
              onClick={nextText}
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Next / New Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
