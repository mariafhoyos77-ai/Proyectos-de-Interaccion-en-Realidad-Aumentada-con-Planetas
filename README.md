# 🌌 Explorador Galáctico — Sistema Solar AR

Aventura interactiva en 3D por los planetas y las estrellas de la Vía Láctea,
pensada para explorar en clase. Incluye modo de **realidad aumentada** (cámara +
giroscopio en el móvil), visita guiada, trivia y sistema de puntos.

Hecho con React + Vite + Tailwind CSS + Three.js (`@react-three/fiber` / `drei`).

## 🚀 Probar en local

```bash
npm install
npm run dev
```

Luego abre http://localhost:5173

## 📦 Compilar

```bash
npm run build   # genera dist/index.html (un solo archivo)
npm run preview # sirve el build en local
```

## 🌍 Publicar online (GitHub Pages)

Este repo incluye el workflow `.github/workflows/deploy.yml`: cada push a
`main` compila el proyecto y lo despliega automáticamente a GitHub Pages.

Para activarlo (solo la primera vez):

1. En GitHub, ve a **Settings → Pages**.
2. En **Build and deployment → Source** elige **GitHub Actions**.
3. Haz push a `main` y espera a que termine el workflow **Desplegar en GitHub Pages**.
4. Tu app quedará disponible en
   `https://TU-USUARIO.github.io/TU-REPO/`

El `base` de Vite es relativo (`./`), así que el mismo build también funciona
en Netlify, Vercel o cualquier hosting estático sin cambios.

## 📁 Estructura

```
index.html
src/
├── main.tsx            # punto de entrada
├── App.tsx             # composición general + estado del juego
├── index.css           # estilos Tailwind
├── scene/              # 3D: SolarSystem, Planet, Sun, Starfield, CameraRig, registry
├── ui/                 # interfaz: Hud, InfoPanel, Quiz, Intro
├── data/celestial.ts   # planetas, Sol, estrellas, trivia
├── three/textures.ts   # texturas procedurales (canvas)
├── hooks/              # orientación del dispositivo + video AR
└── lib/cn.ts           # utilidades de clases CSS
```

## 📱 Notas del modo AR

- Requiere HTTPS (GitHub Pages ya lo usa) para acceder a la cámara.
- En iPhone, el permiso del giroscopio se pide al activar el modo AR.
