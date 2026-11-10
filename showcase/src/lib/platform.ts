const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/** Label for the primary modifier key: ⌘ on Apple devices, Ctrl elsewhere. */
export const MOD_KEY = isMac ? "⌘" : "Ctrl";
export const MOD_KEY_ARIA = isMac ? "Meta+K" : "Control+K";
