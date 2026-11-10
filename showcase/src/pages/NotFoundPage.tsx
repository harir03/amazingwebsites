import { paths } from "../lib/router";
import { Link } from "../components/Link";

export function NotFoundPage({ what = "page" }: { what?: "page" | "component" | "site" }) {
  return (
    <div className="px-4 pt-16 pb-24 sm:px-8 lg:px-12">
      <h1 className="type-display text-[clamp(44px,5vw,72px)] leading-[0.93]">No {what} at this address</h1>
      <p className="mt-4 max-w-[52ch] text-[17px] text-ink-2">The link may be from an older version of the hub. Search for it, or start from the overview.</p>
      <Link to={paths.home} className="mt-6 inline-flex rounded-lg bg-ink px-4 py-2 text-[15px] font-medium text-white hover:bg-ink-2">
        Go to the overview
      </Link>
    </div>
  );
}
