import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MusicVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const initializeAudio = async (file: File) => {
    if (!audioRef.current) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const audioUrl = URL.createObjectURL(file);
    audioRef.current.src = audioUrl;

    const source = audioContextRef.current.createMediaElementSource(
      audioRef.current
    );
    const analyser = audioContextRef.current.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(audioContextRef.current.destination);
    analyserRef.current = analyser;

    visualize();
  };

  const visualize = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      const barSpacing = 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * (canvas.height / 2);

        const gradient = ctx.createLinearGradient(
          0,
          canvas.height - barHeight,
          0,
          canvas.height
        );
        gradient.addColorStop(0, "#ff00ff"); // Pink
        gradient.addColorStop(0.5, "#00ffff"); // Cyan
        gradient.addColorStop(1, "#0033ff"); // Blue

        ctx.fillStyle = gradient;

        // Draw mirrored bars
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        ctx.fillRect(x, 0, barWidth, barHeight);

        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff00ff";

        x += barWidth + barSpacing;
      }
    };

    draw();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      initializeAudio(file);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <Link
          to="/"
          className="text-white hover:text-blue-400 transition-colors flex items-center gap-2"
        >
          ← Back to Projects
        </Link>
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-4">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="text-white"
        />
        {audioFile && (
          <button
            onClick={togglePlayPause}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg text-white hover:opacity-90 transition-opacity"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        )}
      </div>

      <canvas ref={canvasRef} className="w-full h-full" />

      <audio ref={audioRef} />
    </div>
  );
}
