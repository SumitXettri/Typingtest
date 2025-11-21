"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  const accuracy = searchParams.get("accuracy") || "0";
  const wpm = searchParams.get("wpm") || "0";
  const cps = searchParams.get("cps") || "0";
  const timeSpent = searchParams.get("timeSpent") || "0";

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Calculate performance rating
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

  // Mock data for chart (in real app, this would come from tracking during the test)
  const generateChartData = () => {
    const points = 50;
    const data = [];
    for (let i = 0; i < points; i++) {
      const baseWpm = parseInt(wpm);
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
  const maxWpm = Math.max(...chartData.map((d) => d.raw));

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <div
          className={`max-w-7xl mx-auto transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* WPM Card */}
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

              {/* Additional Stats */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <div className="text-slate-500 text-xs uppercase tracking-wider mb-4">
                  Characters
                </div>
                <div className="text-yellow-400 text-3xl font-bold mb-2">
                  {Math.round(parseInt(cps) * parseInt(timeSpent))}/0/3/1
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs text-slate-500 mt-4">
                  <div>Correct</div>
                  <div>Incorrect</div>
                  <div>Extra</div>
                  <div>Missed</div>
                </div>
              </div>

              {/* Consistency */}
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

                {/* Chart */}
                <div className="relative h-96">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 800 400"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Grid lines */}
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

                    {/* Raw WPM line (yellow dashed) */}
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

                    {/* WPM line (yellow solid) */}
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

                    {/* Error markers */}
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

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 flex gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-0.5 bg-yellow-400 opacity-60"
                        style={{ borderTop: "2px dashed" }}
                      ></div>
                      <span className="text-slate-400">raw</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-yellow-400"></div>
                      <span className="text-slate-400">wpm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-slate-400">errors</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons + Time - improved alignment */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-3">
                    <button className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-lg transition-all">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    <button className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-lg transition-all">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>

                    <button className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-lg transition-all">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </button>

                    <button className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-lg transition-all">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>

                    <button className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-lg transition-all">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <button className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-lg transition-all">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Time card */}
                  <div className="mt-3 sm:mt-0 min-w-[160px] bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 flex flex-col items-start">
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

                {/* Bottom Action */}
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
        </div>
      </div>
    </div>
  );
}
