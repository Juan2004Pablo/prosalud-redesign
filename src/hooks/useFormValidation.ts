
import { z } from 'zod';

// Validaciones base que permiten encadenamiento
export const baseNameValidation = z
  .string()
  .min(2, 'Mínimo 2 caracteres')
  .max(50, 'Máximo 50 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,.]+$/, 'Solo se permiten letras, espacios, comas y puntos');

export const baseEmailValidation = z
  .string()
  .min(1, 'El correo electrónico es requerido')
  .email('Debe ser un correo electrónico válido')
  .max(100, 'Máximo 100 caracteres');

export const baseTextValidation = z
  .string()
  .max(500, 'Máximo 500 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,.\d]*$/, 'Solo se permiten letras, números, espacios, comas y puntos');

export const baseUrlValidation = z
  .string()
  .url('Debe ser una URL válida')
  .max(255, 'Máximo 255 caracteres');

export const baseCategoryValidation = z
  .string()
  .min(1, 'La categoría es requerida')
  .max(30, 'Máximo 30 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,.]+$/, 'Solo se permiten letras, espacios, comas y puntos');

// Validaciones finales con refinements de seguridad
export const nameValidation = baseNameValidation
  .refine(val => val.trim().length > 0, 'Este campo es requerido');

export const emailValidation = baseEmailValidation;

export const textValidation = baseTextValidation
  .refine(val => {
    // No permitir scripts, HTML, código malicioso o caracteres especiales peligrosos
    const dangerousPatterns = /<[^>]*>|javascript:|data:|vbscript:|on\w+\s*=|[\<\>\"\'\`\{\}\[\]\(\)\|\\\&\^\$\#\@\!\%\*\+\=\~\?]/i;
    return !dangerousPatterns.test(val);
  }, 'Contiene caracteres no permitidos o código malicioso');

export const urlValidation = baseUrlValidation
  .refine(val => {
    try {
      const url = new URL(val);
      return ['http:', 'https:'].includes(url.protocol);
    } catch {
      return false;
    }
  }, 'Debe ser una URL válida con http o https');

export const numberValidation = (min: number = 0, max: number = 10000) =>
  z
    .number({ invalid_type_error: 'Debe ser un número válido' })
    .min(min, `El valor mínimo es ${min}`)
    .max(max, `El valor máximo es ${max}`)
    .int('Debe ser un número entero');

export const categoryValidation = baseCategoryValidation;

export const useFormValidation = () => {
  return {
    nameValidation,
    emailValidation,
    textValidation,
    urlValidation,
    numberValidation,
    categoryValidation,
    baseNameValidation,
    baseEmailValidation,
    baseTextValidation,
    baseUrlValidation,
    baseCategoryValidation
  };
};
