import { VIBES_QUESTION_LIBRARY } from "./questions";
import { VibesQuestion, VibesMood, AnswersMap, MoodStats } from "./types";

export const DEFAULT_QUESTION_COUNT = 9; // partida rápida

export function getCoreQuestions(count: number = DEFAULT_QUESTION_COUNT): VibesQuestion[] {
  const core = VIBES_QUESTION_LIBRARY.filter(
    (q) =>
      q.packId === "CORE_VIBES" &&
      q.spicyLevel === "SOFT" &&
      (q.isEnabled ?? true)
  );

  const shuffled = [...core].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function normalizeMoodStats(moodStats: MoodStats): MoodStats {
  const total = Object.values(moodStats).reduce((a, b) => a + b, 0);
  if (total === 0) return { ...moodStats };

  const result: MoodStats = { ...moodStats };
  (Object.keys(result) as VibesMood[]).forEach((m) => {
    result[m] = Math.round((result[m] / total) * 100);
  });

  return result;
}

export function calculateFriendResult(
  questions: VibesQuestion[],
  selfAnswers: AnswersMap,
  friendAnswers: AnswersMap
) {
  const baseStats: MoodStats = {
    CHILL: 0,
    SPICY: 0,
    DLUXE: 0,
    URBAN: 0,
    ARTSY: 0,
  };

  const moodStats: MoodStats = { ...baseStats };
  let score = 0;

  questions.forEach((q) => {
    const selfIndex = selfAnswers[q.id];
    const friendIndex = friendAnswers[q.id];

    if (
      selfIndex !== undefined &&
      friendIndex !== undefined &&
      selfIndex === friendIndex
    ) {
      score += 1;
      const option = q.options[selfIndex];
      if (option && option.mood) {
        moodStats[option.mood] = (moodStats[option.mood] ?? 0) + 1;
      }
    }
  });

  const totalQuestions = questions.length;

  let level = "VIBE INVENTADA 🤡";
  if (score >= 8) level = "VIBE SUPREMA 💫";
  else if (score >= 6) level = "VIBE TELEPÁTICA 🔮";
  else if (score >= 4) level = "VIBE SOSPECHOSA 👀";

  const normalizedMoodStats = normalizeMoodStats(moodStats);

  return { score, level, moodStats: normalizedMoodStats, totalQuestions };
}
