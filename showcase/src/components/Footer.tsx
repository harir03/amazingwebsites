export function Footer() {
  return (
    <footer className="mt-8 flex flex-col gap-3 border-t border-rule py-8 text-[14px] text-muted sm:flex-row sm:items-start sm:justify-between">
      <p className="max-w-[62ch] leading-relaxed">
        Educational recreations written from scratch, inspired by public websites. Brand names are used for attribution only; no proprietary code, fonts or assets ship in the
        component snippets.
      </p>
      <p className="flex shrink-0 gap-4">
        <a href="https://github.com/harir03/frontend_copied" target="_blank" rel="noreferrer" className="text-ink-2 underline-offset-4 hover:text-ink hover:underline">
          GitHub repository
        </a>
        <span>MIT licensed</span>
      </p>
    </footer>
  );
}
