export function Intro({ onStart }: { onStart: () => void }) {
  const controls = [
    { icon: "🖱️", label: "Arrastra", desc: "para girar la vista" },
    { icon: "🔍", label: "Rueda / pellizco", desc: "para acercarte y alejarte" },
    { icon: "👆", label: "Haz clic", desc: "en un planeta o estrella" },
    { icon: "🧑‍🏫", label: "Gira", desc: "recorrido automático" },
    { icon: "🧠", label: "Trivia", desc: "gana puntos respondiendo" },
    { icon: "👁️", label: "AR", desc: "mira en tu entorno (móvil)" },
  ];

  return (
    <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-indigo-400/20 bg-slate-900/95 shadow-2xl">
        <div className="border-b border-white/10 bg-gradient-to-r from-indigo-600/30 to-violet-600/30 px-6 py-6">
          <div className="text-4xl">🌌</div>
          <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            Explorador Galáctico
          </h1>
          <p className="mt-1 text-sm text-indigo-100">
            Una aventura interactiva por los planetas y las estrellas de la Vía
            Láctea, pensada para explorar en clase.
          </p>
        </div>

        <div className="space-y-5 p-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-indigo-300">
              🎯 Tu misión
            </h2>
            <p className="mt-1 text-sm text-slate-200">
              Viaja por el sistema solar, <b>descubre</b> cada planeta y estrella
              para sumar puntos, y responde la <b>trivia</b> para demostrar lo que
              aprendiste. ¡Completa el mapa y conviértete en astrónomo/a!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {controls.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-800/60 px-3 py-2.5"
              >
                <span className="text-xl">{c.icon}</span>
                <div className="leading-tight">
                  <div className="text-sm font-bold text-white">{c.label}</div>
                  <div className="text-xs text-slate-400">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onStart}
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3.5 text-base font-black text-white shadow-lg transition hover:from-indigo-400 hover:to-violet-400"
          >
            🚀 Comenzar la exploración
          </button>
        </div>
      </div>
    </div>
  );
}
