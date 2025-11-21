"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import TypingBox from "./components/TypingBox";

export default function Home() {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      {!isRunning && <Navbar />}
      <div className="max-w-8xl w-full p-6 rounded-xl overflow-hidden">
        <TypingBox isRunning={isRunning} setIsRunning={setIsRunning} />
      </div>
    </main>
  );
}
