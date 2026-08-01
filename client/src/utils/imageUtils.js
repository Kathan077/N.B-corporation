/**
 * Formats image URLs safely handling spaces, unicode characters, and '+' signs.
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  return encodeURI(imagePath).replace(/\+/g, '%2B');
};
