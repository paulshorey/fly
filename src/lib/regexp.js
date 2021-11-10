export function is_gif_image(i) {
  return /^(?!data:).*\.gif/i.test(i.src);
}
