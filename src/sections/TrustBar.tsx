import type { LucideIcon } from 'lucide-react';
import { ArrowRightLeft, FolderKanban, Landmark, MessageCircleHeart, Workflow } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface TrustItem {
  title: string;
  text: string;
  icon: LucideIcon;
}

const items: TrustItem[] = [
  { title: 'Administratie', text: 'Overzichtelijk en actueel in AFAS.', icon: FolderKanban },
  { title: 'Aangiften & jaarwerk', text: 'Btw, ICP, IB, vpb en jaarrekening.', icon: Landmark },
  { title: 'AFAS-specialist', text: 'Inrichting, optimalisatie en migratie.', icon: Workflow },
  { title: 'Overstappen', text: 'Zorgvuldige overname van uw administratie.', icon: ArrowRightLeft },
  {
    title: 'Vast aanspreekpunt',
    text: 'Persoonlijk contact, vaste tarieven.',
    icon: MessageCircleHeart,
  },
];

/** Rustige vertrouwensbalk direct onder de hero — vijf kernpunten, geen cijfers. */
export function TrustBar() {
  return (
    <section aria-label="Kernpunten" className="border-y border-default bg-surface">
      <Container>
        <ul className="grid grid-cols-1 divide-y divide-default sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5">
          {items.map((item, i) => (
            <li
              key={item.title}
              className={
                'flex items-start gap-3.5 py-5 sm:px-4 sm:py-7 ' +
                (i > 0 ? 'lg:border-l lg:border-default ' : '') +
                (i % 2 === 1 ? 'sm:border-l sm:border-default lg:border-l ' : '') +
                (i >= 2 ? 'sm:border-t sm:border-default lg:border-t-0 ' : '') +
                (i === 4 ? 'sm:col-span-2 lg:col-span-1 ' : '')
              }
            >
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary"
              >
                <item.icon className="size-5" />
              </span>
              <div>
                <p className="text-[0.9375rem] font-semibold text-primary">{item.title}</p>
                <p className="mt-0.5 text-sm text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
