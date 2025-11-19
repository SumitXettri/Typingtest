"use client";

import { useState, useEffect } from "react";

const sampleText =
  "Practice typing with speed and accuracy to improve your skills.";

export default function TypingTest() {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  // Compare typed characters
  const renderText = () => {
    return sampleText.split("").map((char, idx) => {
      const typedChar = userInput[idx];

      let className = "";
      if (typedChar === undefined) {
        className = "text-gray-400"; // not typed yet
      } else if (typedChar === char) {
        className = "text-green-500"; // correct
      } else {
        className = "text-red-500"; // incorrect
      }

      return (
        <span key={idx} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Typing Speed & Accuracy Test</h1>

      {/* Text to type */}
      <div className="p-4 border rounded bg-gray-100 leading-relaxed">
        {renderText()}
      </div>

      {/* Typing box */}
      <textarea
        className="w-full h-32 p-3 border rounded focus:outline-none"
        value={userInput}
        onChange={handleChange}
        placeholder="Start typing here..."
      />
    </div>
  );
}
