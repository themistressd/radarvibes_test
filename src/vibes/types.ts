export type VibesCategory =
  | "VIBE_ESENCIA" // lo básico de la persona
  | "VIBE_SOCIAL" // cómo es con la gente
  | "VIBE_DRAMA" // drama, rayadas, icks
  | "VIBE_SECRETA" // gustos, secretos, fetiches suaves
  | "VIBE_CAOS"; // locuras, plot twists, cosas absurdas

export type VibesSpicyLevel = "SOFT" | "MEDIUM" | "HOT";

export type VibesPackId =
  | "CORE_VIBES" // pack base de 20 preguntas
  | "FAMILY_VIBES"
  | "SPICY_VIBES"
  | "EVENT_VIBES"
  | "CUSTOM_VIBES";

export type VibesMood = "CHILL" | "SPICY" | "DLUXE" | "URBAN" | "ARTSY";

export interface VibesOption {
  id: string; // "A" | "B" | "C" | "D" | "E"
  label: string; // texto visible
  mood: VibesMood; // UNA sola vibe asociada a esta opción
}

export interface VibesQuestion {
  id: string; // ej: "CORE-ESENCIA-1"
  category: VibesCategory;
  categoryLabel: string; // ej: "VIBE ESENCIA™"
  packId: VibesPackId;
  spicyLevel: VibesSpicyLevel;
  text: string; // pregunta en primera persona
  scene?: string; // mini narrativa/escena antes de la pregunta
  options: VibesOption[]; // SIEMPRE 5 opciones (CHILL, SPICY, DLUXE, URBAN, ARTSY)
  tags?: string[];
  isEnabled?: boolean;
}

export type AnswersMap = Record<string, number>; // questionId -> índice de opción
export type MoodStats = Record<VibesMood, number>;
