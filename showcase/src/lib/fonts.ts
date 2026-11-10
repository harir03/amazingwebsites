/** Google Fonts axes each stand-in family needs (weights/italics the components use). */
const AXES: Record<string, string> = {
  Silkscreen: "",
  "Geist Mono": ":wght@400..600",
  "Space Grotesk": ":wght@400;700",
  Outfit: ":wght@600;700",
  "DM Sans": ":wght@400..700",
  "Bebas Neue": "",
  "Zilla Slab": ":wght@300;400",
  Inter: ":wght@300..600",
  "Inter Tight": ":wght@400..700",
  "Playfair Display": ":ital@0;1",
  "Luckiest Guy": "",
  Nunito: ":wght@400..900",
  "Cormorant Garamond": ":ital,wght@0,300;1,300",
  "IBM Plex Mono": ":wght@300;400;500",
};

export function primaryFamily(stack: string): string {
  return stack.split(",")[0].trim().replace(/^['"]|['"]$/g, "");
}

export function googleFontsHref(families: string[]): string {
  const q = families.map((f) => `family=${f.replace(/ /g, "+")}${AXES[f] ?? ""}`).join("&");
  return `https://fonts.googleapis.com/css2?${q}&display=swap`;
}

export function googleFontsLink(families: string[]): string {
  return `<link rel="stylesheet" href="${googleFontsHref(families)}" />`;
}
