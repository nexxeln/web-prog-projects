import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SpeedTyping from "./pages/SpeedTyping";
import MemoryGame from "./pages/MemoryGame";
import SolarSystem from "./pages/SolarSystem";
import MusicVisualizer from "./pages/MusicVisualizer";
import VirtualKeyboard from "./pages/VirtualKeyboard";

interface ProjectCard {
  title: string;
  description: string;
  path: string;
  icon: string;
  tags: string[];
  color: string;
}

const projects: ProjectCard[] = [
  {
    title: "Speed Typing Game",
    description:
      "Test and improve your typing speed with this interactive typing game featuring multiple difficulty levels.",
    path: "/speed-typing",
    icon: "⌨️",
    tags: ["Game", "Educational"],
    color: "from-blue-600 to-blue-400",
  },
  {
    title: "Memory Card Game",
    description:
      "Challenge your memory with this classic card matching game. Find all pairs to win!",
    path: "/memory-game",
    icon: "🎴",
    tags: ["Game", "Memory"],
    color: "from-purple-600 to-purple-400",
  },
  {
    title: "Solar System Explorer",
    description:
      "Explore our solar system in 3D with interactive planets and detailed information.",
    path: "/solar-system",
    icon: "🌍",
    tags: ["3D", "Educational"],
    color: "from-indigo-600 to-indigo-400",
  },
  {
    title: "Music Visualizer",
    description:
      "Experience your music with stunning visual effects and real-time audio analysis.",
    path: "/music-visualizer",
    icon: "🎵",
    tags: ["Audio", "Creative"],
    color: "from-green-600 to-green-400",
  },
  {
    title: "Virtual Keyboard Studio",
    description:
      "Interactive keyboard with multiple layouts and real-time visual feedback.",
    path: "/virtual-keyboard",
    icon: "⌨️",
    tags: ["Input", "Educational"],
    color: "from-pink-600 to-pink-400",
  },
];

function ProjectCard({ project }: { project: ProjectCard }) {
  return (
    <Link
      to={project.path}
      className="group relative block overflow-hidden rounded-2xl transition-all hover:scale-[1.02]"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`}
      />
      <div className="relative p-8">
        <div className="mb-4 text-5xl">{project.icon}</div>
        <h2 className="mb-4 text-2xl font-bold text-white">{project.title}</h2>
        <p className="mb-4 text-lg text-white/90">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute bottom-4 right-4 rounded-full bg-white/30 p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/speed-typing" element={<SpeedTyping />} />
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/solar-system" element={<SolarSystem />} />
        <Route path="/music-visualizer" element={<MusicVisualizer />} />
        <Route path="/virtual-keyboard" element={<VirtualKeyboard />} />
      </Routes>

      <div className="min-h-screen bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Interactive Web Projects
            </h1>
            <p className="mx-auto mb-16 max-w-2xl text-lg text-gray-400">
              A collection of interactive web applications showcasing modern web
              technologies, creative design, and engaging user experiences.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.path} project={project} />
            ))}
          </div>

          <footer className="mt-16 text-center text-gray-400">
            <p>Built with React, TypeScript, and Tailwind CSS</p>
          </footer>
        </div>
      </div>
    </Router>
  );
}
