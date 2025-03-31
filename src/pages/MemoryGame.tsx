import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import "../styles/memory-game.css";

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🦁",
  "🐯",
  "🐨",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🦉",
];

const TOTAL_PAIRS = 8; // Constant for total number of pairs

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [_gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize game
  const initializeGame = () => {
    // Get 8 random emojis for pairs
    const shuffledEmojis = [...emojis]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    // Create pairs
    const pairs = [...shuffledEmojis, ...shuffledEmojis];
    const shuffled = pairs
      .map((emoji) => ({ emoji, sortKey: Math.random() }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map(({ emoji }, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffled);
    setFlippedIndexes([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsWon(false);
    setGameStarted(false);
    setStartTime(null);
    setEndTime(null);
    setIsChecking(false);
    setShowModal(false);
  };

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  // Check for win condition
  useEffect(() => {
    if (cards.length > 0 && matchedPairs === TOTAL_PAIRS) {
      setIsWon(true);
      setEndTime(Date.now());
      setShowModal(true);
    }
  }, [matchedPairs, cards.length]);

  // Handle card click
  const handleCardClick = (index: number) => {
    if (
      isChecking ||
      flippedIndexes.length === 2 ||
      flippedIndexes.includes(index) ||
      cards[index].isMatched
    ) {
      return;
    }

    if (!startTime) {
      setStartTime(Date.now());
    }

    const newFlippedIndexes = [...flippedIndexes, index];
    setFlippedIndexes(newFlippedIndexes);

    setCards((currentCards) => {
      const newCards = [...currentCards];
      newCards[index] = { ...newCards[index], isFlipped: true };
      return newCards;
    });

    if (newFlippedIndexes.length === 2) {
      setIsChecking(true);
      setMoves((m) => m + 1);

      const [firstIndex, secondIndex] = newFlippedIndexes;
      const isMatch = cards[firstIndex].emoji === cards[secondIndex].emoji;

      setTimeout(() => {
        if (isMatch) {
          setCards((currentCards) => {
            const newCards = [...currentCards];
            newCards[firstIndex] = { ...newCards[firstIndex], isMatched: true };
            newCards[secondIndex] = {
              ...newCards[secondIndex],
              isMatched: true,
            };
            return newCards;
          });
          setMatchedPairs((current) => current + 1);
        } else {
          setCards((currentCards) => {
            const newCards = [...currentCards];
            newCards[firstIndex] = {
              ...newCards[firstIndex],
              isFlipped: false,
            };
            newCards[secondIndex] = {
              ...newCards[secondIndex],
              isFlipped: false,
            };
            return newCards;
          });
        }
        setFlippedIndexes([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  const getGameTime = () => {
    if (!startTime || !endTime) return 0;
    return Math.round((endTime - startTime) / 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 relative">
      {isWon && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Memory Game</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 text-lg font-semibold text-gray-700">
              <span>Moves: {moves}</span>
              <span>
                Matches: {matchedPairs}/{TOTAL_PAIRS}
              </span>
            </div>
            <button
              onClick={initializeGame}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              New Game
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                disabled={
                  card.isMatched || isChecking || flippedIndexes.length === 2
                }
                className={`aspect-square text-3xl sm:text-4xl p-2 rounded-lg transition-all duration-300 
                  ${
                    card.isFlipped || card.isMatched
                      ? "bg-white"
                      : "bg-blue-600"
                  }
                  ${
                    !card.isMatched && !card.isFlipped
                      ? "hover:bg-blue-700 cursor-pointer"
                      : ""
                  }
                  ${card.isMatched ? "bg-green-100" : ""}`}
              >
                {card.isFlipped || card.isMatched ? (
                  <span className="block">{card.emoji}</span>
                ) : (
                  <span className="block text-white">?</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Victory Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl pointer-events-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-green-600">
              🎉 Victory! 🎉
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-green-700">{moves}</p>
                  <p className="text-sm text-green-600">Moves</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-green-700">
                    {getGameTime()}s
                  </p>
                  <p className="text-sm text-green-600">Time</p>
                </div>
              </div>
              <div className="text-center text-gray-600 mt-4">
                <p>You've matched all {TOTAL_PAIRS} pairs!</p>
              </div>
              <button
                onClick={initializeGame}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-6"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
