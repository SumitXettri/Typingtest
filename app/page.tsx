import TypingBox from "./components/TypingBox";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">Typing Speed Test</h1>

      <div className="max-w-8xl w-full p-6 rounded-xl overflow-hidden">
        <TypingBox />
      </div>
    </main>
  );
}
