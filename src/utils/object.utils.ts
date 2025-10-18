/**
 * Removes empty, null, or undefined fields from an object.
 * This is a generic utility that can be used with any object type.
 *
 * @template T - The type of the object to clean
 * @param {T} obj - The object to clean
 * @returns {Partial<T>} A new object with empty fields removed
 */
export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  // Si no es un objeto, retornar como está
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }

  const cleaned: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    // Skip null o undefined
    if (value === null || value === undefined) {
      continue;
    }

    // Manejar strings
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed === '') {
        continue;
      }
      cleaned[key as keyof T] = trimmed as T[keyof T];
      continue;
    }

    // Manejar arrays
    if (Array.isArray(value)) {
      // Saltar arrays vacíos
      if (value.length === 0) {
        continue;
      }

      // Limpiar items del array
      const cleanedArray = value
        .map(item => {
          // Si es un objeto plano, limpiarlo recursivamente
          if (
            typeof item === 'object' &&
            item !== null &&
            !Array.isArray(item) &&
            item.constructor === Object
          ) {
            return cleanObject(item);
          }
          return item;
        })
        .filter(item => {
          // Filtrar objetos vacíos resultantes de la limpieza
          if (
            typeof item === 'object' &&
            item !== null &&
            !Array.isArray(item) &&
            item.constructor === Object
          ) {
            return Object.keys(item).length > 0;
          }
          return true;
        });

      // Solo incluir el array si tiene elementos después de limpiar
      if (cleanedArray.length > 0) {
        cleaned[key as keyof T] = cleanedArray as T[keyof T];
      }
      continue;
    }

    // Manejar objetos planos (no Date, RegExp, etc.)
    if (typeof value === 'object' && value.constructor === Object) {
      const cleanedNested = cleanObject(value);
      // Solo incluir si el objeto limpio no está vacío
      if (Object.keys(cleanedNested).length > 0) {
        cleaned[key as keyof T] = cleanedNested as T[keyof T];
      }
      continue;
    }

    // Para todos los demás valores (numbers, booleans, Date, RegExp, etc.)
    cleaned[key as keyof T] = value;
  }

  return cleaned;
}

/**
 * Alias for cleanObject, maintained for backward compatibility
 */
export const cleanTestCase = cleanObject;
