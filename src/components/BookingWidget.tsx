import { CalendarClock } from 'lucide-react';
import { siteConfig } from '@/config/site';

/**
 * Agenda-/afspraakplanner.
 *
 * Nu: nette placeholder ("wordt binnenkort gekoppeld").
 * Later: vul `siteConfig.integrations.bookingUrl` in (bijv. een Calendly- of
 * Microsoft Bookings-link) en dit component toont een knop naar de planner.
 * Wilt u de planner inline embedden, vervang dan het blok hieronder door de
 * embed van de gekozen tool (iframe/script) — de rest van de pagina hoeft niet te wijzigen.
 */
export function BookingWidget() {
  const url = siteConfig.integrations.bookingUrl;

  return (
    <div className="rounded-lg border border-dashed border-strong bg-surface-alt p-6">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary"
        >
          <CalendarClock className="size-5" />
        </span>
        <div>
          <p className="font-semibold text-primary">Direct een moment kiezen</p>
          {url ? (
            <>
              <p className="mt-1 text-sm text-muted">
                Kies zelf een moment dat u uitkomt in onze online agenda.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-sm font-semibold text-primary underline underline-offset-4"
              >
                Open de agenda
              </a>
            </>
          ) : (
            <p className="mt-1 text-sm text-muted">
              De online agenda wordt binnenkort gekoppeld. Tot die tijd plant u een kennismaking
              eenvoudig via het formulier; wij stemmen dan een moment met u af.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
