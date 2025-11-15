import { useMemo, useState } from "react";

type QuizStep = "intro" | "self" | "friendIntro" | "friendQuiz" | "results";

type Question = {
  id: number;
  categoria: string;
  texto: string;
  opciones: string[];
};

type AnswerMap = Record<number, string>;

type FriendResult = {
  nombre: string;
  respuestas: AnswerMap;
  puntuacion: number;
  compatibilidad: number;
  nivel: string;
};

const preguntas: Question[] = [
  {
    id: 1,
    categoria: "Playlist del mood",
    texto: "¿Cuál es tu himno personal de hoy?",
    opciones: [
      "Pop brillante que prende todo",
      "Indie chill para mirar al techo",
      "Perreo intenso sin remordimientos",
      "Balada dramática para sentir cosas"
    ],
  },
  {
    id: 2,
    categoria: "Snack energético",
    texto: "¿Qué estás munchando mientras conquistas el día?",
    opciones: [
      "Matcha latte con leche de avena",
      "Papitas con mucho limón",
      "Chocolate oscuro porque classy",
      "Algo misterioso de la heladera"
    ],
  },
  {
    id: 3,
    categoria: "Emoji aura",
    texto: "¿Qué emoji vibra con tu aura actual?",
    opciones: ["✨", "😴", "🔥", "🤠"],
  },
  {
    id: 4,
    categoria: "Plot twist del día",
    texto: "¿Qué trama secreta estás esperando?",
    opciones: [
      "Mensaje inesperado",
      "Invitación espontánea",
      "Dinero que no sabías que tenías",
      "Descubrir serie nueva para obsesionarte"
    ],
  },
  {
    id: 5,
    categoria: "Look & Feel",
    texto: "¿Cuál es tu fit de hoy?",
    opciones: [
      "Athleisure impecable",
      "Vintage mezclado sin miedo",
      "Traje power boss",
      "Pijama glorificado (porque sí)"
    ],
  },
  {
    id: 6,
    categoria: "Mantra personal",
    texto: "¿Qué frase te repites todo el tiempo?",
    opciones: [
      "Hoy brillo porque me da la gana",
      "Respiro, cuento hasta cinco y sigo",
      "Si lo puedo imaginar, lo puedo lograr",
      "Caos con glitter es igual a magia"
    ],
  },
  {
    id: 7,
    categoria: "Side quest",
    texto: "¿Cuál es tu misión secundaria del día?",
    opciones: [
      "Aprender algo random en YouTube",
      "Mandar meme personalizado",
      "Ordenar ese rincón olvidado",
      "Tomar sol cinco minutos"
    ],
  },
  {
    id: 8,
    categoria: "Dosis de drama",
    texto: "¿Qué nivel de drama manejas hoy?",
    opciones: [
      "Novela venezolana",
      "Serie teen dosmilera",
      "Documental serio",
      "Sitcom sin risas grabadas"
    ],
  },
  {
    id: 9,
    categoria: "Final boss",
    texto: "¿Qué podría arruinarte la vibra si no lo controlas?",
    opciones: [
      "Notificaciones sin contestar",
      "Transporte que se retrasa",
      "Gente sin energía",
      "Quedarte sin batería en el celu"
    ],
  },
];

