/**
 * Formats image URLs safely handling spaces, unicode characters, and '+' signs.
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return encodeURI(cleanPath).replace(/\+/g, '%2B');
};
