import type { AnchorHTMLAttributes } from "react";
import { navigate, withBase } from "../lib/router";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; morph?: string | null; replace?: boolean };

export function Link({ to, morph, replace, onClick, ...rest }: LinkProps) {
  return (
    <a
      href={withBase(to)}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to, { morph, replace });
      }}
      {...rest}
    />
  );
}
