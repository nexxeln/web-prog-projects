import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

interface KeyProps {
  keyCode: string;
  label: string;
  width?: string;
  pressed: boolean;
  onKeyPress: (key: string) => void;
}

interface KeyConfig {
  code: string;
  label: string;
  width?: string;
}

type KeyboardLayout = KeyConfig[][];

const Key = ({
  keyCode,
  label,
  width = "40px",
  pressed,
  onKeyPress,
}: KeyProps) => (
  <div
    className={`
      relative h-14 m-0.5 rounded-lg flex items-center justify-center
      font-medium transition-all duration-100 cursor-pointer select-none
      ${
        pressed
          ? "bg-purple-600 text-white shadow-inner transform scale-95"
          : "bg-gray-800 text-gray-200 shadow-lg hover:bg-gray-700"
      }
    `}
    style={{ width }}
    onMouseDown={() => onKeyPress(keyCode)}
  >
    <span className="text-sm">{label}</span>
    {pressed && (
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
    )}
  </div>
);

type Layout = "QWERTY" | "DVORAK" | "AZERTY";

const LAYOUTS: Record<Layout, KeyboardLayout> = {
  QWERTY: [
    [
      { code: "Escape", label: "Esc", width: "50px" },
      { code: "F1", label: "F1" },
      { code: "F2", label: "F2" },
      { code: "F3", label: "F3" },
      { code: "F4", label: "F4" },
      { code: "F5", label: "F5" },
      { code: "F6", label: "F6" },
      { code: "F7", label: "F7" },
      { code: "F8", label: "F8" },
      { code: "F9", label: "F9" },
      { code: "F10", label: "F10" },
      { code: "F11", label: "F11" },
      { code: "F12", label: "F12" },
    ],
    [
      { code: "Backquote", label: "`" },
      { code: "Digit1", label: "1" },
      { code: "Digit2", label: "2" },
      { code: "Digit3", label: "3" },
      { code: "Digit4", label: "4" },
      { code: "Digit5", label: "5" },
      { code: "Digit6", label: "6" },
      { code: "Digit7", label: "7" },
      { code: "Digit8", label: "8" },
      { code: "Digit9", label: "9" },
      { code: "Digit0", label: "0" },
      { code: "Minus", label: "-" },
      { code: "Equal", label: "=" },
      { code: "Backspace", label: "⌫", width: "75px" },
    ],
    [
      { code: "Tab", label: "Tab", width: "60px" },
      { code: "KeyQ", label: "Q" },
      { code: "KeyW", label: "W" },
      { code: "KeyE", label: "E" },
      { code: "KeyR", label: "R" },
      { code: "KeyT", label: "T" },
      { code: "KeyY", label: "Y" },
      { code: "KeyU", label: "U" },
      { code: "KeyI", label: "I" },
      { code: "KeyO", label: "O" },
      { code: "KeyP", label: "P" },
      { code: "BracketLeft", label: "[" },
      { code: "BracketRight", label: "]" },
      { code: "Backslash", label: "\\", width: "55px" },
    ],
    [
      { code: "CapsLock", label: "Caps", width: "70px" },
      { code: "KeyA", label: "A" },
      { code: "KeyS", label: "S" },
      { code: "KeyD", label: "D" },
      { code: "KeyF", label: "F" },
      { code: "KeyG", label: "G" },
      { code: "KeyH", label: "H" },
      { code: "KeyJ", label: "J" },
      { code: "KeyK", label: "K" },
      { code: "KeyL", label: "L" },
      { code: "Semicolon", label: ";" },
      { code: "Quote", label: "'" },
      { code: "Enter", label: "⏎", width: "75px" },
    ],
    [
      { code: "ShiftLeft", label: "⇧", width: "90px" },
      { code: "KeyZ", label: "Z" },
      { code: "KeyX", label: "X" },
      { code: "KeyC", label: "C" },
      { code: "KeyV", label: "V" },
      { code: "KeyB", label: "B" },
      { code: "KeyN", label: "N" },
      { code: "KeyM", label: "M" },
      { code: "Comma", label: "," },
      { code: "Period", label: "." },
      { code: "Slash", label: "/" },
      { code: "ShiftRight", label: "⇧", width: "90px" },
    ],
    [
      { code: "ControlLeft", label: "Ctrl", width: "60px" },
      { code: "MetaLeft", label: "⌘", width: "60px" },
      { code: "AltLeft", label: "Alt", width: "60px" },
      { code: "Space", label: "", width: "320px" },
      { code: "AltRight", label: "Alt", width: "60px" },
      { code: "MetaRight", label: "⌘", width: "60px" },
      { code: "ControlRight", label: "Ctrl", width: "60px" },
    ],
  ],
  DVORAK: [
    [
      { code: "Escape", label: "Esc", width: "50px" },
      { code: "F1", label: "F1" },
      { code: "F2", label: "F2" },
      { code: "F3", label: "F3" },
      { code: "F4", label: "F4" },
      { code: "F5", label: "F5" },
      { code: "F6", label: "F6" },
      { code: "F7", label: "F7" },
      { code: "F8", label: "F8" },
      { code: "F9", label: "F9" },
      { code: "F10", label: "F10" },
      { code: "F11", label: "F11" },
      { code: "F12", label: "F12" },
    ],
    [
      { code: "Backquote", label: "`" },
      { code: "Digit1", label: "1" },
      { code: "Digit2", label: "2" },
      { code: "Digit3", label: "3" },
      { code: "Digit4", label: "4" },
      { code: "Digit5", label: "5" },
      { code: "Digit6", label: "6" },
      { code: "Digit7", label: "7" },
      { code: "Digit8", label: "8" },
      { code: "Digit9", label: "9" },
      { code: "Digit0", label: "0" },
      { code: "BracketLeft", label: "[" },
      { code: "BracketRight", label: "]" },
      { code: "Backspace", label: "⌫", width: "75px" },
    ],
    [
      { code: "Tab", label: "Tab", width: "60px" },
      { code: "Quote", label: "'" },
      { code: "Comma", label: "," },
      { code: "Period", label: "." },
      { code: "KeyP", label: "P" },
      { code: "KeyY", label: "Y" },
      { code: "KeyF", label: "F" },
      { code: "KeyG", label: "G" },
      { code: "KeyC", label: "C" },
      { code: "KeyR", label: "R" },
      { code: "KeyL", label: "L" },
      { code: "Slash", label: "/" },
      { code: "Equal", label: "=" },
      { code: "Backslash", label: "\\", width: "55px" },
    ],
    [
      { code: "CapsLock", label: "Caps", width: "70px" },
      { code: "KeyA", label: "A" },
      { code: "KeyO", label: "O" },
      { code: "KeyE", label: "E" },
      { code: "KeyU", label: "U" },
      { code: "KeyI", label: "I" },
      { code: "KeyD", label: "D" },
      { code: "KeyH", label: "H" },
      { code: "KeyT", label: "T" },
      { code: "KeyN", label: "N" },
      { code: "KeyS", label: "S" },
      { code: "Minus", label: "-" },
      { code: "Enter", label: "⏎", width: "75px" },
    ],
    [
      { code: "ShiftLeft", label: "⇧", width: "90px" },
      { code: "Semicolon", label: ";" },
      { code: "KeyQ", label: "Q" },
      { code: "KeyJ", label: "J" },
      { code: "KeyK", label: "K" },
      { code: "KeyX", label: "X" },
      { code: "KeyB", label: "B" },
      { code: "KeyM", label: "M" },
      { code: "KeyW", label: "W" },
      { code: "KeyV", label: "V" },
      { code: "KeyZ", label: "Z" },
      { code: "ShiftRight", label: "⇧", width: "90px" },
    ],
    [
      { code: "ControlLeft", label: "Ctrl", width: "60px" },
      { code: "MetaLeft", label: "⌘", width: "60px" },
      { code: "AltLeft", label: "Alt", width: "60px" },
      { code: "Space", label: "", width: "320px" },
      { code: "AltRight", label: "Alt", width: "60px" },
      { code: "MetaRight", label: "⌘", width: "60px" },
      { code: "ControlRight", label: "Ctrl", width: "60px" },
    ],
  ],
  AZERTY: [
    [
      { code: "Escape", label: "Esc", width: "50px" },
      { code: "F1", label: "F1" },
      { code: "F2", label: "F2" },
      { code: "F3", label: "F3" },
      { code: "F4", label: "F4" },
      { code: "F5", label: "F5" },
      { code: "F6", label: "F6" },
      { code: "F7", label: "F7" },
      { code: "F8", label: "F8" },
      { code: "F9", label: "F9" },
      { code: "F10", label: "F10" },
      { code: "F11", label: "F11" },
      { code: "F12", label: "F12" },
    ],
    [
      { code: "Backquote", label: "²" },
      { code: "Digit1", label: "&" },
      { code: "Digit2", label: "é" },
      { code: "Digit3", label: '"' },
      { code: "Digit4", label: "'" },
      { code: "Digit5", label: "(" },
      { code: "Digit6", label: "-" },
      { code: "Digit7", label: "è" },
      { code: "Digit8", label: "_" },
      { code: "Digit9", label: "ç" },
      { code: "Digit0", label: "à" },
      { code: "Minus", label: ")" },
      { code: "Equal", label: "=" },
      { code: "Backspace", label: "⌫", width: "75px" },
    ],
    [
      { code: "Tab", label: "Tab", width: "60px" },
      { code: "KeyQ", label: "A" },
      { code: "KeyW", label: "Z" },
      { code: "KeyE", label: "E" },
      { code: "KeyR", label: "R" },
      { code: "KeyT", label: "T" },
      { code: "KeyY", label: "Y" },
      { code: "KeyU", label: "U" },
      { code: "KeyI", label: "I" },
      { code: "KeyO", label: "O" },
      { code: "KeyP", label: "P" },
      { code: "BracketLeft", label: "^" },
      { code: "BracketRight", label: "$" },
      { code: "Backslash", label: "*", width: "55px" },
    ],
    [
      { code: "CapsLock", label: "Caps", width: "70px" },
      { code: "KeyA", label: "Q" },
      { code: "KeyS", label: "S" },
      { code: "KeyD", label: "D" },
      { code: "KeyF", label: "F" },
      { code: "KeyG", label: "G" },
      { code: "KeyH", label: "H" },
      { code: "KeyJ", label: "J" },
      { code: "KeyK", label: "K" },
      { code: "KeyL", label: "L" },
      { code: "Semicolon", label: "M" },
      { code: "Quote", label: "ù" },
      { code: "Enter", label: "⏎", width: "75px" },
    ],
    [
      { code: "ShiftLeft", label: "⇧", width: "90px" },
      { code: "KeyZ", label: "W" },
      { code: "KeyX", label: "X" },
      { code: "KeyC", label: "C" },
      { code: "KeyV", label: "V" },
      { code: "KeyB", label: "B" },
      { code: "KeyN", label: "N" },
      { code: "KeyM", label: "," },
      { code: "Comma", label: ";" },
      { code: "Period", label: ":" },
      { code: "Slash", label: "!" },
      { code: "ShiftRight", label: "⇧", width: "90px" },
    ],
    [
      { code: "ControlLeft", label: "Ctrl", width: "60px" },
      { code: "MetaLeft", label: "⌘", width: "60px" },
      { code: "AltLeft", label: "Alt", width: "60px" },
      { code: "Space", label: "", width: "320px" },
      { code: "AltRight", label: "Alt", width: "60px" },
      { code: "MetaRight", label: "⌘", width: "60px" },
      { code: "ControlRight", label: "Ctrl", width: "60px" },
    ],
  ],
};