const totalPreguntas = preguntas.length;

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
  const [paso, setPaso] = useState<QuizStep>("intro");
  const [nombreJugador, setNombreJugador] = useState("");
  const [respuestasJugador, setRespuestasJugador] = useState<AnswerMap>({});
  const [nombreAmigx, setNombreAmigx] = useState("");
  const [respuestasAmigx, setRespuestasAmigx] = useState<AnswerMap>({});
  const [rankingAmigxs, setRankingAmigxs] = useState<FriendResult[]>([]);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const nombreJugadorDisplay = useMemo(
    () => (nombreJugador.trim().length > 0 ? nombreJugador.trim() : "Personaje del Día™"),
    [nombreJugador]
  );

  const manejarRespuestaJugador = (preguntaId: number, opcion: string) => {
    setRespuestasJugador((prev) => ({ ...prev, [preguntaId]: opcion }));
  };

  const manejarRespuestaAmigx = (preguntaId: number, opcion: string) => {
    setRespuestasAmigx((prev) => ({ ...prev, [preguntaId]: opcion }));
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
    const todasRespondidas = preguntas.every((pregunta) => respuestasJugador[pregunta.id]);
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
    const todasRespondidas = preguntas.every((pregunta) => respuestasAmigx[pregunta.id]);
    if (!todasRespondidas) {
      setMensaje("Que conteste todo, no vale soplar respuestas.");
      return;
    }

    const puntuacion = preguntas.reduce((acumulado, pregunta) => {
      return acumulado + (respuestasJugador[pregunta.id] === respuestasAmigx[pregunta.id] ? 1 : 0);
    }, 0);

    const compatibilidad = Math.round((puntuacion / totalPreguntas) * 100);
    const nivel = calcularNivelVibes(puntuacion);

    const nuevoResultado: FriendResult = {
      nombre: nombreAmigx.trim(),
      respuestas: { ...respuestasAmigx },
      puntuacion,
      compatibilidad,
      nivel,
    };

    setRankingAmigxs((prev) => {
      const actualizado = [...prev, nuevoResultado];
      return actualizado.sort((a, b) => b.puntuacion - a.puntuacion || b.compatibilidad - a.compatibilidad);
    });

    setMensaje(`${nombreAmigx.trim()} logró ${puntuacion}/${totalPreguntas} · ${nivel}`);
    setNombreAmigx("");
    setRespuestasAmigx({});
    setPaso("results");
  };

  const reiniciarParaNuevoAmigx = () => {
    setMensaje(null);
    setPaso("friendIntro");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-slate-900 py-12 px-4 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl bg-white/95 shadow-2xl backdrop-blur">
          <div className="bg-gradient-to-r from-fuchsia-600 to-amber-400 p-8 text-center text-white">
            <h1 className="text-3xl font-black uppercase tracking-widest sm:text-4xl">
              VIBES TEST™
            </h1>
            <p className="mt-3 text-base font-medium sm:text-lg">
              Adivina la vibra del {""}
              <span className="font-semibold">{nombreJugadorDisplay}</span> y gana el título máximo.
            </p>
          </div>

          <div className="space-y-10 p-8 text-slate-900 sm:p-12">
            <section className="rounded-2xl border border-purple-200 bg-purple-50/60 p-6">
              <h2 className="text-xl font-semibold text-purple-700">Personaje del Día™</h2>
              <p className="mt-2 text-sm text-purple-700/80">
                {""}
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
                  {preguntas.map((pregunta) => (
                    <div key={pregunta.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                        {pregunta.categoria}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{pregunta.texto}</h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {pregunta.opciones.map((opcion) => (
                          <label
                            key={opcion}
                            className={`flex cursor-pointer items-center rounded-xl border px-4 py-3 text-sm font-medium transition ${
                              respuestasJugador[pregunta.id] === opcion
                                ? "border-purple-500 bg-purple-100 text-purple-700 shadow"
                                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-purple-300 hover:bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`jugador-${pregunta.id}`}
                              className="hidden"
                              value={opcion}
                              checked={respuestasJugador[pregunta.id] === opcion}
                              onChange={() => manejarRespuestaJugador(pregunta.id, opcion)}
                            />
                            {opcion}
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
                  {preguntas.map((pregunta) => (
                    <div key={pregunta.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-pink-500">
                        {pregunta.categoria}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{pregunta.texto}</h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {pregunta.opciones.map((opcion) => (
                          <label
                            key={opcion}
                            className={`flex cursor-pointer items-center rounded-xl border px-4 py-3 text-sm font-medium transition ${
                              respuestasAmigx[pregunta.id] === opcion
                                ? "border-amber-500 bg-amber-100 text-amber-800 shadow"
                                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-300 hover:bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`amigx-${pregunta.id}`}
                              className="hidden"
                              value={opcion}
                              checked={respuestasAmigx[pregunta.id] === opcion}
                              onChange={() => manejarRespuestaAmigx(pregunta.id, opcion)}
                            />
                            {opcion}
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
                        className={`flex items-center justify-between rounded-2xl border p-6 shadow-sm transition ${
                          indice === 0
                            ? "border-purple-500 bg-gradient-to-r from-purple-50 via-white to-pink-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
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
                    onClick={() => {
                      setPaso("intro");
                      setNombreJugador("");
                      setRespuestasJugador({});
                      setNombreAmigx("");
                      setRespuestasAmigx({});
                      setRankingAmigxs([]);
                      setMensaje("Vuelta a empezar. Nuevas vibes, ¿quién diría?");
                    }}
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
