import { useEffect, useMemo, useState } from "react";
import {
  calculateFriendResult,
  getCoreQuestions,
  DEFAULT_QUESTION_COUNT,
} from "../vibes/gameUtils";
import { AnswersMap, MoodStats, VibesMood, VibesQuestion } from "../vibes/types";

type QuizStep = "intro" | "self" | "friendIntro" | "friendQuiz" | "results";

type FriendResult = {
  name: string;
  answers: AnswersMap;
  score: number;
  level: string;
  moodStats: MoodStats; // % de vibes ya normalizados
};

const moodLabels: Record<VibesMood, string> = {
  CHILL: "Chill",
  SPICY: "Spicy",
  DLUXE: "DLuxe",
  URBAN: "Urban",
  ARTSY: "Artsy",
};

function getTopMoods(moodStats: MoodStats, max: number = 2): VibesMood[] {
  const entries = Object.entries(moodStats) as [VibesMood, number][];
  const sorted = entries.sort((a, b) => b[1] - a[1]);
  return sorted.filter(([, value]) => value > 0).slice(0, max).map(([m]) => m);
}

const moodAccent: Record<VibesMood, string> = {
  CHILL: "bg-teal-100 text-teal-800 border-teal-200",
  SPICY: "bg-red-100 text-red-800 border-red-200",
  DLUXE: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  URBAN: "bg-emerald-100 text-emerald-800 border-emerald-200",
  ARTSY: "bg-indigo-100 text-indigo-800 border-indigo-200",
};

const levelCopy: Record<string, string> = {
  "VIBE SUPREMA 💫": "Alma gemela vibratoria.",
  "VIBE TELEPÁTICA 🔮": "Nos olemos el drama a kilómetros.",
  "VIBE SOSPECHOSA 👀": "Te tengo calade, pero echas cuento.",
  "VIBE INVENTADA 🤡": "Cari, ¿tú me conoces o te lo estás inventando?",
};

