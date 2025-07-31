/**
 * Removes empty, null, or undefined fields from an object.
 * This is a generic utility that can be used with any object type.
 * 
 * @template T - The type of the object to clean
 * @param {T} obj - The object to clean
 * @returns {Partial<T>} A new object with empty fields removed
 */
export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
    // If the input is not an object, return it as is
    if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
        return obj;
    }

    const cleaned: Partial<T> = {};
    
    for (const [key, value] of Object.entries(obj)) {
        // Skip if the value is null or undefined
        if (value === null || value === undefined) {
            continue;
        }
        
        // Handle empty strings (trim whitespace first)
        if (typeof value === 'string') {
            const trimmed = value.trim();
            if (trimmed === '') {
                continue;
            }
            cleaned[key as keyof T] = trimmed as T[keyof T];
            continue;
        }
        
        // Handle empty arrays
        if (Array.isArray(value)) {
            if (value.length > 0) {
                // Recursively clean array items if they are objects
                cleaned[key as keyof T] = (value as any[]).map(item => 
                    typeof item === 'object' && item !== null ? cleanObject(item) : item
                ) as T[keyof T];
            }
            continue;
        }
        
        // Handle objects (but not Dates, RegExps, etc.)
        if (typeof value === 'object' && value.constructor === Object) {
            const cleanedNested = cleanObject(value);
            if (Object.keys(cleanedNested).length > 0) {
                cleaned[key as keyof T] = cleanedNested as T[keyof T];
            }
            continue;
        }
        
        // For all other values (numbers, booleans, etc.), include them as is
        cleaned[key as keyof T] = value;
    }
    
    return cleaned;
}

/**
 * Alias for cleanObject, maintained for backward compatibility
 */
export const cleanTestCase = cleanObject;
