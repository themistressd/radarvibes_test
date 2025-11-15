import { useMemo, useState } from "react";
import { VIBES_QUESTION_LIBRARY } from "../data/vibesQuestionLibrary";
import type { VibesMood, VibesQuestion } from "../vibes/types";

type QuizStep = "intro" | "self" | "friendIntro" | "friendQuiz" | "results";

type AnswerMap = Record<string, string>;

type MoodScoreMap = Record<VibesMood, number>;

type FriendResult = {
  nombre: string;
  respuestas: AnswerMap;
  puntuacion: number;
  compatibilidad: number;
  nivel: string;
  moodMatches: MoodScoreMap;
};

const QUESTION_LIMIT = 9;

const VIBES_MOODS: VibesMood[] = ["CHILL", "SPICY", "DLUXE", "URBAN", "ARTSY"];

const DEFAULT_PACK: VibesQuestion["packId"] = "CORE_VIBES";
const DEFAULT_SPICY_LEVEL: VibesQuestion["spicyLevel"] = "SOFT";
const CATEGORY_ORDER: VibesQuestion["category"][] = [
  "VIBE_ESENCIA",
  "VIBE_SOCIAL",
  "VIBE_DRAMA",
  "VIBE_SECRETA",
  "VIBE_CAOS",
];

const shuffleArray = <T,>(items: T[]): T[] => {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
  }
  return clone;
};

const selectDefaultQuestions = (): VibesQuestion[] => {
  const base = VIBES_QUESTION_LIBRARY.filter((pregunta) => {
    const isEnabled = pregunta.isEnabled ?? true;
    return (
      pregunta.packId === DEFAULT_PACK &&
      pregunta.spicyLevel === DEFAULT_SPICY_LEVEL &&
      isEnabled
    );
  });

  const dataset = base.length >= QUESTION_LIMIT ? base : VIBES_QUESTION_LIBRARY;
  const shuffled = shuffleArray(dataset);

  const grouped = new Map<VibesQuestion["category"], VibesQuestion[]>();
  shuffled.forEach((question) => {
    const existing = grouped.get(question.category) ?? [];
    existing.push(question);
    grouped.set(question.category, existing);
  });

  const selected: VibesQuestion[] = [];
  const usedIds = new Set<string>();

  CATEGORY_ORDER.forEach((category) => {
    const bucket = grouped.get(category);
    if (!bucket?.length) {
      return;
    }
    const choice = bucket.shift()!;
    if (!usedIds.has(choice.id)) {
      selected.push(choice);
      usedIds.add(choice.id);
    }
  });

  for (const question of shuffled) {
    if (selected.length >= QUESTION_LIMIT) {
      break;
    }
    if (usedIds.has(question.id)) {
      continue;
    }
    selected.push(question);
    usedIds.add(question.id);
  }

  return selected.slice(0, QUESTION_LIMIT);
};

const createMoodScoreMap = (): MoodScoreMap =>
  VIBES_MOODS.reduce((acc, mood) => {
    acc[mood] = 0;
    return acc;
  }, {} as MoodScoreMap);

const MOOD_STYLES: Record<
  VibesMood,
  { label: string; emoji: string; chipClass: string; percentClass: string }
> = {
  CHILL: {
    label: "Chill",
    emoji: "🌊",
    chipClass: "border-teal-200 bg-teal-50 text-teal-900",
    percentClass: "text-teal-600",
  },
  SPICY: {
    label: "Spicy",
    emoji: "🌶️",
    chipClass: "border-red-200 bg-red-50 text-red-900",
    percentClass: "text-red-600",
  },
  DLUXE: {
    label: "DLuxe",
    emoji: "💎",
    chipClass: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-900",
    percentClass: "text-fuchsia-600",
  },
  URBAN: {
    label: "Urban",
    emoji: "🚦",
    chipClass: "border-emerald-200 bg-emerald-50 text-emerald-900",
    percentClass: "text-emerald-600",
  },
  ARTSY: {
    label: "Artsy",
    emoji: "🎨",
    chipClass: "border-indigo-200 bg-indigo-50 text-indigo-900",
    percentClass: "text-indigo-600",
  },
};

