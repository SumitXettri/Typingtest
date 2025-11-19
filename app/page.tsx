import TypingBox from "./components/TypingBox";
import TypingTest from "./components/TypingTest";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">Typing Speed Test</h1>

      <div className="max-w-3xl w-full bg-gray-800 p-6 rounded-xl shadow-lg">
        <TypingBox />
      </div>
    </main>
  );
}
