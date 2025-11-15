export type VibesCategory =
  | "VIBE_ESENCIA"
  | "VIBE_SOCIAL"
  | "VIBE_DRAMA"
  | "VIBE_SECRETA"
  | "VIBE_CAOS";

export type VibesSpicyLevel = "SOFT" | "MEDIUM" | "HOT";

export type VibesPackId =
  | "CORE_VIBES"
  | "FAMILY_VIBES"
  | "SPICY_VIBES"
  | "EVENT_VIBES"
  | "CUSTOM_VIBES";

export type VibesMood = "CHILL" | "SPICY" | "DLUXE" | "URBAN" | "ARTSY";

export interface VibesOption {
  id: string; // "A" | "B" | "C" | "D" | "E"
  label: string;
  mood: VibesMood;
}

export interface VibesQuestion {
  id: string;
  category: VibesCategory;
  categoryLabel: string;
  packId: VibesPackId;
  spicyLevel: VibesSpicyLevel;
  text: string;
  options: VibesOption[];
  tags?: string[];
  isEnabled?: boolean;
}
