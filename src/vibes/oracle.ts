import { VibesMood, MoodStats } from "./types";

export type FriendLevel =
  | "VIBE_SUPREMA"
  | "VIBE_TELEPATICA"
  | "VIBE_SOSPECHOSA"
  | "VIBE_INVENTADA";

export interface MainOracleContext {
  moodStats: MoodStats; // porcentajes 0-100
  playerName: string;
  avgScorePercent: number;
  mostTelepathicFriendName?: string;
  mostFakeFriendName?: string;
}

export interface FriendOracleContext {
  name: string;
  level: FriendLevel | string;
  moodStats: MoodStats; // % vibes para ESTA relación
  scorePercent: number; // % compatibilidad (0-100)
}

export interface GroupOracleContext {
  moodStats: MoodStats; // % por Vibe
  avgScorePercent: number;
  maxScorePercent: number;
  minScorePercent: number;
  playersCount: number;
}

export function mapLevelToFriendLevel(level: string): FriendLevel {
  const normalized = level.toUpperCase();
  if (normalized.includes("SUPREMA")) return "VIBE_SUPREMA";
  if (normalized.includes("TELEP")) return "VIBE_TELEPATICA";
  if (normalized.includes("SOSPE")) return "VIBE_SOSPECHOSA";
  return "VIBE_INVENTADA";
}

export function getTopVibes(moodStats: MoodStats, max: number = 2): VibesMood[] {
  const entries = Object.entries(moodStats) as [VibesMood, number][];
  const sorted = entries.sort((a, b) => b[1] - a[1]);
  return sorted
    .filter(([, value]) => value > 0)
    .slice(0, max)
    .map(([m]) => m);
}

const moodLabel: Record<VibesMood, string> = {
  CHILL: "Chill",
  SPICY: "Spicy",
  DLUXE: "DLuxe",
  URBAN: "Urban",
  ARTSY: "Artsy",
};

