export function slugify(input?: string | number): string {
  if (input == null) return "";
  const s = String(input);
  return s
    .toLowerCase()
    .normalize("NFKD") // decompose accents
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default slugify;
