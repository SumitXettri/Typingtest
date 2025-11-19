"use client";

import React from "react";

interface ResultsModalProps {
  accuracy: number;
  wpm: number;
  cps: string;
  timeSpent: number;
  startNewTest: () => void;
}

export default function ResultsModal({
  accuracy,
  wpm,
  cps,
  timeSpent,
  startNewTest,
}: ResultsModalProps) {
  return (
    <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-xl space-y-4 text-center mx-auto">
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
  );
}