export function getMainOracleMessage(ctx: MainOracleContext): string {
  const { moodStats, playerName, avgScorePercent, mostTelepathicFriendName, mostFakeFriendName } = ctx;

  const topVibes = getTopVibes(moodStats, 2);
  const [top = "CHILL", second = "SPICY"] = topVibes;

  const topPercent = moodStats[top] ?? 0;
  const secondPercent = moodStats[second] ?? 0;

  if (top === "URBAN" && second === "SPICY") {
    return (
      `✨ ORÁCULO VIBES™ DE ${playerName.toUpperCase()} ✨\n\n` +
      `Tus amigxs te vibra como **${moodLabel.URBAN} (${topPercent}%) con alma ${moodLabel.SPICY} (${secondPercent}%)**.\n` +
      `No eres una persona, eres un after glam en chándal. Barrio, caños, callejón y story bien pensada.\n` +
      `Si hay drama, te enteras la primera; si hay plan, se cae sin tu aprobación.\n\n` +
      (mostTelepathicFriendName
        ? `🔮 Tu alma gemela del salseo hoy es **${mostTelepathicFriendName}**.\n`
        : ``) +
      (mostFakeFriendName
        ? `🤡 Y el oráculo sospecha de **${mostFakeFriendName}**, que se lo está inventando fuerte.\n\n`
        : `\n`) +
      `El oráculo sentencia: *“Quien quiera paz, que no te agregue al grupo de WhatsApp.”*`
    );
  }

  if (top === "CHILL" && second === "ARTSY") {
    return (
      `✨ ORÁCULO VIBES™ DE ${playerName.toUpperCase()} ✨\n\n` +
      `Te perciben como **${moodLabel.CHILL} (${topPercent}%) con pincelada ${moodLabel.ARTSY} (${secondPercent}%)**.\n` +
      `Eres sofá emocional, playlist bonita y consejito medio bruja medio psicóloga.\n` +
      `La intensidad te visita, pero tú la recibes con incienso y un té.\n\n` +
      `📊 Tus amigxs han acertado de media un ${Math.round(avgScorePercent)}% de tus respuestas.\n` +
      (mostTelepathicFriendName
        ? `🔮 ${mostTelepathicFriendName} viene fuerte como terapeuta no titulada.\n`
        : ``) +
      `El oráculo declara: *“Quien te tiene cerca, tiene terapia low-cost con glitter.”*`
    );
  }

  if (top === "DLUXE" && second === "SPICY") {
    return (
      `✨ ORÁCULO VIBES™ DE ${playerName.toUpperCase()} ✨\n\n` +
      `Para tu grupo eres **${moodLabel.DLUXE} (${topPercent}%) con fuego ${moodLabel.SPICY} (${secondPercent}%)**.\n` +
      `En tu mente vives en una alfombra roja, aunque estés en el súper comprando croquetas congeladas.\n` +
      `Drama sí, pero con iluminador y outfit pensado.\n\n` +
      `El oráculo publica: *“No eres diva de barrio: eres el barrio entero haciendo de diva.”*`
    );
  }

  if (top === "CHILL" && second === "URBAN") {
    return (
      `✨ ORÁCULO VIBES™ DE ${playerName.toUpperCase()} ✨\n\n` +
      `Tu vibra base es **${moodLabel.CHILL} (${topPercent}%)** con calle **${moodLabel.URBAN} (${secondPercent}%)**.\n` +
      `Eres abrazo y barrio: sabes escuchar y sabes mover el grupo como nadie.\n` +
      `Drama controlado, planes improvisados y stories con filtro retro.\n\n` +
      (mostTelepathicFriendName ? `🔮 ${mostTelepathicFriendName} traduce tus silencios.\n` : ``) +
      (mostFakeFriendName ? `🤡 ${mostFakeFriendName} está invitado a observar y tomar apuntes.\n\n` : `\n`) +
      `El oráculo advierte: *“Quien te subestima, termina pidiendo consejos a deshora.”*`
    );
  }

  if (top === "SPICY" && second === "URBAN") {
    return (
      `✨ ORÁCULO VIBES™ DE ${playerName.toUpperCase()} ✨\n\n` +
      `Te leen como **${moodLabel.SPICY} (${topPercent}%)** con base **${moodLabel.URBAN} (${secondPercent}%)**.\n` +
      `Eres plot twist ambulante, pero con GPS de barrio para saber dónde pisar.\n` +
      `Si falta chispa, apareces con mechero y playlist de perreo filosófico.\n\n` +
      (mostTelepathicFriendName ? `🔮 ${mostTelepathicFriendName} huele tu siguiente giro de guion.\n` : ``) +
      `El oráculo resume: *“No eres protagonista, eres la guionista encubierta.”*`
    );
  }

  if (top === "ARTSY" && second === "DLUXE") {
    return (
      `✨ ORÁCULO VIBES™ DE ${playerName.toUpperCase()} ✨\n\n` +
      `Combinas **${moodLabel.ARTSY} (${topPercent}%)** con brillo **${moodLabel.DLUXE} (${secondPercent}%)**.\n` +
      `Fotogenia, referencias niche y citas de moda que nadie pidió.\n` +
      `Tu vida es moodboard y tus dramas, performance.\n\n` +
      (mostTelepathicFriendName
        ? `🔮 ${mostTelepathicFriendName} es tu curador de exposiciones sentimentales.\n`
        : ``) +
      `El oráculo sentencia: *“Deja algo sin editar, que también eres humana.”*`
    );
  }

  return (
    `✨ ORÁCULO VIBES™ DE ${playerName.toUpperCase()} ✨\n\n` +
    `Tu mezcla principal es **${moodLabel[top]} (${topPercent}%)** con toques de **${moodLabel[second]} (${secondPercent}%)**.\n` +
    `Tus amigxs te leen con un ${Math.round(avgScorePercent)}% de acierto: suficiente para quererte, peligroso para tus secretos.\n\n` +
    `El oráculo murmura: *“Si seguís jugando al Vibes Test™, cada partida será un nuevo capítulo de vuestra telenovela.”*`
  );
}

