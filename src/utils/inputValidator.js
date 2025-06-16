
// Patrones prohibidos para prevenir red teaming, prompt injection y acceso a parámetros internos
const forbiddenPatterns = [
  /tokens?/i,
  /modelo/i,
  /parámetros/i,
  /temperatura/i,
  /frecuencia de penalización/i,
  /top-p/i,
  /logit/i,
  /api/i,
  /arquitectura/i,
  /red team/i,
  /ingeniería inversa/i,
  /prompt injection/i,
  /simula/i,
  /ignora/i,
  /actúa como/i,
  /pregunta sugerida/i,
  /longitud.*tokens?/i,
  /500\s+tokens?/i,
  /sistema de IA/i,
  /cuántos tokens/i,
  /openai/i,
  /gpt/i,
  /claude/i,
  /chatbot/i,
  /inteligencia artificial/i,
  /machine learning/i,
  /configuración/i,
  /secretos/i,
  /variables de entorno/i
];

// Nuevos patrones para escenarios hipotéticos y roles irreales
const hypotheticalPatterns = [
  /situaci[oó]n (completamente )?(hipot[eé]tica|irreal)/i,
  /escenario (hipot[eé]tico|irreal)/i,
  /rol ?play/i,
  /finge que/i,
  /sup[oó]n que/i,
  /imagina que/i,
  /haz de cuenta que/i,
  /inventa que/i,
  /simula que/i,
  /act[uú]a como/i,
  /haz como si/i,
  /pregunta hipot[eé]tica/i,
  /pregunta irreal/i,
  /hazme creer que/i,
  /eres un/i,
  /pretendes ser/i,
  /juegas el papel/i
];

// Patrones para detectar saludos comunes
const greetingPatterns = [
  /^(hola|hello|hi|hey|buenos días|buenas tardes|buenas noches|buen día|saludos)$/i,
  /^(hola|hello|hi|hey)\s*[.!]?$/i,
  /^(qué tal|como estas|cómo estás|que tal|como va)$/i,
  /^(buenas|muy buenas|buen día)$/i,
  /^(gracias|muchas gracias|thanks)$/i
];

// Patrones para detectar texto sin sentido y spam
const nonsensePatterns = [
  /^[a-z]{1,3}$/i, // Una a tres letras solas
  /^[bcdfghjklmnpqrstvwxyz]{3,}$/i, // Solo consonantes
  /^(.)\1{3,}$/i, // Caracteres repetidos más de 3 veces
  /^[^a-záéíóúñü\s]{3,}$/i, // Solo símbolos o números sin letras
  /^\d+$/i, // Solo números
  /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/i, // Solo símbolos
  /^(test|testing|prueba|probando)$/i, // Palabras de prueba comunes
  /^(lol|jaja|jeje|xd|lmao)$/i, // Expresiones sin contenido
  /^(.|..|...)$/i, // Solo puntos
  /^(aaaaa|eeeee|iiiii|ooooo|uuuuu)$/i, // Vocales repetidas
  /^(qwerty|asdf|zxcv|123|abc)$/i // Secuencias de teclado
];

// Patrones para detectar despedidas
const farewellPatterns = [
  /^(adiós|adios|bye|chao|hasta luego|nos vemos|hasta la vista)$/i,
  /^(que tengas buen día|que estés bien|cuídate)$/i,
  /^(gracias por la ayuda|muchas gracias|perfecto gracias)$/i
];

// Patrones para detectar preguntas off-topic
const offTopicPatterns = [
  /clima|tiempo|weather/i,
  /fútbol|deportes|football|soccer/i,
  /política|elecciones|presidente/i,
  /entretenimiento|música|películas|series/i,
  /cocina|recetas|comida/i,
  /viajes|turismo|vacaciones/i,
  /tecnología(?!.*prosalud)|programación|código/i,
  /religión|filosofía|espiritualidad/i,
  /juegos|gaming|videojuegos/i
];

// Fusionar patrones originales y nuevos
const combinedForbiddenPatterns = [
  ...forbiddenPatterns,
  ...hypotheticalPatterns,
];

/**
 * Detecta si el input es un saludo
 * @param {string} input - El texto de entrada del usuario
 * @returns {boolean} - true si es un saludo
 */
export const isGreeting = (input) => {
  if (!input || typeof input !== 'string') return false;
  
  const trimmedInput = input.trim();
  return greetingPatterns.some(pattern => pattern.test(trimmedInput));
};

/**
 * Detecta si el input es una despedida
 * @param {string} input - El texto de entrada del usuario
 * @returns {boolean} - true si es una despedida
 */
export const isFarewell = (input) => {
  if (!input || typeof input !== 'string') return false;
  
  const trimmedInput = input.trim();
  return farewellPatterns.some(pattern => pattern.test(trimmedInput));
};

/**
 * Detecta si el input es off-topic (fuera de tema)
 * @param {string} input - El texto de entrada del usuario
 * @returns {boolean} - true si es off-topic
 */
export const isOffTopic = (input) => {
  if (!input || typeof input !== 'string') return false;
  
  const trimmedInput = input.trim();
  return offTopicPatterns.some(pattern => pattern.test(trimmedInput));
};

/**
 * Detecta si el input es texto sin sentido
 * @param {string} input - El texto de entrada del usuario
 * @returns {boolean} - true si es texto sin sentido
 */
