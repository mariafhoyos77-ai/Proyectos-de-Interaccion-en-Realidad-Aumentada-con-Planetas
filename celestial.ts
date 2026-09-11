export type Kind = "planet" | "star" | "sun" | "galaxy";

export type TextureType =
  | "rocky"
  | "gas"
  | "earth"
  | "ice"
  | "sun"
  | "star";

export interface Moon {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  color: string;
}

export interface Celestial {
  id: string;
  kind: Kind;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  facts: { label: string; value: string }[];
  funFact: string;
  color: string;
  color2: string;
  textureType: TextureType;
  radius: number;
  // planets only
  orbit?: number;
  speed?: number;
  rotationSpeed?: number;
  tilt?: number;
  ring?: { inner: number; outer: number; color: string };
  moons?: Moon[];
  // stars / galaxy only
  position?: [number, number, number];
  glow?: number;
}

// ---------------------------------------------------------------------------
// PLANETS (visual scale / orbit radius tuned for a readable classroom view)
// ---------------------------------------------------------------------------
export const PLANETS: Celestial[] = [
  {
    id: "mercurio",
    kind: "planet",
    name: "Mercurio",
    emoji: "🪨",
    tagline: "El pequeño y veloz mensajero",
    description:
      "Mercurio es el planeta más pequeño y el más cercano al Sol. Su superficie, cubierta de cráteres, se parece mucho a la de la Luna. No tiene atmósfera que retenga el calor, por eso sufre cambios de temperatura extremos entre el día y la noche.",
    facts: [
      { label: "Diámetro", value: "4.879 km" },
      { label: "Distancia al Sol", value: "57,9 M km (0,39 UA)" },
      { label: "Día", value: "59 días terrestres" },
      { label: "Año", value: "88 días terrestres" },
      { label: "Lunas", value: "0" },
      { label: "Temperatura", value: "-173 °C a 427 °C" },
      { label: "Gravedad", value: "3,7 m/s²" },
    ],
    funFact: "Un año en Mercurio dura menos que su propio día: ¡dos veces más lento girando que orbitando!",
    color: "#8a8a8a",
    color2: "#5c5c5c",
    textureType: "rocky",
    radius: 0.6,
    orbit: 10,
    speed: 0.2,
    rotationSpeed: 0.1,
    tilt: 0.03,
  },
  {
    id: "venus",
    kind: "planet",
    name: "Venus",
    emoji: "🔥",
    tagline: "El gemelo infernal de la Tierra",
    description:
      "Venus es el planeta más caliente del sistema solar. Su densa atmósfera de dióxido de carbono produce un efecto invernadero que mantiene temperaturas capaces de fundir el plomo. Gira al revés que casi todos los demás planetas.",
    facts: [
      { label: "Diámetro", value: "12.104 km" },
      { label: "Distancia al Sol", value: "108,2 M km (0,72 UA)" },
      { label: "Día", value: "243 días terrestres" },
      { label: "Año", value: "225 días terrestres" },
      { label: "Lunas", value: "0" },
      { label: "Temperatura", value: "≈ 465 °C" },
      { label: "Gravedad", value: "8,9 m/s²" },
    ],
    funFact: "Venus gira en sentido contrario (retrógrado): en Venus el Sol sale por el oeste.",
    color: "#e0b06a",
    color2: "#b07f3e",
    textureType: "gas",
    radius: 0.85,
    orbit: 13.5,
    speed: 0.16,
    rotationSpeed: -0.05,
    tilt: 3.1,
  },
  {
    id: "tierra",
    kind: "planet",
    name: "Tierra",
    emoji: "🌍",
    tagline: "Nuestro hogar azul",
    description:
      "La Tierra es el único lugar conocido del universo donde existe vida. El 71% de su superficie está cubierta de agua líquida y posee una atmósfera rica en oxígeno que nos protege, junto a su campo magnético, de la radiación solar.",
    facts: [
      { label: "Diámetro", value: "12.742 km" },
      { label: "Distancia al Sol", value: "149,6 M km (1 UA)" },
      { label: "Día", value: "24 horas" },
      { label: "Año", value: "365,25 días" },
      { label: "Lunas", value: "1 (la Luna)" },
      { label: "Temperatura media", value: "15 °C" },
      { label: "Gravedad", value: "9,8 m/s²" },
    ],
    funFact: "La Tierra no es una esfera perfecta: está ligeramente achatada en los polos.",
    color: "#2f6fdd",
    color2: "#1e4a9e",
    textureType: "earth",
    radius: 0.9,
    orbit: 17,
    speed: 0.13,
    rotationSpeed: 0.6,
    tilt: 0.41,
    moons: [
      { name: "Luna", radius: 0.24, distance: 1.9, speed: 1.4, color: "#c9c9c9" },
    ],
  },
  {
    id: "marte",
    kind: "planet",
    name: "Marte",
    emoji: "🔴",
    tagline: "El planeta rojo",
    description:
      "Marte debe su color rojo al óxido de hierro (herrumbre) que cubre su superficie. Tiene el volcán más grande del sistema solar, el Monte Olimpo, y cañones gigantes. Los científicos estudian si hubo agua en su pasado.",
    facts: [
      { label: "Diámetro", value: "6.779 km" },
      { label: "Distancia al Sol", value: "227,9 M km (1,52 UA)" },
      { label: "Día", value: "24,6 horas" },
      { label: "Año", value: "687 días" },
      { label: "Lunas", value: "2 (Fobos y Deimos)" },
      { label: "Temperatura media", value: "-65 °C" },
      { label: "Gravedad", value: "3,7 m/s²" },
    ],
    funFact: "En Marte se encuentra el Monte Olimpo, un volcán de casi 22 km de altura, el más alto del sistema solar.",
    color: "#c1440e",
    color2: "#8a2e0a",
    textureType: "rocky",
    radius: 0.7,
    orbit: 20.5,
    speed: 0.1,
    rotationSpeed: 0.55,
    tilt: 0.44,
    moons: [
      { name: "Fobos", radius: 0.1, distance: 0.9, speed: 2.4, color: "#8a7f76" },
      { name: "Deimos", radius: 0.08, distance: 1.4, speed: 1.6, color: "#9a8f86" },
    ],
  },
  {
    id: "jupiter",
    kind: "planet",
    name: "Júpiter",
    emoji: "🟠",
    tagline: "El gigante gaseoso",
    description:
      "Júpiter es el planeta más grande del sistema solar: caben más de 1.300 Tierras dentro. Es una gigantesca bola de gas con bandas de nubes y la Gran Mancha Roja, una tormenta más grande que la Tierra que lleva siglos activa.",
    facts: [
      { label: "Diámetro", value: "139.820 km" },
      { label: "Distancia al Sol", value: "778,5 M km (5,2 UA)" },
      { label: "Día", value: "9,9 horas" },
      { label: "Año", value: "11,9 años" },
      { label: "Lunas", value: "95 conocidas" },
      { label: "Temperatura", value: "-110 °C" },
      { label: "Gravedad", value: "24,8 m/s²" },
    ],
    funFact: "Júpiter tiene el día más corto del sistema solar: gira tan rápido que se abomba en su ecuador.",
    color: "#c88b4a",
    color2: "#8a5a2b",
    textureType: "gas",
    radius: 2.6,
    orbit: 29,
    speed: 0.055,
    rotationSpeed: 1.1,
    tilt: 0.06,
    moons: [
      { name: "Ío", radius: 0.17, distance: 2.9, speed: 2.1, color: "#d9b23a" },
      { name: "Europa", radius: 0.15, distance: 3.4, speed: 1.7, color: "#cde0e3" },
      { name: "Ganimedes", radius: 0.22, distance: 4.0, speed: 1.3, color: "#8f7f6b" },
    ],
  },
  {
    id: "saturno",
    kind: "planet",
    name: "Saturno",
    emoji: "🪐",
    tagline: "El señor de los anillos",
    description:
      "Saturno es famoso por sus espectaculares anillos, formados por miles de millones de trozos de hielo y roca. Es tan ligero que, si existiera un océano lo bastante grande, flotaría en él. Comparte el título de gigante gaseoso con Júpiter.",
    facts: [
      { label: "Diámetro", value: "116.460 km" },
      { label: "Distancia al Sol", value: "1.430 M km (9,5 UA)" },
      { label: "Día", value: "10,7 horas" },
      { label: "Año", value: "29,5 años" },
      { label: "Lunas", value: "146 conocidas" },
      { label: "Temperatura", value: "-140 °C" },
      { label: "Gravedad", value: "10,4 m/s²" },
    ],
    funFact: "Los anillos de Saturno miden cientos de miles de kilómetros de ancho, ¡pero solo unos 10 metros de grosor!",
    color: "#e0c98a",
    color2: "#b39a5a",
    textureType: "gas",
    radius: 2.25,
    orbit: 37,
    speed: 0.042,
    rotationSpeed: 0.9,
    tilt: 0.47,
    ring: { inner: 2.9, outer: 4.6, color: "#d9c58f" },
    moons: [
      { name: "Titán", radius: 0.18, distance: 5.2, speed: 1.1, color: "#d8a13a" },
    ],
  },
  {
    id: "urano",
    kind: "planet",
    name: "Urano",
    emoji: "🔵",
    tagline: "El gigante helado inclinado",
    description:
      "Urano es un gigante de hielo que gana su color azul-verdoso al gas metano de su atmósfera. Es único por tener el eje de rotación casi tumbado: rueda de lado, posiblemente a causa de una antigua colisión gigante.",
    facts: [
      { label: "Diámetro", value: "50.724 km" },
      { label: "Distancia al Sol", value: "2.870 M km (19,2 UA)" },
      { label: "Día", value: "17,2 horas (retrógrado)" },
      { label: "Año", value: "84 años" },
      { label: "Lunas", value: "27 conocidas" },
      { label: "Temperatura", value: "-195 °C" },
      { label: "Gravedad", value: "8,7 m/s²" },
    ],
    funFact: "Urano rueda de lado: su eje está inclinado 98°, casi tumbado en el plano de su órbita.",
    color: "#7fd9d9",
    color2: "#4aa6b3",
    textureType: "ice",
    radius: 1.6,
    orbit: 45,
    speed: 0.03,
    rotationSpeed: -0.6,
    tilt: 1.7,
    moons: [
      { name: "Titania", radius: 0.12, distance: 2.8, speed: 1.3, color: "#9fb3c3" },
    ],
  },
  {
    id: "neptuno",
    kind: "planet",
    name: "Neptuno",
    emoji: "🌀",
    tagline: "El gigante de los vientos",
    description:
      "Neptuno es el planeta más lejano del Sol y uno de los más fríos. Es de color azul intenso por el metano y tiene los vientos más fuertes del sistema solar, que superan los 2.000 km/h. Fue descubierto gracias a cálculos matemáticos.",
    facts: [
      { label: "Diámetro", value: "49.244 km" },
      { label: "Distancia al Sol", value: "4.490 M km (30 UA)" },
      { label: "Día", value: "16,1 horas" },
      { label: "Año", value: "165 años" },
      { label: "Lunas", value: "14 conocidas" },
      { label: "Temperatura", value: "-200 °C" },
      { label: "Gravedad", value: "11,2 m/s²" },
    ],
    funFact: "Los vientos de Neptuno alcanzan más de 2.000 km/h, los más veloces del sistema solar.",
    color: "#3b5bdb",
    color2: "#1f2f8a",
    textureType: "ice",
    radius: 1.5,
    orbit: 53,
    speed: 0.024,
    rotationSpeed: 0.7,
    tilt: 0.49,
    moons: [
      { name: "Tritón", radius: 0.14, distance: 2.6, speed: 1.2, color: "#8a9fc3" },
    ],
  },
];

