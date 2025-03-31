import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { quotes } from "../data/quotes";

interface GameStats {
  wpm: number;
  accuracy: number;
  time: number;
}

interface CurrentQuote {
  text: string;
  author?: string;
  category: string;
}

const SpeedTyping = () => {
  const [currentQuote, setCurrentQuote] = useState<CurrentQuote>({
    text: "",
    category: "",
  });
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState<GameStats | null>(null);

  // Get random quote
  const getRandomQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  };

  // Initialize game with random quote
  useEffect(() => {
    getRandomQuote();
  }, []);

  // Calculate game statistics
  const calculateStats = useCallback(() => {
    if (!startTime) return null;

    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 60000;
    const words = currentQuote.text.trim().split(/\s+/).length;
    const wpm = Math.round(words / timeInMinutes);

    const correctChars = userInput
      .split("")
      .filter((char, i) => char === currentQuote.text[i]).length;
    const accuracy = Math.round(
      (correctChars / currentQuote.text.length) * 100
    );

    return {
      wpm,
      accuracy,
      time: Math.round(timeInMinutes * 60),
    };
  }, [startTime, currentQuote.text, userInput]);

  // Handle user input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!startTime) {
      setStartTime(Date.now());
    }

    setUserInput(value);

    if (value === currentQuote.text) {
      setIsFinished(true);
      setStats(calculateStats());
    }
  };

  // Reset game
  const resetGame = () => {
    getRandomQuote();
    setUserInput("");
    setStartTime(null);
    setIsFinished(false);
    setStats(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">
            Speed Typing Game
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-500 capitalize">
              Category: {currentQuote.category}
            </span>
            {!startTime && (
              <span className="text-sm text-gray-500">
                Press any key to start typing
              </span>
            )}
          </div>

          <p className="text-lg mb-4 font-mono bg-gray-50 p-4 rounded">
            {currentQuote.text.split("").map((char, index) => {
              const userChar = userInput[index];
              const className = !userChar
                ? "text-gray-400"
                : userChar === char
                ? "text-green-600"
                : "text-red-600";
              return (
                <span key={index} className={className}>
                  {char}
                </span>
              );
            })}
          </p>

          {currentQuote.author && (
            <p className="text-sm text-gray-600 italic mb-4">
              — {currentQuote.author}
            </p>
          )}

          <input
            type="text"
            value={userInput}
            onChange={handleInput}
            disabled={isFinished}
            className="w-full p-2 border rounded font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Start typing..."
          />
        </div>

        {isFinished && stats && (
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-green-800">
              Great job! 🎉
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">{stats.wpm}</p>
                <p className="text-sm text-green-600">WPM</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">
                  {stats.accuracy}%
                </p>
                <p className="text-sm text-green-600">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-700">
                  {stats.time}s
                </p>
                <p className="text-sm text-green-600">Time</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={resetGame}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          {isFinished ? "Try Another Quote" : "Reset"}
        </button>
      </div>
    </div>
  );
};

export default SpeedTyping;
