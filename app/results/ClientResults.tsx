"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function ClientResults() {
  const params = useSearchParams();
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  const accuracy = params?.get("accuracy") || "0";
  const wpm = params?.get("wpm") || "0";
  const cps = params?.get("cps") || "0";
  const timeSpent = params?.get("timeSpent") || "0";

  useEffect(() => {
    setAnimate(true);
  }, []);

  const getPerformanceRating = () => {
    const wpmNum = parseInt(wpm);
    const accuracyNum = parseInt(accuracy);

    if (wpmNum >= 80 && accuracyNum >= 95)
      return {
        title: "Exceptional!",
        color: "from-yellow-400 to-orange-500",
        emoji: "🏆",
      };
    if (wpmNum >= 60 && accuracyNum >= 90)
      return {
        title: "Excellent!",
        color: "from-green-400 to-emerald-500",
        emoji: "🌟",
      };
    if (wpmNum >= 40 && accuracyNum >= 85)
      return {
        title: "Great Job!",
        color: "from-blue-400 to-cyan-500",
        emoji: "✨",
      };
    if (wpmNum >= 20 && accuracyNum >= 75)
      return {
        title: "Good Effort!",
        color: "from-purple-400 to-pink-500",
        emoji: "👍",
      };
    return {
      title: "Keep Practicing!",
      color: "from-slate-400 to-slate-500",
      emoji: "💪",
    };
  };

  const performance = getPerformanceRating();

  const generateChartData = () => {
    const points = 50;
    const data: { x: number; wpm: number; raw: number; errors: number }[] = [];
    for (let i = 0; i < points; i++) {
      const baseWpm = parseInt(wpm) || 0;
      const variance = Math.random() * 20 - 10;
      data.push({
        x: i,
        wpm: Math.max(0, baseWpm + variance),
        raw: Math.max(0, baseWpm + variance + 5),
        errors: Math.random() < 0.1 ? Math.floor(Math.random() * 3) : 0,
      });
    }
    return data;
  };

  const chartData = generateChartData();
  const maxWpm = Math.max(...chartData.map((d) => d.raw), 1);

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <div className="pt-24 pb-8 px-4">
        <div
          className={`max-w-7xl mx-auto transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* ...rest of your JSX (unchanged) ... */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Stats */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
                <div className="text-slate-500 text-sm uppercase tracking-wider mb-2">
                  WPM
                </div>
                <div className="text-7xl font-bold text-yellow-400 mb-4">
                  {wpm}
                </div>
                <div className="text-slate-500 text-sm uppercase tracking-wider mb-2">
                  Accuracy
                </div>
                <div className="text-5xl font-bold text-yellow-400">
                  {accuracy}%
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <div className="text-slate-500 text-xs uppercase tracking-wider mb-4">
                  Characters
                </div>
                <div className="text-yellow-400 text-3xl font-bold mb-2">
                  {Math.round(
                    parseInt(cps || "0") * parseInt(timeSpent || "0")
                  )}
                  /0/3/1
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs text-slate-500 mt-4">
                  <div>Correct</div>
                  <div>Incorrect</div>
                  <div>Extra</div>
                  <div>Missed</div>
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-2">
                      Consistency
                    </div>
                    <div className="text-yellow-400 text-3xl font-bold">
                      {Math.max(0, 100 - Math.floor(Math.random() * 30))}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Chart */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 h-full">
                <div className="text-slate-500 text-xs uppercase tracking-wider mb-6">
                  Performance Over Time
                </div>

                <div className="relative h-96">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 800 400"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {[0, 40, 80, 120, 160].map((y, i) => (
                      <g key={i}>
                        <line
                          x1="0"
                          y1={400 - (y / maxWpm) * 380}
                          x2="800"
                          y2={400 - (y / maxWpm) * 380}
                          stroke="#334155"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                        <text
                          x="-5"
                          y={400 - (y / maxWpm) * 380}
                          fill="#64748b"
                          fontSize="12"
                          textAnchor="end"
                          dominantBaseline="middle"
                        >
                          {y}
                        </text>
                      </g>
                    ))}

                    <polyline
                      points={chartData
                        .map(
                          (d, i) =>
                            `${(i / chartData.length) * 800},${
                              400 - (d.raw / maxWpm) * 380
                            }`
                        )
                        .join(" ")}
                      fill="none"
                      stroke="#facc15"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      opacity="0.6"
                    />

                    <polyline
                      points={chartData
                        .map(
                          (d, i) =>
                            `${(i / chartData.length) * 800},${
                              400 - (d.wpm / maxWpm) * 380
                            }`
                        )
                        .join(" ")}
                      fill="none"
                      stroke="#facc15"
                      strokeWidth="3"
                    />

                    {chartData.map((d, i) =>
                      d.errors > 0 ? (
                        <circle
                          key={i}
                          cx={(i / chartData.length) * 800}
                          cy={400 - (d.wpm / maxWpm) * 380}
                          r="4"
                          fill="#ef4444"
                        />
                      ) : null
                    )}
                  </svg>

                  <div className="absolute bottom-4 right-4 flex gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-0.5 bg-yellow-400 opacity-60"
                        style={{ borderTop: "2px dashed" }}
                      />
                      <span className="text-slate-400">raw</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-yellow-400" />
                      <span className="text-slate-400">wpm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-slate-400">errors</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-3">
                    {/* action buttons (unchanged) */}
                  </div>

                  <div className="mt-3 sm:mt-0 min-w-160px bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 flex flex-col items-start">
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-2">
                      Time
                    </div>
                    <div className="text-yellow-400 text-3xl font-bold">
                      {timeSpent}s
                    </div>
                    <div className="text-slate-600 text-xs mt-2">
                      00:00:18 session
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => router.push("/")}
                    className="text-slate-500 hover:text-yellow-400 text-sm transition-colors"
                  >
                    Sign in to save your result
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* ...rest of your JSX ... */}
        </div>
      </div>
    </div>
  );
}
