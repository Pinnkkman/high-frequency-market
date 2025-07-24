import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";

export default function HighFrequencyMarket() {
  const mountRef = useRef(null);
  const [unlocked, setUnlocked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [pass, setPass] = useState("");

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      color: 0x9933ff,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.003;
      renderer.render(scene, camera);
    };

    animate();

    return () => mount.removeChild(renderer.domElement);
  }, []);

  const handleUnlock = () => {
    if (pass.trim().toLowerCase() === "cosmicwave") {
      setUnlocked(true);
      setShowPrompt(false);
    } else {
      alert("Incorrect code.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 -z-10" ref={mountRef} />
      <h1 className="text-5xl font-bold mb-4 text-center tracking-wide">HIGH FREQUENCY MARKET</h1>
      <p className="text-md text-purple-300 mb-6 max-w-xl text-center">
        A calm space to elevate. Front-end wellness. Back-end elevation. Verified frequencies only.
      </p>
      <div className="flex gap-4 mb-8">
        <Button variant="default">🍎 Cosmic Wellness</Button>
        <Button variant="secondary" onClick={() => setShowPrompt(true)}>🔐 Hidden Frequency</Button>
      </div>

      {showPrompt && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white/10 p-6 rounded-xl shadow-lg text-center">
            <p className="mb-4">Enter access code:</p>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="text-black p-2 rounded w-48"
            />
            <div className="mt-4">
              <Button onClick={handleUnlock}>Unlock</Button>
            </div>
          </div>
        </div>
      )}

      {unlocked && (
        <section className="w-full max-w-5xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-4 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Khalifa Kart OG</h2>
            <p className="text-sm">High-voltage vape blend. <strong>2G | Pure | Sleek</strong></p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Space Jam Brownies</h2>
            <p className="text-sm">Soft, chocolate cosmic bars. <strong>Float Certified</strong></p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Melly Smoothie</h2>
            <p className="text-sm">Mixed fruit & boosted berries. <strong>250ml</strong></p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Superman Tabs</h2>
            <p className="text-sm">Energy. Music. Vision. <strong>Party Ready</strong></p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">Green Amore</h2>
            <p className="text-sm">Rare blend. Schedule 1 coded. <strong>🔒 Members Only</strong></p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-2">LSD Liquid</h2>
            <p className="text-sm">1 Drop = New World. <strong>Verified Zone</strong></p>
          </div>
        </section>
      )}

      <p className="text-xs text-gray-400 mt-8">All products are metaphorical demos. For creative project use only.</p>

      <audio autoPlay loop className="hidden">
        <source src="/ambient-hippie-sound.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}