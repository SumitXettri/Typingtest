"use client";

import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

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
  timeLeft,
  calculateResults,
}: TypingAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (timeLeft <= 0) return;
      if (!isRunning) setIsRunning(true);

      if (e.key.length === 1 || e.key === "Backspace") {
        setTyped((prev) => {
          const newValue =
            e.key === "Backspace" ? prev.slice(0, -1) : prev + e.key;

          // Count correct chars
          let correct = 0;
          for (let i = 0; i < newValue.length; i++) {
            if (newValue[i] === text[i]) correct++;
          }
          setCorrectChars(correct);

          if (newValue.length >= text.length) calculateResults();

          return newValue;
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isRunning,
    text,
    timeLeft,
    setIsRunning,
    setTyped,
    setCorrectChars,
    calculateResults,
  ]);

  // Auto scroll to current char
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
      className="w-full text-4xl leading-relaxed max-h-64 overflow-hidden"
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
            className="relative"
          >
            {/* Character */}
            <span className={className}>{char}</span>

            {/* Caret added HERE */}
            {isCurrent && (
              <span className="caret absolute -right-1 top-0 h-full w-0.5 bg-yellow-400"></span>
            )}
          </span>
        );
      })}
    </div>
  );
}