function calcularNivelVibes(puntuacion: number): string {
  if (puntuacion >= 8) {
    return "VIBE SUPREMA 💫";
  }
  if (puntuacion >= 6) {
    return "VIBE TELEPÁTICA 🔮";
  }
  if (puntuacion >= 4) {
    return "VIBE SOSPECHOSA 👀";
  }
  return "VIBE INVENTADA 🤡";
}

export default function VibesTestLanding(): JSX.Element {
  const [preguntasDelJuego, setPreguntasDelJuego] = useState<VibesQuestion[]>(() =>
    selectDefaultQuestions()
  );
  const [paso, setPaso] = useState<QuizStep>("intro");
  const [nombreJugador, setNombreJugador] = useState("");
  const [respuestasJugador, setRespuestasJugador] = useState<AnswerMap>({});
  const [nombreAmigx, setNombreAmigx] = useState("");
  const [respuestasAmigx, setRespuestasAmigx] = useState<AnswerMap>({});
  const [rankingAmigxs, setRankingAmigxs] = useState<FriendResult[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const totalPreguntas = preguntasDelJuego.length || 1;
  const moodTotals = useMemo(() => {
    const totals = createMoodScoreMap();
    preguntasDelJuego.forEach((pregunta) => {
      pregunta.moods?.forEach((mood) => {
        totals[mood] += 1;
      });
    });
    return totals;
  }, [preguntasDelJuego]);

  const nombreJugadorDisplay = useMemo(
    () => (nombreJugador.trim().length > 0 ? nombreJugador.trim() : "Personaje del Día™"),
    [nombreJugador]
  );

  const manejarRespuestaJugador = (preguntaId: string, opcionId: string) => {
    setRespuestasJugador((prev) => ({ ...prev, [preguntaId]: opcionId }));
  };

  const manejarRespuestaAmigx = (preguntaId: string, opcionId: string) => {
    setRespuestasAmigx((prev) => ({ ...prev, [preguntaId]: opcionId }));
  };

  const iniciarTestPropio = () => {
    if (!nombreJugador.trim()) {
      setMensaje("Ponle un nombre fabuloso al Personaje del Día™ ✨");
      return;
    }
    setMensaje("¡Vamos! Define tus vibes en nueve preguntas.");
    setPaso("self");
  };

  const enviarTestPropio = () => {
    const todasRespondidas = preguntasDelJuego.every(
      (pregunta) => respuestasJugador[pregunta.id]
    );
    if (!todasRespondidas) {
      setMensaje("Responde todas las preguntas para sellar tus vibes.");
      return;
    }
    setMensaje("¡Listo! Ahora desafía a tus amigxs.");
    setPaso("friendIntro");
  };

  const iniciarTestAmigx = () => {
    if (!nombreAmigx.trim()) {
      setMensaje("Necesitamos el nombre del retador o retadora 💅");
      return;
    }
    setMensaje(null);
    setRespuestasAmigx({});
    setPaso("friendQuiz");
  };

  const enviarTestAmigx = () => {
    const todasRespondidas = preguntasDelJuego.every(
      (pregunta) => respuestasAmigx[pregunta.id]
    );
    if (!todasRespondidas) {
      setMensaje("Que conteste todo, no vale soplar respuestas.");
      return;
    }

    const moodMatches = createMoodScoreMap();
    let puntuacion = 0;

    preguntasDelJuego.forEach((pregunta) => {
      const acierto = respuestasJugador[pregunta.id] === respuestasAmigx[pregunta.id];
      if (acierto) {
        puntuacion += 1;
        pregunta.moods?.forEach((mood) => {
          moodMatches[mood] += 1;
        });
      }
    });

    const compatibilidad = Math.round((puntuacion / totalPreguntas) * 100);
    const nivel = calcularNivelVibes(puntuacion);

    const nuevoResultado: FriendResult = {
      nombre: nombreAmigx.trim(),
      respuestas: { ...respuestasAmigx },
      puntuacion,
      compatibilidad,
      nivel,
      moodMatches,
    };

    setRankingAmigxs((prev) => {
      const actualizado = [...prev, nuevoResultado];
      return actualizado.sort(
        (a, b) => b.puntuacion - a.puntuacion || b.compatibilidad - a.compatibilidad
      );
    });

    const sortedMoods = [...VIBES_MOODS].sort((a, b) => moodMatches[b] - moodMatches[a]);
    const moodHighlight = sortedMoods.find(
      (mood) => moodTotals[mood] > 0 && moodMatches[mood] > 0
    );
    const moodText = moodHighlight
      ? ` · ${MOOD_STYLES[moodHighlight].emoji} Dominio ${MOOD_STYLES[moodHighlight].label}`
      : "";

    setMensaje(`${nombreAmigx.trim()} logró ${puntuacion}/${totalPreguntas} · ${nivel}${moodText}`);
    setNombreAmigx("");
    setRespuestasAmigx({});
    setPaso("results");
  };

  const reiniciarParaNuevoAmigx = () => {
    setMensaje(null);
    setNombreAmigx("");
    setRespuestasAmigx({});
    setPaso("friendIntro");
  };

  const reiniciarJuego = () => {
    setPreguntasDelJuego(selectDefaultQuestions());
    setPaso("intro");
    setNombreJugador("");
    setRespuestasJugador({});
    setNombreAmigx("");
    setRespuestasAmigx({});
    setRankingAmigxs([]);
    setMensaje("Vuelta a empezar. Nuevas vibes, ¿quién diría?");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-slate-900 py-12 px-4 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl bg-white/95 shadow-2xl backdrop-blur">
          <div className="bg-gradient-to-r from-fuchsia-600 to-amber-400 p-8 text-center text-white">
            <h1 className="text-3xl font-black uppercase tracking-widest sm:text-4xl">VIBES TEST™</h1>
            <p className="mt-3 text-base font-medium sm:text-lg">
              Adivina la vibra del <span className="font-semibold">{nombreJugadorDisplay}</span> y gana el
              título máximo.
            </p>
          </div>

          <div className="space-y-10 p-8 text-slate-900 sm:p-12">
            <section className="rounded-2xl border border-purple-200 bg-purple-50/60 p-6">
              <h2 className="text-xl font-semibold text-purple-700">Personaje del Día™</h2>
              <p className="mt-2 text-sm text-purple-700/80">
                {nombreJugador.trim()
                  ? `${nombreJugador.trim()} ya dejó sus respuestas secretas.`
                  : "Primero registrá quién está marcando la vibra de hoy."}
              </p>
            </section>

            {mensaje && (
              <div className="rounded-xl border border-amber-300 bg-amber-100/80 p-4 text-amber-900">
                <p className="text-sm font-semibold uppercase tracking-wide">Mensaje del oráculo:</p>
                <p className="mt-1 text-base">{mensaje}</p>
              </div>
            )}

            {paso === "intro" && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700" htmlFor="nombre-jugador">
                    Nombre del Personaje del Día™
                  </label>
                  <input
                    id="nombre-jugador"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base shadow focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    type="text"
                    placeholder="Ej: Flor, Kim, El Beki"
                    value={nombreJugador}
                    onChange={(event) => setNombreJugador(event.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={iniciarTestPropio}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:from-purple-500 hover:to-pink-400"
                >
                  Empezar mi test secreto
                </button>
              </div>
            )}

            {paso === "self" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Tus respuestas confidenciales</h2>
                <p className="text-sm text-slate-600">
                  Nadie puede ver esto (todavía). Elegí la opción que represente mejor tu vibra actual.
                </p>
                <div className="space-y-6">
                  {preguntasDelJuego.map((pregunta) => (
                    <div key={pregunta.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                        {pregunta.categoryLabel}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{pregunta.text}</h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {pregunta.options.map((opcion) => (
                          <label
                            key={`${pregunta.id}-${opcion.id}`}
                            className={`flex cursor-pointer items-center rounded-xl border px-4 py-3 text-sm font-medium transition ${
                              respuestasJugador[pregunta.id] === opcion.id
                                ? "border-purple-500 bg-purple-100 text-purple-700 shadow"
                                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-purple-300 hover:bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`jugador-${pregunta.id}`}
                              className="hidden"
                              value={opcion.id}
                              checked={respuestasJugador[pregunta.id] === opcion.id}
                              onChange={() => manejarRespuestaJugador(pregunta.id, opcion.id)}
                            />
                            {opcion.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={enviarTestPropio}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:from-purple-500 hover:to-indigo-400"
                >
                  Guardar mis vibes secretas
                </button>
              </div>
            )}

            {paso === "friendIntro" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">¿Quién se anima a retar tus vibes?</h2>
                <p className="text-sm text-slate-600">
                  Presentá a la persona que intentará adivinar las respuestas de {nombreJugadorDisplay}.
                </p>
                <div>
                  <label className="text-sm font-semibold text-slate-700" htmlFor="nombre-amigx">
                    Nombre del retador/a
                  </label>
                  <input
                    id="nombre-amigx"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base shadow focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    type="text"
                    placeholder="Ej: Agus, Lu, Superfan #1"
                    value={nombreAmigx}
                    onChange={(event) => setNombreAmigx(event.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={iniciarTestAmigx}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:from-amber-300 hover:to-pink-400"
                >
                  ¡Darle el test ahora!
                </button>
              </div>
            )}

            {paso === "friendQuiz" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {nombreAmigx.trim() || "Tu amigx"} vs. las vibes de {nombreJugadorDisplay}
                </h2>
                <p className="text-sm text-slate-600">
                  Elegí lo que creas que respondió el {nombreJugadorDisplay}. No hay presión, solo gloria.
                </p>
                <div className="space-y-6">
                  {preguntasDelJuego.map((pregunta) => (
                    <div key={pregunta.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-pink-500">
                        {pregunta.categoryLabel}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{pregunta.text}</h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {pregunta.options.map((opcion) => (
                          <label
                            key={`${pregunta.id}-${opcion.id}`}
                            className={`flex cursor-pointer items-center rounded-xl border px-4 py-3 text-sm font-medium transition ${
                              respuestasAmigx[pregunta.id] === opcion.id
                                ? "border-amber-500 bg-amber-100 text-amber-800 shadow"
                                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-300 hover:bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`amigx-${pregunta.id}`}
                              className="hidden"
                              value={opcion.id}
                              checked={respuestasAmigx[pregunta.id] === opcion.id}
                              onChange={() => manejarRespuestaAmigx(pregunta.id, opcion.id)}
                            />
                            {opcion.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={enviarTestAmigx}
                  className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:from-pink-400 hover:to-red-400"
                >
                  Ver cuántas vibes acertó
                </button>
              </div>
            )}

            {paso === "results" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Ranking de amigxs clarividentes</h2>
                <p className="text-sm text-slate-600">
                  Cada retador suma puntos por cada respuesta que adivinó. ¿Quién domina las vibes de {nombreJugadorDisplay}?
                </p>
                <div className="space-y-4">
                  {rankingAmigxs.length === 0 ? (
                    <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600">
                      Todavía no hay retadorxs. Invitá a alguien a intentar.
                    </p>
                  ) : (
                    rankingAmigxs.map((resultado, indice) => (
                      <div
                        key={`${resultado.nombre}-${indice}`}
                        className={`rounded-2xl border p-6 shadow-sm transition ${
                          indice === 0
                            ? "border-purple-500 bg-gradient-to-r from-purple-50 via-white to-pink-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                              #{indice + 1} • {resultado.nivel}
                            </p>
                            <h3 className="text-xl font-bold text-slate-900">{resultado.nombre}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-slate-600">Puntuación</p>
                            <p className="text-lg font-bold text-slate-900">
                              {resultado.puntuacion}/{totalPreguntas}
                            </p>
                            <p className="text-xs font-medium text-slate-500">
                              Compatibilidad {resultado.compatibilidad}%
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {VIBES_MOODS.map((mood) => {
                            const totalMood = moodTotals[mood];
                            if (!totalMood) {
                              return null;
                            }
                            const percent = Math.round((resultado.moodMatches[mood] / totalMood) * 100);
                            const { chipClass, emoji, label, percentClass } = MOOD_STYLES[mood];
                            return (
                              <div
                                key={`${resultado.nombre}-${mood}`}
                                className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${chipClass}`}
                              >
                                <span className="flex items-center gap-1">
                                  <span>{emoji}</span>
                                  {label}
                                </span>
                                <span className={percentClass}>{percent}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={reiniciarParaNuevoAmigx}
                    className="flex-1 rounded-xl border border-purple-400 bg-white px-6 py-3 text-base font-semibold text-purple-600 shadow transition hover:border-purple-500 hover:text-purple-700"
                  >
                    Invitar a otra persona
                  </button>
                  <button
                    type="button"
                    onClick={reiniciarJuego}
                    className="flex-1 rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow transition hover:bg-slate-800"
                  >
                    Reiniciar todo el juego
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
