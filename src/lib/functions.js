export function hideAA(el, because = '', force = false) {
  // allow if it seems useful
  if (!force) {
    if (
      el._width > Math.max(410, window.innerWidth / 3) &&
      el._height > Math.max(410, window.innerHeight / 3)
    ) {
      return;
    }
  }
  // remove
  el.style.setProperty('display', 'none', 'important');
  el.style.setProperty('opacity', '0', 'important');
  el.style.setProperty('visibility', 'hidden', 'important');
  el.style.setProperty('pointer-events', 'none', 'important');
}

export function invisibleAA(el, because = '') {
  el.style.setProperty('opacity', '0', 'important');
  el.style.setProperty('visibility', 'hidden', 'important');
  el.style.setProperty('pointer-events', 'none', 'important');
}

export function is_gif_image(i) {
  return /^(?!data:).*\.gif/i.test(i.src);
}

export function freeze_gif(i) {
  let c = document.createElement('canvas');
  let w = (c.width = i.width);
  let h = (c.height = i.height);
  c?.getContext('2d')?.drawImage(i, 0, 0, w, h);
  try {
    i.src = c.toDataURL('image/gif'); // if possible, retain all css aspects
  } catch (e) {
    // cross-domain -- mimic original with all its tag attributes
    for (let j = 0, a; (a = i.attributes[j]); j++) c.setAttribute(a.name, a.value);
    i.parentNode.replaceChild(c, i);
  }
}
