import { useSyncExternalStore, type ReactNode } from 'react';
import { Link } from 'react-router';
import { Checkbox, Input, Select, Textarea } from '@/components/ui/Field';
import { routes } from '@/config/routes';
import { offerteDiensten } from '@/data/forms';
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

/** Leest één queryparameter, met een server-snapshot van null (geen hydratiefout). */
function useQueryParam(name: string): string | null {
  return useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );
}

/** Zet `?pakket=…` om naar een leesbaar label voor in de aanvraag. */
function resolvePackage(value: string | null): string | null {
  if (!value) return null;
  const id = value.startsWith('mkb-') ? value.slice('mkb-'.length) : value;
  const pkg = packages.find((p) => p.id === id);
  return pkg ? `${pkg.name} — vanaf € ${pkg.priceFrom} p/m` : null;
}

export function OfferteForm() {
  const rawService = useQueryParam('dienst');
  const chosen = offerteDiensten.some((o) => o.value === rawService) ? (rawService as string) : '';
  const chosenLabel = offerteDiensten.find((o) => o.value === chosen)?.label;
  const chosenPackage = resolvePackage(useQueryParam('pakket'));

  const { formRef, onSubmit, status, errors, message } = useForm({
    kind: 'offerte',
    schema: () => import('@/lib/forms/schemas').then((m) => m.offerteSchema),
    booleanFields: ['privacyAkkoord'],
  });

  if (status === 'success') {
    return (
      <FormSuccess
        title="Bedankt voor uw aanvraag."
        text={
          message ??
          'We beoordelen de werkzaamheden en nemen contact met u op om de scope en een passend vast tarief af te stemmen.'
        }
      />
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="relative space-y-10"
      aria-label="Offerteformulier"
    >
      <Honeypot />

      {chosenPackage && (
        <>
          <input type="hidden" name="pakket" value={chosenPackage} />
          <p className="rounded-lg border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-text">
            Uw keuze: <strong className="font-semibold">{chosenPackage}</strong>, exclusief btw. Wij
            nemen dit mee in het voorstel.
          </p>
        </>
      )}

      {chosenLabel && (
        <p className="rounded-lg border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-text">
          Uw aanvraag gaat over <strong className="font-semibold">{chosenLabel}</strong>. U kunt dit
          hieronder nog aanpassen.
        </p>
      )}

      <Fieldset legend="Uw gegevens">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input label="Naam" name="naam" autoComplete="name" required error={errors.naam} />
          <Input
            label="Bedrijfsnaam"
            name="bedrijfsnaam"
            autoComplete="organization"
            required
            error={errors.bedrijfsnaam}
          />
          <Input
            label="E-mailadres"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            error={errors.email}
          />
          <Input
            label="Telefoonnummer"
            name="telefoon"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            error={errors.telefoon}
          />
        </div>
      </Fieldset>

      <Fieldset legend="Uw aanvraag">
        <Select
          key={chosen || 'leeg'}
          label="Gewenste dienst"
          name="gewensteDienst"
          options={offerteDiensten}
          defaultValue={chosen}
          required
          error={errors.gewensteDienst}
        />

        <div className="grid gap-5 sm:grid-cols-3">
          <Input
            label="Aantal administraties"
            name="aantalAdministraties"
            inputMode="numeric"
            placeholder="bijv. 25"
            error={errors.aantalAdministraties}
          />
          <Input
            label="Boekhoudsoftware"
            name="boekhoudsoftware"
            placeholder="bijv. AFAS"
            error={errors.boekhoudsoftware}
          />
          <Input
            label="Gewenste periode of deadline"
            name="periode"
            placeholder="bijv. voor 1 maart"
            error={errors.periode}
          />
        </div>

        <Textarea
          label="Omschrijving van de werkzaamheden"
          name="omschrijving"
          required
          rows={6}
          placeholder="Welke werkzaamheden wilt u uit handen geven, om welke periode gaat het en hoe staat uw administratie er nu voor?"
          hint="Hoe concreter u dit beschrijft, hoe nauwkeuriger ons voorstel kan zijn."
          error={errors.omschrijving}
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
              <Link
                to={routes.privacy.path}
                className="font-medium text-primary underline underline-offset-4"
              >
                privacybeleid
              </Link>
              .
            </>
          }
        />
        {status === 'error' && <FormError text={message} />}
        <SubmitRow
          status={status}
          label="Vraag een prijsvoorstel aan"
          note="Vrijblijvend. Dit is een aanvraag, geen automatische prijsberekening."
        />
      </div>
    </form>
  );
}
