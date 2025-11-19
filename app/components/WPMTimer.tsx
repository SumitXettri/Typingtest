"use client";

interface WpmTimerProps {
  timeLeft: number;
  wpm: number;
  accuracy: number;
}

export default function WpmTimer({ timeLeft, wpm, accuracy }: WpmTimerProps) {
  return (
    <div className="flex justify-between w-full mb-6 text-lg font-medium">
      <div>Time Left: {timeLeft}s</div>
      <div>WPM: {wpm}</div>
      <div>Accuracy: {accuracy}%</div>
    </div>
  );
}
