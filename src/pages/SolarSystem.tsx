import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { Link } from "react-router-dom";
import { useRef, useState, useCallback, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface PlanetData {
  name: string;
  size: number;
  distance: number;
  color: string;
  speed: number;
  rotationSpeed: number;
  description: string;
  funFacts: string[];
  imageUrl: string;
}

const PLANETS: PlanetData[] = [
  {
    name: "Mercury",
    size: 0.383,
    distance: 6,
    color: "#FFB0A3",
    speed: 0.01,
    rotationSpeed: 0.005,
    description: "The smallest and innermost planet in the Solar System.",
    funFacts: [
      "Despite being closest to the Sun, it's not the hottest planet",
      "A year on Mercury is just 88 Earth days",
      "Has extreme temperature variations",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop",
  },
  {
    name: "Venus",
    size: 0.949,
    distance: 8,
    color: "#FFE5B4",
    speed: 0.007,
    rotationSpeed: 0.004,
    description:
      "Often called Earth's sister planet due to their similar size.",
    funFacts: [
      "Hottest planet in our solar system",
      "Rotates backwards compared to most planets",
      "Has the longest day of any planet",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&auto=format&fit=crop",
  },
  {
    name: "Earth",
    size: 1,
    distance: 10,
    color: "#4BB4FF",
    speed: 0.005,
    rotationSpeed: 0.003,
    description: "Our home planet and the only known planet with life.",
    funFacts: [
      "Only planet known to have liquid water on its surface",
      "Has one natural satellite - the Moon",
      "Has a perfect atmosphere for life",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&auto=format&fit=crop",
  },
  {
    name: "Mars",
    size: 0.532,
    distance: 12,
    color: "#FF6B6B",
    speed: 0.004,
    rotationSpeed: 0.003,
    description: "The Red Planet, named after the Roman god of war.",
    funFacts: [
      "Has the largest volcano in the solar system",
      "Has two moons: Phobos and Deimos",
      "Experiences frequent dust storms",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop",
  },
  {
    name: "Jupiter",
    size: 11.21,
    distance: 16,
    color: "#FFD700",
    speed: 0.002,
    rotationSpeed: 0.002,
    description: "The largest planet in our Solar System.",
    funFacts: [
      "Has a Great Red Spot that's actually a giant storm",
      "Has at least 79 moons",
      "Could fit 1,300 Earths inside it",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=800&auto=format&fit=crop",
  },
  {
    name: "Saturn",
    size: 9.45,
    distance: 20,
    color: "#FFC857",
    speed: 0.001,
    rotationSpeed: 0.002,
    description: "Famous for its beautiful ring system.",
    funFacts: [
      "Has the most extensive ring system of any planet",
      "Is the least dense planet in the Solar System",
      "Has 82 confirmed moons",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop",
  },
  {
    name: "Uranus",
    size: 4.01,
    distance: 24,
    color: "#7DE0FF",
    speed: 0.0007,
    rotationSpeed: 0.001,
    description: "The first planet discovered using a telescope.",
    funFacts: [
      "Rotates on its side",
      "Has 13 known rings",
      "Appears blue-green due to methane in its atmosphere",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&auto=format&fit=crop",
  },
  {
    name: "Neptune",
    size: 3.88,
    distance: 28,
    color: "#4169FF",
    speed: 0.0005,
    rotationSpeed: 0.001,
    description: "The windiest planet, with speeds up to 1,200 mph.",
    funFacts: [
      "Has the strongest winds in the Solar System",
      "Takes 165 Earth years to orbit the Sun",
      "Has a dark spot similar to Jupiter's",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&auto=format&fit=crop",
  },
];

// Camera control component
function CameraController({
  selectedPlanet,
  setSelectedPlanet,
}: {
  selectedPlanet: PlanetData | null;
  setSelectedPlanet: (planet: PlanetData | null) => void;
}) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (selectedPlanet) {
      const targetPosition = new THREE.Vector3(
        selectedPlanet.distance * 1.5,
        selectedPlanet.size * 2 + 2,
        selectedPlanet.distance * 1.5
      );

      gsap.to(camera.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 2,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(camera.position, {
        x: 0,
        y: 30,
        z: 60,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  }, [selectedPlanet, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={10}
      maxDistance={100}
    />
  );
}

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial
        color="#ffd700"
        emissive="#ff8c00"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Planet({
  planet,
  isSelected,
  onSelect,
}: {
  planet: PlanetData;
  isSelected: boolean;
  onSelect: (planet: PlanetData) => void;
}) {
  const { name, size, distance, color, speed, rotationSpeed } = planet;
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [time, setTime] = useState(Math.random() * 100);

  useFrame(() => {
    setTime((t) => t + speed);
    if (planetRef.current) {
      planetRef.current.position.x = Math.cos(time) * distance;
      planetRef.current.position.z = Math.sin(time) * distance;
      planetRef.current.rotation.y += rotationSpeed;
    }
  });

  const orbitGeometry = new THREE.BufferGeometry();
  const points = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * distance,
        0,
        Math.sin(angle) * distance
      )
    );
  }
  orbitGeometry.setFromPoints(points);

  return (
    <group ref={orbitRef}>
      <primitive
        object={
          new THREE.Line(
            orbitGeometry,
            new THREE.LineBasicMaterial({
              color: "#ffffff",
              opacity: isSelected ? 0.4 : 0.2,
              transparent: true,
            })
          )
        }
      />

      <mesh
        ref={planetRef}
        position={[distance, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(planet)}
      >
        <sphereGeometry args={[size * 0.6, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 0.4 : 0.2}
          metalness={0.3}
          roughness={0.7}
        />

        {(hovered || isSelected) && (
          <Html distanceFactor={15}>
            <div className="bg-black bg-opacity-80 text-white p-2 rounded-lg whitespace-nowrap">
              <h3 className="font-bold">{name}</h3>
              {!isSelected && (
                <>
                  <p className="text-sm">Distance from Sun: {distance} units</p>
                  <p className="text-sm">
                    Relative size: {size.toFixed(2)}x Earth
                  </p>
                </>
              )}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  const handlePlanetSelect = useCallback((planet: PlanetData) => {
    setSelectedPlanet((prev) => (prev?.name === planet.name ? null : planet));
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <div className="absolute top-4 left-4 z-10">
        <Link
          to="/"
          className="text-white hover:text-blue-400 transition-colors flex items-center gap-2"
        >
          ← Back to Projects
        </Link>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 z-10 text-white text-right bg-black bg-opacity-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Controls:</h3>
        <p>• Click and drag to rotate view</p>
        <p>• Scroll to zoom in/out</p>
        <p>• Click a planet to focus</p>
        <p>• Click again to return to system view</p>
      </div>

      {/* Selected Planet Info Panel */}
      {selectedPlanet && (
        <div className="absolute bottom-4 left-4 right-4 z-10 text-white bg-black bg-opacity-80 p-6 rounded-lg max-w-4xl mx-auto backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {selectedPlanet.name}
            </h2>
            <button
              onClick={() => setSelectedPlanet(null)}
              className="text-white hover:text-blue-400 transition-colors"
            >
              Return to System View
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <p className="text-lg mb-6 text-gray-200">
                {selectedPlanet.description}
              </p>
              <div className="grid grid-cols-1 gap-4">
                {selectedPlanet.funFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 bg-opacity-80 p-4 rounded-lg
                             border border-blue-400 border-opacity-30
                             hover:border-opacity-50 hover:bg-gray-700
                             transition-all duration-300 text-white text-lg
                             shadow-lg backdrop-blur-sm"
                  >
                    {fact}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src={selectedPlanet.imageUrl}
                alt={selectedPlanet.name}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 rounded-lg" />
            </div>
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 30, 60], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <Sun />
        {PLANETS.map((planet) => (
          <Planet
            key={planet.name}
            planet={planet}
            isSelected={selectedPlanet?.name === planet.name}
            onSelect={handlePlanetSelect}
          />
        ))}
        <CameraController
          selectedPlanet={selectedPlanet}
          setSelectedPlanet={setSelectedPlanet}
        />
      </Canvas>
    </div>
  );
}
