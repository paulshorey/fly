/**
 * Safely returns property of object, or default value if property is not found
 * @param {Object} obj - dictionary
 * @param {String} prop - key
 * @param {Any} def - default value
 */
export function objProp(obj, prop, defaultValue) {
  return obj && typeof obj === 'object' && prop in obj ? !!obj[prop] : defaultValue;
}
