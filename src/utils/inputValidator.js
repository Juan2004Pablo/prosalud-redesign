
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

/**
 * Valida si el input del usuario es válido y no contiene patrones prohibidos
 * @param {string} input - El texto de entrada del usuario
 * @returns {Object} - { isValid: boolean, reason: string }
 */
export const isValidUserInput = (input) => {
  if (!input || typeof input !== 'string') {
    return { isValid: false, reason: 'Input inválido' };
  }

  const trimmedInput = input.trim();
  
  // Validar longitud mínima
  if (trimmedInput.length < 2) {
    return { isValid: false, reason: 'Consulta muy corta' };
  }

  // Validar longitud máxima por palabras (inputs sospechosamente largos)
  const wordCount = trimmedInput.split(/\s+/).length;
  if (wordCount > 100) {
    return { 
      isValid: false, 
      reason: 'Consulta demasiado extensa. Por favor, realice una consulta más concisa.' 
    };
  }

  // Verificar patrones prohibidos
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(trimmedInput)) {
      return { 
        isValid: false, 
        reason: 'Lo siento, no puedo responder a solicitudes de este tipo. Por favor, realice consultas relacionadas a ProSalud, quienes somos, nuestros servicios y beneficios.' 
      };
    }
  }

  return { isValid: true, reason: '' };
};

/**
 * Mensaje de error estándar para inputs no válidos
 */
export const getSecurityMessage = (reason) => {
  return reason || 'Lo siento, no puedo responder a solicitudes de este tipo. Por favor, realice consultas relacionadas a ProSalud, quienes somos, nuestros servicios y beneficios.';
};