// ---------------------------------------------------------------------------
// SUN
// ---------------------------------------------------------------------------
export const SUN: Celestial = {
  id: "sol",
  kind: "sun",
  name: "El Sol",
  emoji: "☀️",
  tagline: "La estrella que nos da la vida",
  description:
    "El Sol es una estrella enana amarilla de tipo G, situada en el centro de nuestro sistema solar. Genera energía fusionando hidrógeno en helio en su núcleo. Su gravedad mantiene a los planetas en órbita y su luz hace posible la vida en la Tierra.",
  facts: [
    { label: "Diámetro", value: "1.392.700 km" },
    { label: "Tipo", value: "Enana amarilla (G2V)" },
    { label: "Edad", value: "≈ 4.600 M de años" },
    { label: "Temp. superficie", value: "≈ 5.500 °C" },
    { label: "Temp. núcleo", value: "≈ 15 M °C" },
    { label: "Masa del sistema", value: "99,86 %" },
    { label: "Distancia a la Tierra", value: "≈ 149,6 M km (1 UA)" },
  ],
  funFact: "En el Sol cabrían más de un millón de planetas Tierra. ¡Su luz tarda 8 minutos en llegar hasta nosotros!",
  color: "#ffb63d",
  color2: "#ff7b00",
  textureType: "sun",
  radius: 4.2,
  glow: 30,
  rotationSpeed: 0.04,
};

