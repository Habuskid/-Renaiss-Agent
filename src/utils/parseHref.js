export function parseHref(href) {
  if (!href) return { game: '', set: '', card: '' }
  
  // Extract just the part after /card/ (handles both full URLs and relative paths)
  let path = href;
  const cardIndex = path.indexOf('/card/');
  if (cardIndex !== -1) {
    path = path.substring(cardIndex + 6);
  }
  
  // Clean up any trailing slashes or query params
  path = path.split('?')[0].replace(/\/$/, '');
  
  const parts = path.split('/');
  return { game: parts[0], set: parts[1], card: parts[2] }
}
