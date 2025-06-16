
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
  /cuántos tokens/i
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
];

// Patrones para detectar saludos comunes
const greetingPatterns = [
  /^(hola|hello|hi|hey|buenos días|buenas tardes|buenas noches|buen día|saludos)$/i,
  /^(hola|hello|hi|hey)\s*[.!]?$/i,
  /^(qué tal|como estas|cómo estás|que tal|como va)$/i,
];

// Patrones para detectar texto sin sentido
const nonsensePatterns = [
  /^[a-z]{1,3}$/i, // Una a tres letras solas
  /^[bcdfghjklmnpqrstvwxyz]{3,}$/i, // Solo consonantes
  /^(.)\1{3,}$/i, // Caracteres repetidos más de 3 veces
  /^[^a-záéíóúñü\s]{3,}$/i, // Solo símbolos o números sin letras
  /^\d+$/i, // Solo números
  /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/i, // Solo símbolos
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
  
  // Verificar si tiene muy pocas vocales (menos del 20% del texto)
  const vowelCount = (trimmedInput.match(/[aeiouáéíóúäëïöü]/gi) || []).length;
  const totalLetters = (trimmedInput.match(/[a-záéíóúñü]/gi) || []).length;
  
  if (totalLetters > 3 && vowelCount / totalLetters < 0.2) {
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
  ];
  
  return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
};

/**
 * Valida si el input del usuario es válido y no contiene patrones prohibidos ni hipotéticos
 * @param {string} input - El texto de entrada del usuario
 * @returns {Object} - { isValid: boolean, reason: string, isGreeting: boolean, isNonsense: boolean }
 */
export const isValidUserInput = (input) => {
  if (!input || typeof input !== 'string') {
    return { isValid: false, reason: 'Input inválido', isGreeting: false, isNonsense: false };
  }

  const trimmedInput = input.trim();

  // Validar longitud mínima
  if (trimmedInput.length < 1) {
    return { isValid: false, reason: 'Consulta muy corta', isGreeting: false, isNonsense: false };
  }

  // Detectar saludos
  if (isGreeting(trimmedInput)) {
    return { isValid: true, reason: '', isGreeting: true, isNonsense: false };
  }

  // Detectar texto sin sentido
  if (isNonsenseText(trimmedInput)) {
    return { 
      isValid: false, 
      reason: 'Por favor, escribe una consulta clara y completa sobre ProSalud, sus servicios o beneficios.',
      isGreeting: false,
      isNonsense: true
    };
  }

  // Validar longitud mínima para consultas reales (después de descartar saludos)
  if (trimmedInput.length < 3) {
    return { 
      isValid: false, 
      reason: 'Por favor, escribe una consulta más específica sobre ProSalud.',
      isGreeting: false,
      isNonsense: false
    };
  }

  // Validar longitud máxima por palabras (inputs sospechosamente largos)
  const wordCount = trimmedInput.split(/\s+/).length;
  if (wordCount > 100) {
    return { 
      isValid: false, 
      reason: 'Consulta demasiado extensa. Por favor, realice una consulta más concisa.',
      isGreeting: false,
      isNonsense: false
    };
  }

  // Verificar patrones prohibidos (incluyendo hipotéticos)
  for (const pattern of combinedForbiddenPatterns) {
    if (pattern.test(trimmedInput)) {
      return { 
        isValid: false, 
        reason: 'Lo siento, solo puedo responder preguntas reales y relacionadas con ProSalud, sus servicios y beneficios. Por favor, realiza una consulta relevante para ti como afiliado.',
        isGreeting: false,
        isNonsense: false
      };
    }
  }

  return { isValid: true, reason: '', isGreeting: false, isNonsense: false };
};

/**
 * Mensaje de error estándar para inputs no válidos
 */
export const getSecurityMessage = (reason) => {
  return reason || 'Lo siento, no puedo responder a solicitudes de este tipo. Por favor, realice consultas relacionadas a ProSalud, quienes somos, nuestros servicios y beneficios.';
};
