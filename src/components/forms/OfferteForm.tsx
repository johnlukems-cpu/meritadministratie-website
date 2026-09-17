import { useSyncExternalStore, type ReactNode } from 'react';
import { Link } from 'react-router';
import { Checkbox, CheckboxGroup, Input, Select, Textarea } from '@/components/ui/Field';
import { routes } from '@/config/routes';
import { branches, gewensteOndersteuning, huidigeSituaties, rechtsvormen } from '@/data/forms';
import { packages } from '@/data/packages';
import { useForm } from '@/lib/forms/useForm';
import { FormError, FormSuccess, Honeypot, SubmitRow } from './FormShell';

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-5">
      <legend className="mb-4 text-lg font-semibold text-primary">{legend}</legend>
      {children}
    </fieldset>
  );
}

export function OfferteForm() {
  // Vooraf gekozen pakket via /offerte?pakket=<id> (knoppen op de pakketkaarten).
  // Via useSyncExternalStore met server-snapshot null, zodat de geprerenderde HTML
  // (zonder query) zonder hydratiefout wordt overgenomen.
  const chosenId = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get('pakket'),
    () => null,
  );
  const chosenPackage = packages.find((p) => p.id === chosenId);

  const { formRef, onSubmit, status, errors, message } = useForm({
    kind: 'offerte',
    schema: () => import('@/lib/forms/schemas').then((m) => m.offerteSchema),
    arrayFields: ['gewensteOndersteuning'],
    booleanFields: ['privacyAkkoord'],
  });

  if (status === 'success') {
    return (
      <FormSuccess
        title="Bedankt voor uw offerteaanvraag."
        text={message ?? 'Wij bekijken uw gegevens en nemen zo snel mogelijk contact met u op.'}
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-10" aria-label="Offerteformulier">
      <Honeypot />
      {chosenPackage && (
        <>
          <input type="hidden" name="pakket" value={chosenPackage.name} />
          <p className="rounded-lg border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-text">
            Gekozen pakket: <strong className="font-semibold">{chosenPackage.name}</strong> (vanaf €{' '}
            {chosenPackage.priceFrom} p/m, excl. btw). Wij nemen dit mee in het voorstel.
          </p>
        </>
      )}

      <Fieldset legend="Uw gegevens">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Naam" name="naam" autoComplete="name" required error={errors.naam} />
          <Input label="Bedrijfsnaam" name="bedrijfsnaam" autoComplete="organization" error={errors.bedrijfsnaam} />
          <Input label="E-mailadres" name="email" type="email" autoComplete="email" inputMode="email" required error={errors.email} />
          <Input label="Telefoonnummer" name="telefoon" type="tel" autoComplete="tel" inputMode="tel" error={errors.telefoon} />
        </div>
      </Fieldset>

      <Fieldset legend="Uw onderneming">
        <div className="grid gap-5 sm:grid-cols-2">
          <Select label="Rechtsvorm" name="rechtsvorm" options={rechtsvormen} required error={errors.rechtsvorm} />
          <Select label="Branche" name="branche" options={branches} required error={errors.branche} />
        </div>
        <Select
          label="Huidige situatie"
          name="huidigeSituatie"
          options={huidigeSituaties}
          required
          error={errors.huidigeSituatie}
        />
      </Fieldset>

      <Fieldset legend="Gewenste ondersteuning">
        <CheckboxGroup
          legend="Waar kunnen wij u mee helpen?"
          name="gewensteOndersteuning"
          options={gewensteOndersteuning}
          required
          hint="Meerdere keuzes mogelijk."
          error={errors.gewensteOndersteuning}
        />
      </Fieldset>

      <Fieldset legend="Omvang van uw administratie">
        <p className="-mt-2 text-sm text-muted">
          Een inschatting is voldoende; dit helpt ons een passend voorstel te maken.
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          <Input label="Transacties per maand" name="transactiesPerMaand" inputMode="numeric" placeholder="bijv. 50" error={errors.transactiesPerMaand} />
          <Input label="Verkoopfacturen per maand" name="verkoopfacturen" inputMode="numeric" placeholder="bijv. 10" error={errors.verkoopfacturen} />
          <Input label="Inkoopfacturen per maand" name="inkoopfacturen" inputMode="numeric" placeholder="bijv. 20" error={errors.inkoopfacturen} />
        </div>
        <Textarea
          label="Bericht"
          name="bericht"
          rows={5}
          placeholder="Is er iets dat wij moeten weten over uw situatie of wensen?"
          error={errors.bericht}
        />
      </Fieldset>

      <div className="space-y-5">
        <Checkbox
          name="privacyAkkoord"
          required
          error={errors.privacyAkkoord}
          label={
            <>
              Ik ga akkoord met het{' '}
              <Link to={routes.privacy.path} className="font-medium text-primary underline underline-offset-4">
                privacybeleid
              </Link>
              .
            </>
          }
        />
        {status === 'error' && <FormError text={message} />}
        <SubmitRow status={status} label="Verstuur offerteaanvraag" note="Vrijblijvend en zonder verplichtingen." />
      </div>
    </form>
  );
}
