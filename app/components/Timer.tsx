"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  duration?: number; // default 60s
  onTimeUp?: () => void;
}

export default function Timer({ duration = 60, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    if (timeLeft === 0 && onTimeUp) {
      onTimeUp();
      setIsRunning(false);
    }

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, onTimeUp]);

  function start() {
    setIsRunning(true);
  }

  function reset() {
    setIsRunning(false);
    setTimeLeft(duration);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold mb-3">{timeLeft}s</div>

      <div className="flex gap-3">
        <button
          onClick={start}
          className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700"
        >
          Start
        </button>

        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
