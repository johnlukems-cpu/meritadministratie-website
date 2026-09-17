import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  className?: string;
  /** Index van het item dat standaard open staat (undefined = alles dicht) */
  defaultOpen?: number;
}

/**
 * Toegankelijke accordion (FAQ): knoppen met aria-expanded/aria-controls,
 * inhoud in een region. Werkt zonder JS in geprerenderde HTML als "dicht".
 */
export function Accordion({ items, className, defaultOpen }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);
  const baseId = useId();

  return (
    <div className={cn('divide-y divide-default rounded-lg border border-default bg-surface', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question}>
            <h3 className="m-0 text-base font-medium tracking-normal">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[1.0625rem] font-semibold text-primary transition-colors hover:bg-surface-alt md:px-6 md:py-5"
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-5 shrink-0 text-muted transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 md:px-6 md:pb-6"
            >
              <p className="text-[0.9375rem] leading-relaxed text-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
