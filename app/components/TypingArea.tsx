"use client";

import React, { Dispatch, SetStateAction, useRef, useEffect } from "react";

interface TypingAreaProps {
  text: string;
  typed: string;
  setTyped: Dispatch<SetStateAction<string>>;
  setCorrectChars: Dispatch<SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  isSubmitted: boolean;
  timeLeft: number;
  calculateResults: () => void;
}

export default function TypingArea({
  text,
  typed,
  setTyped,
  setCorrectChars,
  isRunning,
  setIsRunning,
  isSubmitted,
  timeLeft,
  calculateResults,
}: TypingAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);

  // Keyboard typing listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isSubmitted || timeLeft <= 0) return;

      if (!isRunning) setIsRunning(true);

      if (e.key.length === 1 || e.key === "Backspace") {
        setTyped((prev) => {
          const newValue =
            e.key === "Backspace" ? prev.slice(0, -1) : prev + e.key;

          // Count correct characters
          let correct = 0;
          for (let i = 0; i < newValue.length; i++) {
            if (newValue[i] === text[i]) correct++;
          }
          setCorrectChars(correct);

          // Finish test
          if (newValue.length >= text.length) calculateResults();

          return newValue;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isRunning,
    isSubmitted,
    text,
    timeLeft,
    setIsRunning,
    setTyped,
    setCorrectChars,
    calculateResults,
  ]);

  // Auto-scroll to current character
  useEffect(() => {
    if (currentCharRef.current && containerRef.current) {
      const charOffset = currentCharRef.current.offsetTop;
      const containerHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: charOffset - containerHeight / 2,
        behavior: "smooth",
      });
    }
  }, [typed]);

  return (
    <div
      ref={containerRef}
      className="w-full mb-6 text-4xl leading-relaxed max-h-64 overflow-y-auto"
    >
      {text.split("").map((char, index) => {
        const isCurrent = index === typed.length;
        let className = "text-gray-400";
        if (index < typed.length) {
          className =
            typed[index] === char ? "text-yellow-400" : "text-red-500";
        }
        return (
          <span
            key={index}
            ref={isCurrent ? currentCharRef : null}
            className={className}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