export default function VibesTestLanding(): JSX.Element {
  const [questions, setQuestions] = useState<VibesQuestion[]>([]);
  const [step, setStep] = useState<QuizStep>("intro");
  const [playerName, setPlayerName] = useState("");
  const [selfAnswers, setSelfAnswers] = useState<AnswersMap>({});
  const [friendName, setFriendName] = useState("");
  const [currentFriendAnswers, setCurrentFriendAnswers] = useState<AnswersMap>({});
  const [friendResults, setFriendResults] = useState<FriendResult[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setQuestions(getCoreQuestions(DEFAULT_QUESTION_COUNT));
  }, []);

  const totalQuestions = questions.length || DEFAULT_QUESTION_COUNT;

  const playerDisplay = useMemo(
    () => (playerName.trim().length > 0 ? playerName.trim() : "Personaje del Día™"),
    [playerName]
  );

  const handleSelfAnswer = (questionId: string, optionIndex: number) => {
    setSelfAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleFriendAnswer = (questionId: string, optionIndex: number) => {
    setCurrentFriendAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const startSelfQuiz = () => {
    if (!playerName.trim()) {
      setMessage("Ponle un nombre fabuloso a tu personaje principal.");
      return;
    }
    if (questions.length === 0) {
      setQuestions(getCoreQuestions(DEFAULT_QUESTION_COUNT));
    }
    setMessage("Cámara on. Define tus vibes en tiempo récord.");
    setStep("self");
  };

  const submitSelfQuiz = () => {
    const allAnswered = questions.every((q) => selfAnswers[q.id] !== undefined);
    if (!allAnswered) {
      setMessage("Responde todo para sellar tu vibra oficial del día.");
      return;
    }
    setMessage(
      "Confesionario cerrado. Ahora veamos qué tan bien te leen tus amigxs en este reality camp."
    );
    setStep("friendIntro");
  };

  const startFriendQuiz = () => {
    if (!friendName.trim()) {
      setMessage("Necesitamos el nombre del retador estrella del camp ✨");
      return;
    }
    setMessage(null);
    setCurrentFriendAnswers({});
    setStep("friendQuiz");
  };

  const submitFriendQuiz = () => {
    const allAnswered = questions.every((q) => currentFriendAnswers[q.id] !== undefined);
    if (!allAnswered) {
      setMessage("Que conteste todo, aquí no hay comodines del público.");
      return;
    }

    const { score, level, moodStats } = calculateFriendResult(
      questions,
      selfAnswers,
      currentFriendAnswers
    );

    const newResult: FriendResult = {
      name: friendName.trim(),
      answers: { ...currentFriendAnswers },
      score,
      level,
      moodStats,
    };

    setFriendResults((prev) => {
      const next = [...prev, newResult];
      return next.sort((a, b) => b.score - a.score);
    });

    const compatibility = Math.round((score / totalQuestions) * 100);
    setMessage(
      `${friendName.trim()} quedó en modo ${level} con ${score}/${totalQuestions} aciertos (${compatibility}%).`
    );
    setFriendName("");
    setCurrentFriendAnswers({});
    setStep("results");
  };

  const resetForNewFriend = () => {
    setMessage(null);
    setFriendName("");
    setCurrentFriendAnswers({});
    setStep("friendIntro");
  };

  const resetGame = () => {
    setQuestions(getCoreQuestions(DEFAULT_QUESTION_COUNT));
    setStep("intro");
    setPlayerName("");
    setSelfAnswers({});
    setFriendName("");
    setCurrentFriendAnswers({});
    setFriendResults([]);
    setMessage("Nueva temporada desbloqueada. Cambiamos decorado y vibes.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-slate-900 py-12 px-4 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl bg-white/95 shadow-2xl backdrop-blur">
          <div className="bg-gradient-to-r from-fuchsia-600 to-amber-400 p-8 text-center text-white">
            <h1 className="text-3xl font-black uppercase tracking-widest sm:text-4xl">
              VIBES TEST™ Reality Camp Edition
            </h1>
            <p className="mt-3 text-base font-medium sm:text-lg">
              Hoy descubrimos quién te conoce de verdad y quién se lo está inventando fuerte.
            </p>
          </div>

          <div className="space-y-10 p-8 text-slate-900 sm:p-12">
            <section className="rounded-2xl border border-purple-200 bg-purple-50/60 p-6">
              <h2 className="text-xl font-semibold text-purple-700">Personaje del día</h2>
              <p className="mt-2 text-sm text-purple-700/80">
                {playerName.trim()
                  ? `${playerName.trim()} ya dejó sus respuestas secretas en el confesionario.`
                  : "Ponle nombre al alma protagonista de esta gala camp y empieza el juego."}
              </p>
            </section>

            {message && (
              <div className="rounded-xl border border-amber-300 bg-amber-100/80 p-4 text-amber-900">
                <p className="text-sm font-semibold uppercase tracking-wide">Mensaje del backstage:</p>
                <p className="mt-1 text-base">{message}</p>
              </div>
            )}

            {step === "intro" && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700" htmlFor="player-name">
                    Nombre del personaje
                  </label>
                  <input
                    id="player-name"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base shadow focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    type="text"
                    placeholder="Ej: Flor, Kim, El Beki"
                    value={playerName}
                    onChange={(event) => setPlayerName(event.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={startSelfQuiz}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:from-purple-500 hover:to-pink-400"
                >
                  Entrar al confesionario secreto
                </button>
              </div>
            )}

            {step === "self" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Tus respuestas confidenciales</h2>
                <p className="text-sm text-slate-600">
                  Contesta en primera persona. Esto es Telecinco drama + Disney Channel camp, pero solo tú ves las respuestas.
                </p>
                <div className="space-y-6">
                  {questions.map((question) => (
                    <div key={question.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                        {question.categoryLabel}
                      </p>
                      {question.scene && (
                        <p className="mt-2 text-xs italic text-purple-500">{question.scene}</p>
                      )}
                      <h3 className="mt-3 text-lg font-semibold text-slate-900">{question.text}</h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {question.options.map((option, index) => (
                          <label
                            key={`${question.id}-${option.id}`}
                            className={`flex cursor-pointer items-center rounded-xl border px-4 py-3 text-sm font-medium transition ${
                              selfAnswers[question.id] === index
                                ? "border-purple-500 bg-purple-100 text-purple-700 shadow"
                                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-purple-300 hover:bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`self-${question.id}`}
                              className="hidden"
                              value={option.id}
                              checked={selfAnswers[question.id] === index}
                              onChange={() => handleSelfAnswer(question.id, index)}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={submitSelfQuiz}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:from-purple-500 hover:to-indigo-400"
                >
                  Guardar mis vibes secretas
                </button>
              </div>
            )}

            {step === "friendIntro" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Casting de retadorxs</h2>
                <p className="text-sm text-slate-600">
                  Presenta a quien intente adivinar las respuestas de {playerDisplay}. Reality vibes activas.
                </p>
                <div>
                  <label className="text-sm font-semibold text-slate-700" htmlFor="friend-name">
                    Nombre del retador/a
                  </label>
                  <input
                    id="friend-name"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base shadow focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    type="text"
                    placeholder="Ej: Agus, Lu, Superfan #1"
                    value={friendName}
                    onChange={(event) => setFriendName(event.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={startFriendQuiz}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:from-amber-300 hover:to-pink-400"
                >
                  Lanzar el test al público
                </button>
              </div>
            )}

            {step === "friendQuiz" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {friendName.trim() || "Tu amigx"} vs. las vibes de {playerDisplay}
                </h2>
                <p className="text-sm text-slate-600">
                  Adivina qué respondió {playerDisplay}. Aquí se separan las almas gemelas de las vibes inventadas.
                </p>
                <div className="space-y-6">
                  {questions.map((question) => (
                    <div key={question.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-pink-500">
                        {question.categoryLabel}
                      </p>
                      {question.scene && (
                        <p className="mt-2 text-xs italic text-pink-500">{question.scene}</p>
                      )}
                      <h3 className="mt-3 text-lg font-semibold text-slate-900">{question.text}</h3>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {question.options.map((option, index) => (
                          <label
                            key={`${question.id}-${option.id}`}
                            className={`flex cursor-pointer items-center rounded-xl border px-4 py-3 text-sm font-medium transition ${
                              currentFriendAnswers[question.id] === index
                                ? "border-amber-500 bg-amber-100 text-amber-800 shadow"
                                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-300 hover:bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`friend-${question.id}`}
                              className="hidden"
                              value={option.id}
                              checked={currentFriendAnswers[question.id] === index}
                              onChange={() => handleFriendAnswer(question.id, index)}
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={submitFriendQuiz}
                  className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:from-pink-400 hover:to-red-400"
                >
                  Revelar su destino en el ranking
                </button>
              </div>
            )}

            {step === "results" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Ranking Reality Vibes</h2>
                <p className="text-sm text-slate-600">
                  Quién es alma gemela, quién telepático y quién vino a inventarse tu vida. Solo vale el drama sincero.
                </p>
                <div className="space-y-4">
                  {friendResults.length === 0 ? (
                    <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-600">
                      Aún no hay retadorxs. Llama a tu crew y que empiece la gala.
                    </p>
                  ) : (
                    friendResults.map((result, index) => {
                      const topMoods = getTopMoods(result.moodStats);
                      return (
                        <div
                          key={`${result.name}-${index}`}
                          className={`rounded-2xl border p-6 shadow-sm transition ${
                            index === 0
                              ? "border-purple-500 bg-gradient-to-r from-purple-50 via-white to-pink-50"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                                #{index + 1} • {result.level}
                              </p>
                              <p className="text-xs text-slate-500">{levelCopy[result.level] ?? ""}</p>
                              <h3 className="text-xl font-bold text-slate-900">{result.name}</h3>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-slate-600">Aciertos</p>
                              <p className="text-lg font-bold text-slate-900">
                                {result.score}/{totalQuestions}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {topMoods.length === 0 ? (
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                                Sin vibes dominantes
                              </span>
                            ) : (
                              topMoods.map((mood) => (
                                <span
                                  key={`${result.name}-${mood}`}
                                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${moodAccent[mood]}`}
                                >
                                  {moodLabels[mood]} {result.moodStats[mood]}%
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={resetForNewFriend}
                    className="flex-1 rounded-xl border border-purple-400 bg-white px-6 py-3 text-base font-semibold text-purple-600 shadow transition hover:border-purple-500 hover:text-purple-700"
                  >
                    Invitar a otra persona
                  </button>
                  <button
                    type="button"
                    onClick={resetGame}
                    className="flex-1 rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow transition hover:bg-slate-800"
                  >
                    Reiniciar temporada
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