// ---------------------------------------------------------------------------
// FAMOUS STARS (in the Milky Way)
// ---------------------------------------------------------------------------
export const STARS: Celestial[] = [
  {
    id: "sirio",
    kind: "star",
    name: "Sirio",
    emoji: "⭐",
    tagline: "La estrella más brillante del cielo nocturno",
    description:
      "Sirio, en la constelación del Can Mayor, es la estrella más brillante del cielo nocturno. Es un sistema doble: Sirio A, una estrella blanca luminosa, y Sirio B, una enana blanca. Se encuentra a unos 8,6 años luz de la Tierra.",
    facts: [
      { label: "Distancia", value: "≈ 8,6 años luz" },
      { label: "Constelación", value: "Can Mayor" },
      { label: "Tipo", value: "Estrella blanca (A1V)" },
      { label: "Temperatura", value: "≈ 9.900 °C" },
      { label: "Sistema", value: "Sistema doble (A y B)" },
    ],
    funFact: "Sirio es tan brillante que los antiguos egipcios la usaban para predecir la crecida del río Nilo.",
    color: "#cfe8ff",
    color2: "#88b4e0",
    textureType: "star",
    radius: 1.2,
    position: [180, 120, -360],
    glow: 6,
  },
  {
    id: "betelgeuse",
    kind: "star",
    name: "Betelgeuse",
    emoji: "🔴",
    tagline: "La supergigante roja de Orión",
    description:
      "Betelgeuse es una supergigante roja en la constelación de Orión, unas 700 veces más grande que el Sol. Está a unos 642 años luz. Se encuentra en las últimas etapas de su vida y algún día explotará como supernova.",
    facts: [
      { label: "Distancia", value: "≈ 642 años luz" },
      { label: "Constelación", value: "Orión" },
      { label: "Tipo", value: "Supergigante roja (M1)" },
      { label: "Tamaño", value: "≈ 700 × el Sol" },
      { label: "Destino", value: "Supernova" },
    ],
    funFact: "Si Betelgeuse estuviera en lugar de nuestro Sol, ¡su superficie llegaría hasta la órbita de Júpiter!",
    color: "#ff6b4a",
    color2: "#c22e12",
    textureType: "star",
    radius: 2.4,
    position: [-260, 60, -340],
    glow: 10,
  },
  {
    id: "vega",
    kind: "star",
    name: "Vega",
    emoji: "✨",
    tagline: "La estrella brillante de la Lira",
    description:
      "Vega, en la constelación de la Lira, es una de las estrellas más brillantes y estudiadas del cielo. Fue la primera estrella de la que se tomó una fotografía. Se encuentra a unos 25 años luz y fue la estrella polar hace 12.000 años.",
    facts: [
      { label: "Distancia", value: "≈ 25 años luz" },
      { label: "Constelación", value: "Lira" },
      { label: "Tipo", value: "Estrella blanca (A0V)" },
      { label: "Temperatura", value: "≈ 9.600 °C" },
    ],
    funFact: "Vega fue la primera estrella en ser fotografiada (en 1850) y la primera en medir su distancia.",
    color: "#e0f0ff",
    color2: "#7fb4e0",
    textureType: "star",
    radius: 1.3,
    position: [240, 200, -200],
    glow: 7,
  },
  {
    id: "polaris",
    kind: "star",
    name: "Polaris",
    emoji: "🧭",
    tagline: "La estrella polar",
    description:
      "Polaris, en la Osa Menor, es la estrella que hoy marca el norte. Se encuentra casi alineada con el eje de rotación de la Tierra, por eso parece no moverse en el cielo. Es una estrella variable cefeida, a unos 433 años luz.",
    facts: [
      { label: "Distancia", value: "≈ 433 años luz" },
      { label: "Constelación", value: "Osa Menor" },
      { label: "Tipo", value: "Supergigante (F7)" },
      { label: "Rol", value: "Estrella del norte" },
    ],
    funFact: "Polaris está casi justo encima del polo norte terrestre, por eso los viajeros la usaron durante siglos para orientarse.",
    color: "#fff7d6",
    color2: "#d8c48a",
    textureType: "star",
    radius: 1.4,
    position: [0, 320, -120],
    glow: 8,
  },
  {
    id: "alfa-centauri",
    kind: "star",
    name: "Alfa Centauri",
    emoji: "🌟",
    tagline: "El sistema estelar más cercano",
    description:
      "Alfa Centauri es el sistema de estrellas más cercano a nuestro Sol, a unos 4,37 años luz. Está formado por tres cuerpos: Alfa Centauri A, B y la enana roja Próxima Centauri, que alberga un planeta en la zona habitable.",
    facts: [
      { label: "Distancia", value: "≈ 4,37 años luz" },
      { label: "Constelación", value: "Centauro" },
      { label: "Componentes", value: "3 estrellas (A, B, Próxima)" },
      { label: "Importancia", value: "Vecindario solar" },
    ],
    funFact: "Próxima Centauri, la estrella más cercana al Sol, alberga Próxima b, un planeta de tamaño similar a la Tierra.",
    color: "#ffe8b0",
    color2: "#e0a840",
    textureType: "star",
    radius: 1.5,
    position: [-320, 40, 220],
    glow: 9,
  },
  {
    id: "via-lactea",
    kind: "galaxy",
    name: "La Vía Láctea",
    emoji: "🌌",
    tagline: "Nuestra galaxia, el hogar del sistema solar",
    description:
      "La Vía Láctea es la galaxia espiral barrada donde vive nuestro sistema solar. Cada estrella que ves en el cielo nocturno pertenece a ella. En su centro hay un agujero negro supermasivo llamado Sagitario A*.",
    facts: [
      { label: "Tipo", value: "Galaxia espiral barrada" },
      { label: "Diámetro", value: "≈ 100.000 años luz" },
      { label: "Estrellas", value: "100–400 mil millones" },
      { label: "Edad", value: "≈ 13.600 M de años" },
      { label: "Centro", value: "Agujero negro Sgr A*" },
      { label: "Nuestra posición", value: "Brazo de Orión" },
    ],
    funFact: "El Sol tarda unos 230 millones de años en dar una vuelta completa alrededor del centro de la Vía Láctea.",
    color: "#7c93c9",
    color2: "#3a4a7a",
    textureType: "star",
    radius: 0,
    position: [0, 0, 0],
  },
];

