import type { Celestial } from "../data/celestial";

export function InfoPanel({
  body,
  onClose,
}: {
  body: Celestial;
  onClose: () => void;
}) {
  return (
    <div
      className="pointer-events-auto fixed right-4 top-20 bottom-4 z-30 flex w-[20rem] max-w-[86vw] flex-col overflow-hidden rounded-2xl border backdrop-blur-md"
      style={{
        borderColor: `${body.color}55`,
        background:
          "linear-gradient(160deg, rgba(10,14,30,0.9), rgba(5,8,20,0.85))",
        boxShadow: `0 0 40px ${body.color}22`,
      }}
    >
      <div
        className="flex items-center gap-3 border-b p-4"
        style={{ borderColor: `${body.color}33` }}
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${body.color}, ${body.color2})`,
            boxShadow: `0 0 20px ${body.color}66`,
          }}
        >
          {body.emoji}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold text-white">{body.name}</h2>
          <p className="truncate text-xs font-medium" style={{ color: body.color }}>
            {body.tagline}
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 transition hover:bg-white/20"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <p className="text-sm leading-relaxed text-slate-200">{body.description}</p>

        <div className="grid grid-cols-2 gap-2">
          {body.facts.map((f) => (
            <div
              key={f.label}
              className="rounded-xl border p-2.5"
              style={{ borderColor: `${body.color}33`, background: `${body.color}0d` }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {f.label}
              </div>
              <div className="mt-0.5 text-sm font-semibold text-white">{f.value}</div>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl border-l-4 p-3"
          style={{
            borderColor: body.color,
            background: `${body.color}14`,
          }}
        >
          <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: body.color }}>
            ¿Sabías que…?
          </div>
          <p className="mt-1 text-sm leading-relaxed text-slate-100">{body.funFact}</p>
        </div>
      </div>
    </div>
  );
}