export const isNonsenseText = (input) => {
  if (!input || typeof input !== 'string') return false;
  
  const trimmedInput = input.trim();
  
  // Verificar si cumple con los patrones de texto sin sentido
  if (nonsensePatterns.some(pattern => pattern.test(trimmedInput))) {
    return true;
  }
  
  // Verificar si tiene muy pocas vocales (menos del 15% del texto)
  const vowelCount = (trimmedInput.match(/[aeiouáéíóúäëïöü]/gi) || []).length;
  const totalLetters = (trimmedInput.match(/[a-záéíóúñü]/gi) || []).length;
  
  if (totalLetters > 4 && vowelCount / totalLetters < 0.15) {
    return true;
  }
  
  // Verificar si es demasiado repetitivo
  const uniqueChars = new Set(trimmedInput.toLowerCase().replace(/\s/g, ''));
  if (totalLetters > 3 && uniqueChars.size < 3) {
    return true;
  }
  
  return false;
};

/**
 * Genera una respuesta automática para saludos
 * @returns {string} - Mensaje de saludo apropiado
 */
export const getGreetingResponse = () => {
  const greetingResponses = [
    "¡Hola! Soy tu asistente virtual de ProSalud. ¿En qué puedo ayudarte hoy?",
    "¡Buenos días! Soy el asistente de ProSalud. ¿Cómo puedo asistirte?",
    "¡Hola! ¿En qué puedo ayudarte con los servicios de ProSalud?",
    "¡Saludos! Estoy aquí para ayudarte con información sobre ProSalud. ¿Qué necesitas saber?"
  ];
  
  return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
};

/**
 * Genera una respuesta automática para despedidas
 * @returns {string} - Mensaje de despedida apropiado
 */
export const getFarewellResponse = () => {
  const farewellResponses = [
    "¡Hasta luego! Que tengas un excelente día. Recuerda que estoy aquí cuando necesites ayuda con ProSalud.",
    "¡Nos vemos! Si tienes más consultas sobre ProSalud, no dudes en escribirme.",
    "¡Cuídate! Gracias por usar el asistente de ProSalud. ¡Hasta la próxima!",
    "¡Adiós! Espero haber podido ayudarte. Estoy disponible cuando necesites información sobre ProSalud."
  ];
  
  return farewellResponses[Math.floor(Math.random() * farewellResponses.length)];
};

/**
 * Valida si el input del usuario es válido y no contiene patrones prohibidos ni hipotéticos
 * @param {string} input - El texto de entrada del usuario
 * @returns {Object} - { isValid: boolean, reason: string, messageType: string, autoResponse?: string }
 */
export const isValidUserInput = (input) => {
  if (!input || typeof input !== 'string') {
    return { 
      isValid: false, 
      reason: 'Input inválido', 
      messageType: 'invalid'
    };
  }

  const trimmedInput = input.trim();

  // Validar longitud mínima
  if (trimmedInput.length < 1) {
    return { 
      isValid: false, 
      reason: 'Consulta muy corta', 
      messageType: 'invalid'
    };
  }

  // Detectar saludos
  if (isGreeting(trimmedInput)) {
    return { 
      isValid: true, 
      reason: '', 
      messageType: 'greeting',
      autoResponse: getGreetingResponse()
    };
  }

  // Detectar despedidas
  if (isFarewell(trimmedInput)) {
    return { 
      isValid: true, 
      reason: '', 
      messageType: 'farewell',
      autoResponse: getFarewellResponse()
    };
  }

  // Detectar texto sin sentido
  if (isNonsenseText(trimmedInput)) {
    return { 
      isValid: false, 
      reason: 'Por favor, escribe una consulta clara y completa sobre ProSalud, sus servicios o beneficios.',
      messageType: 'nonsense'
    };
  }

  // Detectar temas fuera de contexto
  if (isOffTopic(trimmedInput)) {
    return { 
      isValid: false, 
      reason: 'Solo puedo ayudarte con consultas relacionadas con ProSalud, sus servicios y beneficios. ¿Hay algo específico del sindicato que te gustaría saber?',
      messageType: 'off-topic'
    };
  }

  // Validar longitud mínima para consultas reales (después de descartar saludos)
  if (trimmedInput.length < 3) {
    return { 
      isValid: false, 
      reason: 'Por favor, escribe una consulta más específica sobre ProSalud.',
      messageType: 'too-short'
    };
  }

  // Validar longitud máxima por palabras (inputs sospechosamente largos)
  const wordCount = trimmedInput.split(/\s+/).length;
  if (wordCount > 100) {
    return { 
      isValid: false, 
      reason: 'Consulta demasiado extensa. Por favor, realice una consulta más concisa.',
      messageType: 'too-long'
    };
  }

  // Verificar patrones prohibidos (incluyendo hipotéticos)
  for (const pattern of combinedForbiddenPatterns) {
    if (pattern.test(trimmedInput)) {
      return { 
        isValid: false, 
        reason: 'Solo puedo responder preguntas reales y relacionadas con ProSalud, sus servicios y beneficios. Por favor, realiza una consulta relevante para ti como afiliado.',
        messageType: 'forbidden'
      };
    }
  }

  return { 
    isValid: true, 
    reason: '', 
    messageType: 'valid'
  };
};

/**
 * Mensaje de error estándar para inputs no válidos
 */
export const getSecurityMessage = (reason) => {
  return reason || 'Lo siento, no puedo responder a solicitudes de este tipo. Por favor, realice consultas relacionadas a ProSalud, quienes somos, nuestros servicios y beneficios.';
};

/**
 * Detecta si la consulta requiere información de contacto
 * @param {string} input - El texto de entrada del usuario
 * @returns {boolean} - true si requiere información de contacto
 */
export const requiresContactInfo = (input) => {
  if (!input || typeof input !== 'string') return false;
  
  const contactKeywords = [
    /teléfono|telefono|número|llamar/i,
    /correo|email|mail|escribir/i,
    /contacto|comunicarse|contactar/i,
    /dirección|direccion|ubicación|ubicacion|donde están|dónde están/i,
    /horario|atención|atienden/i
  ];
  
  return contactKeywords.some(pattern => pattern.test(input));
};
