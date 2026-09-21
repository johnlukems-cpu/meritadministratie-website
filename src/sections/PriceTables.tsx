import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { mutationTiers, mutationTiersNote, priceGroups, quotedServicesNote, type PriceGroup } from '@/data/packages';

/** Eén tarieventabel (dienst → vanaf-prijs). */
export function PriceGroupTable({ group }: { group: PriceGroup }) {
  return (
    <div className="reveal overflow-hidden rounded-lg border border-default bg-surface">
      <div className="border-b border-default bg-surface-alt px-5 py-3.5">
        <h3 className="text-base font-semibold">{group.title}</h3>
        {group.intro && <p className="mt-1 text-sm text-muted">{group.intro}</p>}
      </div>
      <table className="w-full text-[0.9375rem]">
        <caption className="sr-only">{group.title} — vanaf-tarieven exclusief btw</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Dienst</th>
            <th scope="col">Vanaf</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-default">
          {group.items.map((item) => (
            <tr key={item.name}>
              <th scope="row" className="px-5 py-3 text-left font-medium text-text">
                {item.name}
                {item.note && <span className="block text-xs font-normal text-muted">{item.note}</span>}
              </th>
              <td className="px-5 py-3 text-right font-semibold whitespace-nowrap text-primary tabular-nums">
                {item.free ? (
                  <span className="inline-flex items-center rounded-full border border-accent/50 bg-accent-soft px-3 py-1 text-xs font-bold tracking-wide text-accent-text uppercase">
                    {item.price}
                  </span>
                ) : (
                  item.price
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {group.footnote && (
        <p className="border-t border-default bg-surface-alt px-5 py-3.5 text-sm leading-relaxed text-muted">
          {group.footnote}
        </p>
      )}
    </div>
  );
}

/** Mutatiegerichte prijsstructuur (Prijzenoverzicht 2026). */
export function MutationTable() {
  return (
    <div className="reveal overflow-hidden rounded-lg border border-default bg-surface">
      <div className="border-b border-default bg-surface-alt px-5 py-3.5">
        <h3 className="text-base font-semibold">Financiële administratie per aantal mutaties</h3>
        <p className="mt-1 text-sm text-muted">
          Inbegrepen: financiële verwerking • btw-aangifte • basiscontrole. Prijs per maand, vanaf, excl. btw.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[0.9375rem]">
          <caption className="sr-only">Prijs per maand op basis van het aantal mutaties</caption>
          <thead>
            <tr className="text-left text-xs font-semibold tracking-wide text-subtle uppercase">
              <th scope="col" className="px-5 py-2.5">Mutaties per maand</th>
              <th scope="col" className="px-5 py-2.5 text-right">Prijs per maand</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-default">
            {mutationTiers.map((tier) => (
              <tr key={tier.mutations}>
                <th scope="row" className="px-5 py-2.5 text-left font-medium text-text tabular-nums">
                  tot {tier.mutations}
                </th>
                <td className="px-5 py-2.5 text-right font-semibold text-primary tabular-nums">€ {tier.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-default px-5 py-3.5 text-sm text-muted">{mutationTiersNote}</p>
    </div>
  );
}

/** Volledig tarievenoverzicht: mutatietabel + aangiften, jaarwerk en AFAS. */
export function PriceTables() {
  return (
    <Section id="tarieven" tone="alt" aria-labelledby="tarieven-title">
      <Container>
        <SectionHeading
          id="tarieven-title"
          eyebrow="Tarieven"
          title="Losse diensten en aanvullende tarieven"
          description="Alle bedragen zijn vanaf-tarieven en exclusief 21% btw. Zo weet u vooraf waar u aan toe bent."
          className="reveal"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <MutationTable />
          <div className="grid gap-6">
            {priceGroups.map((group) => (
              <PriceGroupTable key={group.id} group={group} />
            ))}
          </div>
        </div>
        <p className="reveal mt-8 max-w-3xl text-sm text-muted">
          <strong className="font-semibold text-text">Aanvullende diensten:</strong> {quotedServicesNote}
        </p>
      </Container>
    </Section>
  );
}
