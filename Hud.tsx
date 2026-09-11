import type { CameraStatus } from "../hooks/useDeviceOrientation";

function Btn({
  onClick,
  active,
  children,
  title,
  accent,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title?: string;
  accent?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
        active
          ? "border-white/30 bg-white/20 text-white"
          : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
      }`}
      style={active ? { boxShadow: `0 0 18px ${accent ?? "#818cf8"}55` } : undefined}
    >
      {children}
    </button>
  );
}

export function Hud({
  score,
  discovered,
  total,
  tour,
  onTour,
  onQuiz,
  arMode,
  onToggleAR,
  arStatus,
  onHelp,
  onReset,
  onMilkyWay,
}: {
  score: number;
  discovered: number;
  total: number;
  tour: boolean;
  onTour: () => void;
  onQuiz: () => void;
  arMode: boolean;
  onToggleAR: () => void;
  arStatus: CameraStatus;
  onHelp: () => void;
  onReset: () => void;
  onMilkyWay: () => void;
}) {
  return (
    <div className="pointer-events-auto fixed inset-x-0 top-0 z-30 p-3 sm:p-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/50 p-2 backdrop-blur-md sm:gap-3">
        <div className="flex items-center gap-2 px-2">
          <span className="text-xl">🚀</span>
          <div className="leading-tight">
            <div className="text-sm font-black tracking-tight text-white sm:text-base">
              Explorador Galáctico
            </div>
            <div className="hidden text-[11px] text-slate-400 sm:block">
              Aventura en la Vía Láctea
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-1.5 text-sm">
          <span className="text-amber-300">⭐</span>
          <span className="font-bold text-white">{score}</span>
          <span className="mx-1 h-4 w-px bg-white/10" />
          <span className="text-slate-400">🧭 {discovered}/{total}</span>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Btn onClick={onTour} active={tour} accent="#22d3ee" title="Visita guiada">
            <span>🎫</span>
            <span className="hidden sm:inline">Gira</span>
          </Btn>
          <Btn onClick={onQuiz} accent="#f472b6" title="Trivia espacial">
            <span>🧠</span>
            <span className="hidden sm:inline">Trivia</span>
          </Btn>
          <Btn onClick={onMilkyWay} accent="#a78bfa" title="La Vía Láctea">
            <span>🌌</span>
            <span className="hidden md:inline">Vía Láctea</span>
          </Btn>
          <Btn onClick={onToggleAR} active={arMode} accent="#34d399" title="Modo realidad aumentada">
            <span className="relative">
              👁️
              {arStatus === "granted" && (
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
              )}
            </span>
            <span className="hidden sm:inline">AR</span>
          </Btn>
          <Btn onClick={onHelp} title="Cómo jugar">
            <span>❔</span>
          </Btn>
          <Btn onClick={onReset} title="Reiniciar progreso">
            <span>↺</span>
          </Btn>
        </div>
      </div>
    </div>
  );
}