export const ALL_BODIES: Celestial[] = [SUN, ...PLANETS, ...STARS];

export function findBody(id: string): Celestial | undefined {
  return ALL_BODIES.find((b) => b.id === id);
}

// ---------------------------------------------------------------------------
// QUIZ
// ---------------------------------------------------------------------------
export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  hint: string;
}

export const QUIZ: QuizQuestion[] = [
  {
    q: "¿Cuál es el planeta más grande del sistema solar?",
    options: ["Saturno", "Júpiter", "Neptuno"],
    answer: 1,
    hint: "Es una gigantesca bola de gas con una Gran Mancha Roja.",
  },
  {
    q: "¿Qué planeta es conocido como el «Planeta Rojo»?",
    options: ["Venus", "Marte", "Mercurio"],
    answer: 1,
    hint: "Debe su color al óxido de hierro de su superficie.",
  },
  {
    q: "¿Cuál es el planeta más cercano al Sol?",
    options: ["Venus", "Tierra", "Mercurio"],
    answer: 2,
    hint: "El más pequeño y veloz, sin atmósfera que lo proteja.",
  },
  {
    q: "¿Qué planeta tiene los anillos más espectaculares?",
    options: ["Saturno", "Urano", "Júpiter"],
    answer: 0,
    hint: "Sus anillos miden cientos de miles de kilómetros pero solo metros de grosor.",
  },
  {
    q: "¿Cuál es el planeta más caliente del sistema solar?",
    options: ["Mercurio", "Venus", "Marte"],
    answer: 1,
    hint: "Su efecto invernadero lo mantiene a casi 465 °C.",
  },
  {
    q: "¿Qué planeta tiene el día más corto?",
    options: ["Tierra", "Mercurio", "Júpiter"],
    answer: 2,
    hint: "Gira tan rápido que su día dura menos de 10 horas.",
  },
  {
    q: "¿Cuántas lunas orbita directamente la Tierra?",
    options: ["1", "2", "0"],
    answer: 0,
    hint: "La que vemos brillar en el cielo nocturno.",
  },
  {
    q: "¿Cuál es la estrella más cercana a la Tierra?",
    options: ["Sirio", "El Sol", "Proxima Centauri"],
    answer: 1,
    hint: "Está en el centro de nuestro sistema solar.",
  },
  {
    q: "¿Qué estrella es la más brillante del cielo nocturno?",
    options: ["Vega", "Polaris", "Sirio"],
    answer: 2,
    hint: "Está en la constelación del Can Mayor.",
  },
  {
    q: "¿En qué galaxia se encuentra nuestro sistema solar?",
    options: ["Andrómeda", "La Vía Láctea", "Triángulo"],
    answer: 1,
    hint: "Es una galaxia espiral barrada con un agujero negro central.",
  },
];
