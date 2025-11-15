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
  id: string;
  label: string;
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
  moods?: VibesMood[];
}

export const VIBES_QUESTION_LIBRARY: VibesQuestion[] = [
  {
    id: "CORE-ESENCIA-1",
    category: "VIBE_ESENCIA",
    categoryLabel: "VIBE ESENCIA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué playlist pongo para activarme apenas abro el ojo?",
    options: [
      { id: "A", label: "Pop glitter con coreografía imaginaria" },
      { id: "B", label: "Neo soul suave para despertarme sin drama" },
      { id: "C", label: "Reggaetón clásico para sentirme en after" },
      { id: "D", label: "Indie llorón para saborear la nostalgia" }
    ],
    moods: ["CHILL", "SPICY", "URBAN"],
  },
  {
    id: "CORE-ESENCIA-2",
    category: "VIBE_ESENCIA",
    categoryLabel: "VIBE ESENCIA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando necesito resetear mi vibra en medio del día?",
    options: [
      { id: "A", label: "Me tiro cinco minutos a escuchar mi respiración" },
      { id: "B", label: "Mando nota de voz épica contando el drama" },
      { id: "C", label: "Busco un espejo y practico mi cara de diva" },
      { id: "D", label: "Salgo a caminar y me creo videoclip urbano" }
    ],
    moods: ["CHILL", "DLUXE", "URBAN"],
  },
  {
    id: "CORE-ESENCIA-3",
    category: "VIBE_ESENCIA",
    categoryLabel: "VIBE ESENCIA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cuál es mi merienda firma cuando quiero mimo express?",
    options: [
      { id: "A", label: "Mate o té con galletas caseras mood abuela" },
      { id: "B", label: "Bubble tea con toppings extra porque me lo merezco" },
      { id: "C", label: "Sandwich improvisado con todo lo de la heladera" },
      { id: "D", label: "Fruta cortada cute que subo a stories" }
    ],
    moods: ["CHILL", "DLUXE"],
  },
  {
    id: "CORE-ESENCIA-4",
    category: "VIBE_ESENCIA",
    categoryLabel: "VIBE ESENCIA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cómo me motivo cuando tengo que hacer algo aburrido pero necesario?",
    options: [
      { id: "A", label: "Me premio con un capricho fashion después" },
      { id: "B", label: "Pido compañía por videollamada para charlar mientras" },
      { id: "C", label: "Pongo cronómetro y lo vuelvo desafío conmigo" },
      { id: "D", label: "Creo una playlist dramática y finjo que soy protagonista" }
    ],
    moods: ["SPICY", "DLUXE", "ARTSY"],
  },
  {
    id: "CORE-ESENCIA-5",
    category: "VIBE_ESENCIA",
    categoryLabel: "VIBE ESENCIA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cuál es mi mood básico de domingo perfecto?",
    options: [
      { id: "A", label: "Series largas, mantita y delivery comfort" },
      { id: "B", label: "Paseo artístico con outfit pintoresco" },
      { id: "C", label: "Brunch casero con música vintage" },
      { id: "D", label: "Ruta de feria y puestos del barrio" }
    ],
    moods: ["CHILL", "URBAN", "ARTSY"],
  },
  {
    id: "CORE-ESENCIA-6",
    category: "VIBE_ESENCIA",
    categoryLabel: "VIBE ESENCIA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué tipo de frase motivadora me prende al toque?",
    options: [
      { id: "A", label: "\"Con calma, pero brillando\"" },
      { id: "B", label: "\"Somos drama, pero del bueno\"" },
      { id: "C", label: "\"Hazlo a tu manera aunque tiemble todo\"" },
      { id: "D", label: "\"Que se note tu vibe urbana aunque sea lunes\"" }
    ],
    moods: ["SPICY", "DLUXE", "URBAN"],
  },
  {
    id: "CORE-ESENCIA-7",
    category: "VIBE_ESENCIA",
    categoryLabel: "VIBE ESENCIA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago con mis ahorros cuando me siento prospera?",
    options: [
      { id: "A", label: "Me compro algo tech o gadget para elevar rutina" },
      { id: "B", label: "Invierto en alguna experiencia artística" },
      { id: "C", label: "Armo fondo de viajes improvisados" },
      { id: "D", label: "Lo guardo prolijo porque soy previsora" }
    ],
    moods: ["DLUXE", "CHILL", "ARTSY"],
  },
  {
    id: "CORE-ESENCIA-8",
    category: "VIBE_ESENCIA",
    categoryLabel: "VIBE ESENCIA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué estética me representa cuando salgo a la calle?",
    options: [
      { id: "A", label: "Sporty glam con brillo estratégico" },
      { id: "B", label: "Vintage rebuscado que parece casual" },
      { id: "C", label: "Minimal urbano con toques de plata" },
      { id: "D", label: "Artsy collage con colores imposibles" }
    ],
    moods: ["DLUXE", "URBAN", "ARTSY"],
  },
  {
    id: "CORE-ESENCIA-9",
    category: "VIBE_ESENCIA",
    categoryLabel: "VIBE ESENCIA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cuál es mi ritual de skincare mental cuando me saturé?",
    options: [
      { id: "A", label: "Apagar todo y hacer journaling con velitas" },
      { id: "B", label: "Videollamada con mi red de contención" },
      { id: "C", label: "Bailar mis dramas frente al espejo" },
      { id: "D", label: "Salir a un rooftop a respirar ciudad" }
    ],
    moods: ["CHILL", "SPICY", "URBAN"],
  },
  {
    id: "CORE-ESENCIA-10",
    category: "VIBE_ESENCIA",
    categoryLabel: "VIBE ESENCIA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué frase define mis vibes cuando me preguntan cómo estoy?",
    options: [
      { id: "A", label: "Sosteniendo el glamour con café" },
      { id: "B", label: "En modo chill, pero con radar encendido" },
      { id: "C", label: "Planeando el próximo caos divertido" },
      { id: "D", label: "Soñando proyectos raros todo el día" }
    ],
    moods: ["CHILL", "SPICY", "ARTSY"],
  },
  {
    id: "CORE-ESENCIA-11",
    category: "VIBE_ESENCIA",
    categoryLabel: "VIBE ESENCIA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago con mi pelo cuando quiero sentir que renací?",
    options: [
      { id: "A", label: "Me hago ondas suaves y aroma a vainilla" },
      { id: "B", label: "Le doy volumen dramático como estrella pop" },
      { id: "C", label: "Lo dejo messy chic con gorra urbana" },
      { id: "D", label: "Juego con accesorios artsy rarísimos" }
    ],
    moods: ["DLUXE", "SPICY", "ARTSY"],
  },
  {
    id: "CORE-ESENCIA-12",
    category: "VIBE_ESENCIA",
    categoryLabel: "VIBE ESENCIA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago con mis mensajes sin responder cuando me da ansiedad?",
    options: [
      { id: "A", label: "Los organizo con calma y respondo con mate" },
      { id: "B", label: "Hago maratón de audios sincericidas" },
      { id: "C", label: "Los limpio con respuestas rápidas y emojis" },
      { id: "D", label: "Dejo que mi mood artsy decida un meme" }
    ],
    moods: ["CHILL", "SPICY", "ARTSY"],
  },
  {
    id: "CORE-SOCIAL-1",
    category: "VIBE_SOCIAL",
    categoryLabel: "VIBE SOCIAL™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cómo entro a una fiesta donde casi no conozco a nadie?",
    options: [
      { id: "A", label: "Busco la playlist y me hago DJ honoraria" },
      { id: "B", label: "Me pego a la barra y charlo con quien caiga" },
      { id: "C", label: "Analizo el ambiente hasta encontrar mi gente" },
      { id: "D", label: "Llego con historia dramática para romper el hielo" }
    ],
    moods: ["SPICY", "URBAN", "DLUXE"],
  },
  {
    id: "CORE-SOCIAL-2",
    category: "VIBE_SOCIAL",
    categoryLabel: "VIBE SOCIAL™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando el grupo de WhatsApp explota de mensajes?",
    options: [
      { id: "A", label: "Respondo con resumen ejecutivo y sticker icónico" },
      { id: "B", label: "Mando audio largo para poner orden dramático" },
      { id: "C", label: "Leo todo en silencio y reacciono con corazones" },
      { id: "D", label: "Propongo juntada urgente para charlar en vivo" }
    ],
    moods: ["CHILL", "SPICY", "URBAN"],
  },
  {
    id: "CORE-SOCIAL-3",
    category: "VIBE_SOCIAL",
    categoryLabel: "VIBE SOCIAL™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cuál es mi rol en una noche de karaoke con amigxs?",
    options: [
      { id: "A", label: "Animadora que reparte micrófono y aplausos" },
      { id: "B", label: "Diva dramática que canta baladas con acting" },
      { id: "C", label: "Directora creativa que arma dúos inesperados" },
      { id: "D", label: "Reportera stories mostrando backstage" }
    ],
    moods: ["DLUXE", "SPICY", "ARTSY"],
  },
  {
    id: "CORE-SOCIAL-4",
    category: "VIBE_SOCIAL",
    categoryLabel: "VIBE SOCIAL™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando mi plan de juntada se cae a último momento?",
    options: [
      { id: "A", label: "Propongo videollamada improvisada" },
      { id: "B", label: "Organizo plan alternativo con quien esté libre" },
      { id: "C", label: "Aprovecho para noche de autocuidado deluxe" },
      { id: "D", label: "Salgo sola y hago amigos nuevos" }
    ],
    moods: ["CHILL", "DLUXE", "URBAN"],
  },
  {
    id: "CORE-SOCIAL-5",
    category: "VIBE_SOCIAL",
    categoryLabel: "VIBE SOCIAL™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cómo reacciono cuando alguien del grupo está triste?",
    options: [
      { id: "A", label: "Le mando audio largo lleno de amor" },
      { id: "B", label: "Organizo kit de memes personalizados" },
      { id: "C", label: "Armo tarde tranquila con té y charlas" },
      { id: "D", label: "Lo secuestro para paseo sorpresa por la ciudad" }
    ],
    moods: ["CHILL", "SPICY", "URBAN"],
  },
  {
    id: "CORE-SOCIAL-6",
    category: "VIBE_SOCIAL",
    categoryLabel: "VIBE SOCIAL™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cuál es mi estrategia para presentar a dos grupitos que no se conocen?",
    options: [
      { id: "A", label: "Juegos rompehielo con mucho glitter" },
      { id: "B", label: "Hilos de historias que los conectan" },
      { id: "C", label: "Música curada para que fluyan solos" },
      { id: "D", label: "Tour urbano mostrando mis spots favoritos" }
    ],
    moods: ["SPICY", "ARTSY", "URBAN"],
  },
  {
    id: "CORE-SOCIAL-7",
    category: "VIBE_SOCIAL",
    categoryLabel: "VIBE SOCIAL™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando alguien me pide consejo amoroso intensito?",
    options: [
      { id: "A", label: "Escucho y doy respuesta zen sin juzgar" },
      { id: "B", label: "Hago análisis dramático con referencias de series" },
      { id: "C", label: "Propongo plan para distraer y volver a brillar" },
      { id: "D", label: "Les tiro playlist terapéutica y memes" }
    ],
    moods: ["CHILL", "SPICY", "ARTSY"],
  },
  {
    id: "CORE-SOCIAL-8",
    category: "VIBE_SOCIAL",
    categoryLabel: "VIBE SOCIAL™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cómo organizo un planazo cuando viene visita inesperada?",
    options: [
      { id: "A", label: "Tour gastronómico por mi barrio" },
      { id: "B", label: "Velada de spa casero con mascarillas" },
      { id: "C", label: "Galería, feria y fotos artsy por la ciudad" },
      { id: "D", label: "Fiestón casero con luces y karaoke" }
    ],
    moods: ["URBAN", "CHILL", "SPICY"],
  },
  {
    id: "CORE-SOCIAL-9",
    category: "VIBE_SOCIAL",
    categoryLabel: "VIBE SOCIAL™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando me agregan a un chat familiar caótico?",
    options: [
      { id: "A", label: "Entro suave con stickers tiernos" },
      { id: "B", label: "Lanzo meme para marcar mi presencia" },
      { id: "C", label: "Organizo video call para entender el drama" },
      { id: "D", label: "Leo todo y respondo con resumen diplomático" }
    ],
    moods: ["CHILL", "SPICY", "URBAN"],
  },
  {
    id: "CORE-SOCIAL-10",
    category: "VIBE_SOCIAL",
    categoryLabel: "VIBE SOCIAL™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cómo reacciono cuando me presentan a un crush del que hablaron mil años?",
    options: [
      { id: "A", label: "Sonrisa calmada y charla tranquila" },
      { id: "B", label: "Entro con chiste y guiño dramático" },
      { id: "C", label: "Lo investigo en modo periodista del barrio" },
      { id: "D", label: "Me hago la misteriosa y dejo intriga" }
    ],
    moods: ["SPICY", "URBAN", "DLUXE"],
  },
  {
    id: "CORE-SOCIAL-11",
    category: "VIBE_SOCIAL",
    categoryLabel: "VIBE SOCIAL™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cuál es mi manera favorita de celebrar un logro ajeno?",
    options: [
      { id: "A", label: "Organizo mini brindis con glitter" },
      { id: "B", label: "Creo collage de fotos para redes" },
      { id: "C", label: "Les escribo carta dramática de amor" },
      { id: "D", label: "Armo excursión urbana sorpresa" }
    ],
    moods: ["DLUXE", "ARTSY", "URBAN"],
  },
  {
    id: "CORE-SOCIAL-12",
    category: "VIBE_SOCIAL",
    categoryLabel: "VIBE SOCIAL™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando quiero reunir a la familia elegida después de meses?",
    options: [
      { id: "A", label: "Hago doodle interminable hasta conseguir fecha" },
      { id: "B", label: "Lanzo ultimátum cariñoso con fecha fija" },
      { id: "C", label: "Propongo retiro chill con pijamas" },
      { id: "D", label: "Planifico road trip urbano con playlist" }
    ],
    moods: ["CHILL", "SPICY", "URBAN"],
  },
  {
    id: "CORE-DRAMA-1",
    category: "VIBE_DRAMA",
    categoryLabel: "VIBE DRAMA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando mi crush tarda horas en responder?",
    options: [
      { id: "A", label: "Respiro, me enfoco en mis cosas y lo suelto" },
      { id: "B", label: "Armo teoría conspirativa con memes" },
      { id: "C", label: "Escribo respuesta intensa y la dejo en borrador" },
      { id: "D", label: "Subo story sutil para recordar mi existencia" }
    ],
    moods: ["CHILL", "SPICY", "DLUXE"],
  },
  {
    id: "CORE-DRAMA-2",
    category: "VIBE_DRAMA",
    categoryLabel: "VIBE DRAMA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cuál es mi reacción cuando alguien se olvida de invitarme?",
    options: [
      { id: "A", label: "Lo hablo directo con honestidad chill" },
      { id: "B", label: "Planifico entrada triunfal al próximo plan" },
      { id: "C", label: "Armo fiesta alternativa ese mismo día" },
      { id: "D", label: "Escribo diario dramático y después sigo" }
    ],
    moods: ["CHILL", "SPICY", "URBAN"],
  },
  {
    id: "CORE-DRAMA-3",
    category: "VIBE_DRAMA",
    categoryLabel: "VIBE DRAMA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando hay silencio incómodo en la mesa?",
    options: [
      { id: "A", label: "Lanzo pregunta profunda pero suave" },
      { id: "B", label: "Cuento anécdota absurda que siempre funciona" },
      { id: "C", label: "Pongo juego express de verdad o reto light" },
      { id: "D", label: "Dejo que el momento respire y observo" }
    ],
    moods: ["SPICY", "CHILL", "ARTSY"],
  },
  {
    id: "CORE-DRAMA-4",
    category: "VIBE_DRAMA",
    categoryLabel: "VIBE DRAMA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando se arma malentendido en el grupo?",
    options: [
      { id: "A", label: "Mando audio diplomático para mediar" },
      { id: "B", label: "Organizo reunión urgente con mate" },
      { id: "C", label: "Dejo que se enfríe y luego hablo uno a uno" },
      { id: "D", label: "Creo documento compartido con la cronología" }
    ],
    moods: ["CHILL", "URBAN", "ARTSY"],
  },
  {
    id: "CORE-DRAMA-5",
    category: "VIBE_DRAMA",
    categoryLabel: "VIBE DRAMA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cómo manejo cuando alguien hace comentario pasivo agresivo?",
    options: [
      { id: "A", label: "Respondo con ironía cariñosa" },
      { id: "B", label: "Le pregunto directo qué quiso decir" },
      { id: "C", label: "Ignoro y convierto el tema en chiste" },
      { id: "D", label: "Lo saco a bailar para cambiar la energía" }
    ],
    moods: ["SPICY", "URBAN", "CHILL"],
  },
  {
    id: "CORE-DRAMA-6",
    category: "VIBE_DRAMA",
    categoryLabel: "VIBE DRAMA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando me enteré de un chisme jugoso?",
    options: [
      { id: "A", label: "Lo guardo en caja fuerte hasta tener contexto" },
      { id: "B", label: "Lo comparto solo con mi comité de confianza" },
      { id: "C", label: "Espero y lo transformo en meme cuando pase" },
      { id: "D", label: "Lo uso para producir tertulia dramática controlada" }
    ],
    moods: ["SPICY", "CHILL", "ARTSY"],
  },
  {
    id: "CORE-DRAMA-7",
    category: "VIBE_DRAMA",
    categoryLabel: "VIBE DRAMA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cómo reacciono cuando alguien me ghostea suave?",
    options: [
      { id: "A", label: "Acepto la señal y me enfoco en mí" },
      { id: "B", label: "Lanzo mensaje final con cierre dramático" },
      { id: "C", label: "Lo cuento como novela en el grupo" },
      { id: "D", label: "Me invento un plan épico para olvidar" }
    ],
    moods: ["CHILL", "SPICY", "DLUXE"],
  },
  {
    id: "CORE-DRAMA-8",
    category: "VIBE_DRAMA",
    categoryLabel: "VIBE DRAMA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando mi serie favorita me rompe el corazón?",
    options: [
      { id: "A", label: "Me permito llorar y escribo reseña sensible" },
      { id: "B", label: "Armo watch party para debatir el drama" },
      { id: "C", label: "Cambio a reality divertido para equilibrar" },
      { id: "D", label: "Dibujo fanart para sublimar el dolor" }
    ],
    moods: ["ARTSY", "CHILL", "SPICY"],
  },
  {
    id: "CORE-DRAMA-9",
    category: "VIBE_DRAMA",
    categoryLabel: "VIBE DRAMA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cómo manejo cuando mi agenda está explotada?",
    options: [
      { id: "A", label: "Reacomodo con calma y priorizo autocuidado" },
      { id: "B", label: "Declaro emergencia y pido ayuda" },
      { id: "C", label: "Cancelo algo y lo convierto en meme" },
      { id: "D", label: "Hago horario deluxe con bloques glam" }
    ],
    moods: ["CHILL", "SPICY", "DLUXE"],
  },
  {
    id: "CORE-DRAMA-10",
    category: "VIBE_DRAMA",
    categoryLabel: "VIBE DRAMA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando me entero tarde de un evento icónico?",
    options: [
      { id: "A", label: "Armo watch party diferida con mis comentarios" },
      { id: "B", label: "Entro con outfit exagerado al after" },
      { id: "C", label: "Acepto FOMO y planifico el próximo con tiempo" },
      { id: "D", label: "Hago hilo en redes con análisis dramático" }
    ],
    moods: ["SPICY", "DLUXE", "URBAN"],
  },
  {
    id: "CORE-DRAMA-11",
    category: "VIBE_DRAMA",
    categoryLabel: "VIBE DRAMA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cómo reacciono cuando mis planes perfectos se descarrilan?",
    options: [
      { id: "A", label: "Me río y documento el caos" },
      { id: "B", label: "Reorganizo con plan B brillante" },
      { id: "C", label: "Hago catarsis en stories con filtros" },
      { id: "D", label: "Lo transformo en micro performance" }
    ],
    moods: ["SPICY", "ARTSY", "URBAN"],
  },
  {
    id: "CORE-DRAMA-12",
    category: "VIBE_DRAMA",
    categoryLabel: "VIBE DRAMA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando alguien interrumpe mi momento chill?",
    options: [
      { id: "A", label: "Pongo límites suaves y vuelvo a mi manta" },
      { id: "B", label: "Los sumo a mi ritual deluxe" },
      { id: "C", label: "Les delego tarea para canalizar" },
      { id: "D", label: "Armo mini show para justificar la interrupción" }
    ],
    moods: ["CHILL", "DLUXE", "SPICY"],
  },
  {
    id: "CORE-SECRETA-1",
    category: "VIBE_SECRETA",
    categoryLabel: "VIBE SECRETA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cuál es mi guilty pleasure que casi no confieso?",
    options: [
      { id: "A", label: "Ver realities de reformas hasta dormirme" },
      { id: "B", label: "Escuchar cumbias viejas a todo volumen" },
      { id: "C", label: "Coleccionar revistas con perfume" },
      { id: "D", label: "Seguir fanfics raros en foros secretos" }
    ],
    moods: ["CHILL", "URBAN", "ARTSY"],
  },
  {
    id: "CORE-SECRETA-2",
    category: "VIBE_SECRETA",
    categoryLabel: "VIBE SECRETA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando quiero sentirme misteriosa?",
    options: [
      { id: "A", label: "Cambio mi foto de perfil sin aviso" },
      { id: "B", label: "Me pierdo en librería y subo stories crípticos" },
      { id: "C", label: "Salgo a caminar de noche escuchando boleros" },
      { id: "D", label: "Escribo poesía en notas y no la muestro" }
    ],
    moods: ["ARTSY", "URBAN", "DLUXE"],
  },
  {
    id: "CORE-SECRETA-3",
    category: "VIBE_SECRETA",
    categoryLabel: "VIBE SECRETA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cuál es mi fantasía de vida alternativa?",
    options: [
      { id: "A", label: "Tener café librería en la costa" },
      { id: "B", label: "Ser coreógrafa de giras pop" },
      { id: "C", label: "Vivir en van y hacer murales" },
      { id: "D", label: "Ser crítica secreta de restaurantes" }
    ],
    moods: ["CHILL", "DLUXE", "ARTSY"],
  },
  {
    id: "CORE-SECRETA-4",
    category: "VIBE_SECRETA",
    categoryLabel: "VIBE SECRETA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago con mis ideas creativas a las 3 AM?",
    options: [
      { id: "A", label: "Las anoto en cuaderno lleno de stickers" },
      { id: "B", label: "Les mando audio a mis confidentes nocturnos" },
      { id: "C", label: "Armo moodboard secreto en Pinterest" },
      { id: "D", label: "Las convierto en hilo anónimo" }
    ],
    moods: ["ARTSY", "SPICY", "CHILL"],
  },
  {
    id: "CORE-SECRETA-5",
    category: "VIBE_SECRETA",
    categoryLabel: "VIBE SECRETA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cuál es mi táctica cuando stalkeo un perfil?",
    options: [
      { id: "A", label: "Modo ninja: solo stories anónimas" },
      { id: "B", label: "Likeo fotos antiguas para provocar" },
      { id: "C", label: "Investigo amistades en modo detective" },
      { id: "D", label: "Guardo posts para un collage secreto" }
    ],
    moods: ["SPICY", "URBAN", "ARTSY"],
  },
  {
    id: "CORE-SECRETA-6",
    category: "VIBE_SECRETA",
    categoryLabel: "VIBE SECRETA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué colecciono en silencio desde hace años?",
    options: [
      { id: "A", label: "Tickets de conciertos y cines" },
      { id: "B", label: "Cartas y notas manuscritas" },
      { id: "C", label: "Fotos polaroid de noches urbanas" },
      { id: "D", label: "Trinkets brillantes de mercaditos" }
    ],
    moods: ["CHILL", "URBAN", "DLUXE"],
  },
  {
    id: "CORE-SECRETA-7",
    category: "VIBE_SECRETA",
    categoryLabel: "VIBE SECRETA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando me quedo sola en casa un viernes?",
    options: [
      { id: "A", label: "Organizo spa nocturno con playlists slow" },
      { id: "B", label: "Produzco coreografía secreta en el living" },
      { id: "C", label: "Pinto o escribo hasta tarde" },
      { id: "D", label: "Hago tour nocturno por deliverys raros" }
    ],
    moods: ["CHILL", "SPICY", "URBAN"],
  },
  {
    id: "CORE-SECRETA-8",
    category: "VIBE_SECRETA",
    categoryLabel: "VIBE SECRETA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cuál es mi talento oculto que casi nadie conoce?",
    options: [
      { id: "A", label: "Imitar voces de celebridades" },
      { id: "B", label: "Leer cartas del tarot intuitivo" },
      { id: "C", label: "Encontrar ofertas callejeras increíbles" },
      { id: "D", label: "Hacer playlists que curan corazones" }
    ],
    moods: ["SPICY", "ARTSY", "URBAN"],
  },
  {
    id: "CORE-SECRETA-9",
    category: "VIBE_SECRETA",
    categoryLabel: "VIBE SECRETA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué ritual secreto tengo antes de una cita?",
    options: [
      { id: "A", label: "Mantra frente al espejo con luz cálida" },
      { id: "B", label: "Revisión de memes compartidos" },
      { id: "C", label: "Paseo corto por la ciudad para activar" },
      { id: "D", label: "Creo perfume casero con aceites" }
    ],
    moods: ["DLUXE", "URBAN", "CHILL"],
  },
  {
    id: "CORE-SECRETA-10",
    category: "VIBE_SECRETA",
    categoryLabel: "VIBE SECRETA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago cuando quiero desaparecer de redes un rato?",
    options: [
      { id: "A", label: "Borro apps y me voy al parque con libro" },
      { id: "B", label: "Solo subo fotos de nubes y pistas crípticas" },
      { id: "C", label: "Le doy mis claves a mi hermana y listo" },
      { id: "D", label: "Activo modo lurker sin interactuar" }
    ],
    moods: ["CHILL", "ARTSY", "URBAN"],
  },
  {
    id: "CORE-SECRETA-11",
    category: "VIBE_SECRETA",
    categoryLabel: "VIBE SECRETA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué guardo siempre en mi bolso por si pasa algo mágico?",
    options: [
      { id: "A", label: "Polaroid para capturar vibes" },
      { id: "B", label: "Brillos y glitter para emergencias" },
      { id: "C", label: "Un cuaderno con mis sueños" },
      { id: "D", label: "Snacks misteriosos para compartir" }
    ],
    moods: ["DLUXE", "ARTSY", "CHILL"],
  },
  {
    id: "CORE-SECRETA-12",
    category: "VIBE_SECRETA",
    categoryLabel: "VIBE SECRETA™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Cuál es mi hábito secreto para sentir que controlo el caos?",
    options: [
      { id: "A", label: "Listas infinitas con stickers" },
      { id: "B", label: "Clasificar playlists por colores" },
      { id: "C", label: "Ordenar closet según vibes" },
      { id: "D", label: "Guardar cajas con recuerdos por tema" }
    ],
    moods: ["CHILL", "DLUXE", "ARTSY"],
  },
  {
    id: "CORE-CAOS-1",
    category: "VIBE_CAOS",
    categoryLabel: "VIBE CAOS™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago si me encuentro con mi ex y su nueva cita en el súper?",
    options: [
      { id: "A", label: "Sonrío, saludo y agarro mi carrito digna" },
      { id: "B", label: "Hago comentario random y sigo bailando" },
      { id: "C", label: "Los ignoro y me escondo en pasillo de snacks" },
      { id: "D", label: "Les recomiendo un producto como influencer" }
    ],
    moods: ["SPICY", "URBAN", "DLUXE"],
  },
  {
    id: "CORE-CAOS-2",
    category: "VIBE_CAOS",
    categoryLabel: "VIBE CAOS™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago si se corta la luz en plena cena que organicé?",
    options: [
      { id: "A", label: "Lanzo velas y convierto todo en ritual místico" },
      { id: "B", label: "Armo rave acústica con utensilios" },
      { id: "C", label: "Improviso picnic en el piso con historias" },
      { id: "D", label: "Transmito en vivo el caos para los ausentes" }
    ],
    moods: ["SPICY", "ARTSY", "CHILL"],
  },
  {
    id: "CORE-CAOS-3",
    category: "VIBE_CAOS",
    categoryLabel: "VIBE CAOS™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago si gano un premio random en la radio?",
    options: [
      { id: "A", label: "Doy discurso dramático en vivo" },
      { id: "B", label: "Armo grupo para compartir el premio" },
      { id: "C", label: "Lo intercambio por algo más fabuloso" },
      { id: "D", label: "Lo guardo para plan loco futuro" }
    ],
    moods: ["SPICY", "DLUXE", "ARTSY"],
  },
  {
    id: "CORE-CAOS-4",
    category: "VIBE_CAOS",
    categoryLabel: "VIBE CAOS™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago si mi crush comparte mi meme viejo vergonzoso?",
    options: [
      { id: "A", label: "Lo remixo y lo subo con orgullo" },
      { id: "B", label: "Finjo que era estrategia viral" },
      { id: "C", label: "Le respondo con meme aún más ridículo" },
      { id: "D", label: "Me escondo un día y vuelvo con outfit épico" }
    ],
    moods: ["SPICY", "URBAN", "DLUXE"],
  },
  {
    id: "CORE-CAOS-5",
    category: "VIBE_CAOS",
    categoryLabel: "VIBE CAOS™",
    packId: "CORE_VIBES",
    spicyLevel: "SOFT",
    text: "¿Qué hago si me invitan a un plan en un lugar que no existe en Google Maps?",
    options: [
      { id: "A", label: "Voy igual, confío en la aventura" },
      { id: "B", label: "Investigo como detective y mando ubicación" },
      { id: "C", label: "Propongo cambiarlo por rooftop conocido" },
      { id: "D", label: "Armo mapa ilustrado siguiendo intuición" }
    ],
    moods: ["URBAN", "ARTSY", "SPICY"],
  },
];
