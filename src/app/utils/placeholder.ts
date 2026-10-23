const cache = new Map<string, string>();

/** Imagen por defecto (SVG dorado con el icono de la categoría). */
export function placeholderFor(icon: string): string {
  let uri = cache.get(icon);
  if (!uri) {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">' +
      '<defs><radialGradient id="g"><stop offset="0" stop-color="#3a2d12"/><stop offset="1" stop-color="#0d0a06"/></radialGradient></defs>' +
      '<rect width="240" height="240" fill="url(#g)"/>' +
      '<circle cx="120" cy="120" r="70" fill="none" stroke="#c9a84c" stroke-opacity=".5" stroke-width="2"/>' +
      `<text x="120" y="122" font-size="72" text-anchor="middle" dominant-baseline="central">${icon}</text></svg>`;
    uri = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    cache.set(icon, uri);
  }
  return uri;
}