export default function VirtualKeyboard() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [typedText, setTypedText] = useState("");
  const [currentLayout, setCurrentLayout] = useState<Layout>("QWERTY");

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    setPressedKeys((prev) => new Set([...prev, event.code]));

    // Add character to typed text
    if (event.key.length === 1) {
      setTypedText((prev) => prev + event.key);
    } else if (event.key === "Backspace") {
      setTypedText((prev) => prev.slice(0, -1));
    } else if (event.key === "Enter") {
      setTypedText((prev) => prev + "\n");
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.delete(event.code);
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleVirtualKeyPress = (keyCode: string) => {
    setPressedKeys((prev) => new Set([...prev, keyCode]));
    setTimeout(() => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(keyCode);
        return next;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            ← Back to Projects
          </Link>
          <div className="flex items-center gap-4">
            <select
              value={currentLayout}
              onChange={(e) => setCurrentLayout(e.target.value as Layout)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white border-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="QWERTY">QWERTY</option>
              <option value="DVORAK">DVORAK</option>
              <option value="AZERTY">AZERTY</option>
            </select>
          </div>
        </div>

        <div className="mb-8">
          <textarea
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="Start typing to test the keyboard..."
            className="w-full h-32 bg-gray-800 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div className="bg-gray-900 p-8 rounded-xl shadow-2xl">
          {LAYOUTS[currentLayout].map((row, i) => (
            <div key={i} className="flex justify-center mb-2">
              {row.map((key) => (
                <Key
                  key={key.code}
                  keyCode={key.code}
                  label={key.label}
                  width={key.width}
                  pressed={pressedKeys.has(key.code)}
                  onKeyPress={handleVirtualKeyPress}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
