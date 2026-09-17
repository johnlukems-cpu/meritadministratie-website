import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { siteConfig } from '@/config/site';

/** Smalle balk boven de header. Instelbaar via siteConfig.announcement. */
export function AnnouncementBar() {
  const { announcement } = siteConfig;
  if (!announcement.enabled) return null;

  return (
    <div className="bg-surface-dark text-on-dark">
      <div className="container-site flex min-h-10 items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-[0.8125rem] sm:text-sm">
        <p className="hidden text-on-dark-muted sm:block">{announcement.text}</p>
        <Link
          to={announcement.linkTo}
          className="inline-flex shrink-0 items-center gap-1 font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-white"
        >
          {announcement.linkLabel}
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
