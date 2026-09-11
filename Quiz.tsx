import { useState } from "react";
import { QUIZ } from "../data/celestial";

export function Quiz({
  onScore,
  onClose,
}: {
  onScore: (points: number) => void;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const q = QUIZ[index];
  const answered = picked !== null;
  const isLast = index === QUIZ.length - 1;

  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    if (i === q.answer) onScore(20);
  };

  const next = () => {
    if (isLast) {
      onClose();
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  };

  return (
    <div className="pointer-events-auto fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-indigo-400/20 bg-slate-900/95 shadow-2xl backdrop-blur-lg">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h3 className="text-lg font-bold text-white">Trivia espacial</h3>
            <div className="text-xs text-slate-400">
              Pregunta {index + 1} de {QUIZ.length}
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 transition hover:bg-white/20"
            aria-label="Cerrar trivia"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          <p className="text-base font-semibold text-white">{q.q}</p>

          <div className="mt-4 space-y-2">
            {q.options.map((opt, i) => {
              let cls =
                "border-white/10 bg-white/5 text-slate-200 hover:border-indigo-400/50 hover:bg-white/10";
              if (answered) {
                if (i === q.answer)
                  cls = "border-emerald-400/60 bg-emerald-500/20 text-emerald-100";
                else if (i === picked)
                  cls = "border-rose-400/60 bg-rose-500/20 text-rose-100";
                else cls = "border-white/5 bg-white/5 text-slate-500";
              }
              return (
                <button
                  key={opt}
                  onClick={() => choose(i)}
                  disabled={answered}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${cls}`}
                >
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                    {["A", "B", "C"][i]}
                  </span>
                  {opt}
                  {answered && i === q.answer && <span className="ml-auto">✔</span>}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-100">
              <span className="font-semibold">Pista:</span> {q.hint}
            </div>
          )}

          {answered && (
            <button
              onClick={next}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-bold text-white transition hover:from-indigo-400 hover:to-violet-400"
            >
              {isLast ? "Finalizar" : "Siguiente pregunta"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
