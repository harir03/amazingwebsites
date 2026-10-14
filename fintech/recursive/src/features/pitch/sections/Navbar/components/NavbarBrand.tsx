import { AppLogo } from "@/components/app-logo";

export const NavbarBrand = () => {
  return (
    <a
      aria-label="LOREM IPSUM – home"
      href="/"
      className="items-center box-border caret-transparent flex shrink-0 relative no-underline px-2 py-1 rounded-full transition-transform duration-200 hover:scale-[1.02] active:scale-95"
    >
      <AppLogo variant="nav" showSublabel={false} />
    </a>
  );
};