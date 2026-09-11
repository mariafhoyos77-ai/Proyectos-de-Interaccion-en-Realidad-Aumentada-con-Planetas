import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { SolarSystem } from "./scene/SolarSystem";
import { InfoPanel } from "./ui/InfoPanel";
import { Quiz } from "./ui/Quiz";
import { Hud } from "./ui/Hud";
import { Intro } from "./ui/Intro";
import { ALL_BODIES, findBody, PLANETS } from "./data/celestial";
import { useDeviceOrientation, useARVideo } from "./hooks/useDeviceOrientation";

const BG = "radial-gradient(circle at 50% 40%, #0b1026 0%, #05070f 70%, #020307 100%)";

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [arMode, setArMode] = useState(false);
  const [traveling, setTraveling] = useState(true);
  const [tour, setTour] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [intro, setIntro] = useState(true);
  const [score, setScore] = useState(0);
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());
  const discoveredRef = useRef<Set<string>>(new Set());

  const {
    dataRef: orientationRef,
    hasData: hasOrientation,
    enable: enableOrientation,
    disable: disableOrientation,
  } = useDeviceOrientation();
  const { stream, status: arStatus } = useARVideo(arMode);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleAR = useCallback(() => {
    if (arMode) {
      disableOrientation();
      setArMode(false);
    } else {
      enableOrientation(); // called from a tap → valid user gesture
      setArMode(true);
    }
  }, [arMode, enableOrientation, disableOrientation]);

  // discovery + scoring
  const select = useCallback((id: string) => {
    setSelected(id);
    if (!discoveredRef.current.has(id)) {
      discoveredRef.current = new Set(discoveredRef.current).add(id);
      setDiscovered(discoveredRef.current);
      const b = findBody(id);
      const pts =
        b?.kind === "star" ? 15 : b?.kind === "galaxy" ? 25 : b?.kind === "sun" ? 5 : 10;
      setScore((s) => s + pts);
    }
  }, []);

  // user clicks a body: stop the tour first
  const userSelect = useCallback(
    (id: string) => {
      setTour(false);
      select(id);
    },
    [select],
  );

  // guided tour
  useEffect(() => {
    if (!tour) return;
    const ids = ["sol", ...PLANETS.map((p) => p.id)];
    let i = 0;
    select(ids[0]);
    const t = setInterval(() => {
      i++;
      if (i >= ids.length) {
        setTour(false);
        clearInterval(t);
        return;
      }
      select(ids[i]);
    }, 3400);
    return () => clearInterval(t);
  }, [tour, select]);

  // attach camera stream to the video element
  useEffect(() => {
    const v = videoRef.current;
    if (v && stream) {
      v.srcObject = stream;
      v.play().catch(() => {});
    }
  }, [stream]);

  const reset = useCallback(() => {
    discoveredRef.current = new Set();
    setSelected(null);
    setScore(0);
    setDiscovered(new Set());
    setTour(false);
  }, []);

  const body = selected ? findBody(selected) ?? null : null;
  const total = useMemo(() => ALL_BODIES.length, []);
  const allDone = total > 0 && discovered.size === total;

  const arHint = !arMode
    ? null
    : arStatus === "granted"
      ? hasOrientation
        ? "📱 Mueve el dispositivo para mirar alrededor"
        : "👁️ Estás viendo el sistema solar sobre tu cámara · arrastra para girar"
      : arStatus === "loading" || arStatus === "idle"
        ? "📷 Abriendo la cámara…"
        : "🚫 Cámara no disponible · usa los controles para explorar";

  return (
    <div
      className="relative h-screen w-screen overflow-hidden select-none"
      style={{ background: BG }}
    >
      {/* AR camera backdrop (behind the transparent canvas) */}
      {arMode && stream && (
        <div className="fixed inset-0 z-0 bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* 3D scene */}
      <div className="fixed inset-0 z-10">
        <Canvas
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 70, 112], fov: 50, near: 0.1, far: 6000 }}
          dpr={[1, 1.8]}
        >
          <SolarSystem
            selected={selected}
            onSelect={userSelect}
            arMode={arMode}
            orientationRef={orientationRef}
            hasOrientation={hasOrientation}
            traveling={traveling}
            setTraveling={setTraveling}
          />
        </Canvas>
      </div>

      {/* completion celebration */}
      {allDone && !body && (
        <div className="pointer-events-none fixed inset-x-0 bottom-16 z-20 flex justify-center px-4">
          <div className="animate-pulse rounded-2xl border border-amber-300/40 bg-gradient-to-r from-amber-500/25 to-yellow-500/20 px-6 py-3 text-center shadow-lg backdrop-blur">
            <div className="text-lg font-black text-amber-200">
              🎉 ¡Astrónomo/a experto!
            </div>
            <div className="text-xs text-amber-100">
              Descubriste los {total} cuerpos del cielo. ¡Excelente trabajo, clase!
            </div>
          </div>
        </div>
      )}

      {/* bottom hint */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-4">
        {arHint ? (
          <div className="rounded-full border border-emerald-400/30 bg-slate-900/70 px-4 py-2 text-center text-xs font-semibold text-emerald-100 backdrop-blur">
            {arHint}
          </div>
        ) : (
          <div className="hidden rounded-full border border-white/10 bg-slate-900/50 px-4 py-2 text-center text-xs text-slate-300 backdrop-blur sm:block">
            🖱️ Arrastra para girar · rueda para zoom · haz clic en un planeta o
            estrella ✨
          </div>
        )}
      </div>

      <Hud
        score={score}
        discovered={discovered.size}
        total={total}
        tour={tour}
        onTour={() => setTour((t) => !t)}
        onQuiz={() => {
          setTour(false);
          setQuiz(true);
        }}
        arMode={arMode}
        onToggleAR={toggleAR}
        arStatus={arStatus}
        onHelp={() => setIntro(true)}
        onReset={reset}
        onMilkyWay={() => userSelect("via-lactea")}
      />

      {body && <InfoPanel body={body} onClose={() => setSelected(null)} />}
      {quiz && <Quiz onScore={(p) => setScore((s) => s + p)} onClose={() => setQuiz(false)} />}
      {intro && <Intro onStart={() => setIntro(false)} />}
    </div>
  );
}
