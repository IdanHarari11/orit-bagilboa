/** Returns true when a carousel slide should mount its image (current + next). */
export function shouldMountSlide(index, currentIndex, total) {
  const nextIndex = (currentIndex + 1) % total;
  return index === currentIndex || index === nextIndex;
}

/** Returns true for carousel slides that should stay in DOM (current, prev, next). */
export function shouldMountGallerySlide(index, currentIndex, total) {
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;
  return index === currentIndex || index === prevIndex || index === nextIndex;
}