export function getFriendOracleMessage(ctx: FriendOracleContext): string {
  const { name, moodStats, scorePercent } = ctx;
  const topVibes = getTopVibes(moodStats, 2);
  const [top = "CHILL", second = "SPICY"] = topVibes;

  const topLabel = moodLabel[top];
  const secondLabel = moodLabel[second];

  const levelCode: FriendLevel = mapLevelToFriendLevel(ctx.level as string);

  if (levelCode === "VIBE_SUPREMA") {
    return (
      `💫 ${name} — VIBE SUPREMA\n` +
      `Vibes contigo: ${topLabel} + ${secondLabel}\n` +
      `${name} no es solo tu amigx, es tu cómplice de salseo.\n` +
      `Acierta un ${Math.round(scorePercent)}% de lo que piensas: telepatía marica aprobada.\n` +
      `El oráculo decreta: “No le cuentes nada que no estés dispuestx a ver convertido en anécdota de terraza.”`
    );
  }

  if (levelCode === "VIBE_TELEPATICA") {
    return (
      `🔮 ${name} — VIBE TELEPÁTICA\n` +
      `Vibes contigo: ${topLabel} + ${secondLabel}\n` +
      `Te tiene calade. No lo acierta todo, pero lo importante sí.\n` +
      `Compatibilidad del ${Math.round(scorePercent)}%: casi casi contraseña del móvil.\n` +
      `El oráculo dice: “Si hay secreto, se lo contarás igual.”`
    );
  }

  if (levelCode === "VIBE_SOSPECHOSA") {
    return (
      `👀 ${name} — VIBE SOSPECHOSA\n` +
      `Vibes contigo: ${topLabel} + ${secondLabel}\n` +
      `Acierta lo justo para sospechar que te stalkea, pero falla lo suficiente como para saber que aún guardas misterios.\n` +
      `El oráculo comenta: “Un par de noches más de confesiones y se pasa al lado telepático.”`
    );
  }

  return (
    `🤡 ${name} — VIBE INVENTADA\n` +
    `Vibes contigo: ${topLabel} + ${secondLabel}\n` +
    `${name} te mira como personaje de serie, pero no se ha leído el guion.\n` +
    `Compatibilidad del ${Math.round(scorePercent)}%: más improvisación que documento.\n` +
    `El oráculo avisa: “Os merecéis una charla larga y un vino barato para poneros al día.”`
  );
}

export function getGroupOracleMessage(ctx: GroupOracleContext): string {
  const { moodStats, avgScorePercent, playersCount } = ctx;
  const topVibes = getTopVibes(moodStats, 2);
  const [top = "CHILL", second = "SPICY"] = topVibes;

  const topLabel = moodLabel[top];
  const secondLabel = moodLabel[second];

  const topPercent = moodStats[top] ?? 0;
  const secondPercent = moodStats[second] ?? 0;

  if (top === "URBAN" && second === "SPICY") {
    return (
      `🌈 ORÁCULO DEL GRUPO\n\n` +
      `Este grupo vibra como **${topLabel} (${topPercent}%) con corazón ${secondLabel} (${secondPercent}%)**.\n` +
      `Vuestro chat no es un chat: es una tertulia de late night en un kebab.\n` +
      `Se desayuna drama, se cena meme y se merienda audios de 7 minutos.\n\n` +
      `De media, os habéis leído con un ${Math.round(avgScorePercent)}% de acierto.\n` +
      `Profecía: “Si seguís jugando al VIBES TEST™, en la próxima vida volvéis como comparsa de carroza del Orgullo.”`
    );
  }

  if (top === "CHILL" && second === "ARTSY") {
    return (
      `🌈 ORÁCULO DEL GRUPO\n\n` +
      `Vuestro grupo es un salón con velas, colchas feas pero icónicas y pósters mal pegados.\n` +
      `**${topLabel} (${topPercent}%) + ${secondLabel} (${secondPercent}%)**: quedáis poco, pero cuando quedáis arregláis medio mundo.\n` +
      `Superpoder colectivo: drama controlado con banda sonora bonita.\n\n` +
      `Profecía: “Cada vez que juguéis, una terapeuta pierde un cliente.”`
    );
  }

  if (top === "DLUXE" && second === "CHILL") {
    return (
      `🌈 ORÁCULO DEL GRUPO\n\n` +
      `Brillo con calma: **${topLabel} (${topPercent}%)** con base **${secondLabel} (${secondPercent}%)**.\n` +
      `Sois alfombra roja y pijamada: sabéis posar y sabéis escuchar.\n` +
      `Cualquier quedada termina en sesión de fotos improvisada.\n\n` +
      `Compatibilidad colectiva del ${Math.round(avgScorePercent)}%: equipo creativo asegurado.`
    );
  }

  return (
    `🌈 ORÁCULO DEL GRUPO\n\n` +
    `La mezcla principal del grupo es **${topLabel} (${topPercent}%)** con toques **${secondLabel} (${secondPercent}%)**.\n` +
    `Sois ${playersCount} criaturas intentando entenderse sin manual.\n` +
    `El oráculo os da un ${Math.round(avgScorePercent)}% de compatibilidad colectiva y recomienda: otra ronda del VIBES TEST™ pronto.\n`
  );
}
