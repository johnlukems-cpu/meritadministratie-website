import { Link } from 'react-router';
import { Input, Select, Textarea } from '@/components/ui/Field';
import { routes } from '@/config/routes';
import { gewensteDiensten, organisatieTypes, startMomenten, urenPerMaand } from '@/data/forms';
import { useForm } from '@/lib/forms/useForm';
import { FormError, FormSuccess, Honeypot, SubmitRow } from './FormShell';

export function ContactForm() {
  const { formRef, onSubmit, status, errors, message } = useForm({
    kind: 'contact',
    schema: () => import('@/lib/forms/schemas').then((m) => m.contactSchema),
  });

  if (status === 'success') {
    return (
      <FormSuccess
        title="Bedankt voor uw bericht."
        text={message ?? 'Wij hebben uw aanvraag ontvangen en nemen zo spoedig mogelijk contact met u op.'}
      />
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="relative space-y-5"
      aria-label="Contactformulier"
    >
      <Honeypot />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Naam" name="naam" autoComplete="name" required error={errors.naam} />
        <Input
          label="Organisatie"
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

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Type organisatie"
          name="organisatieType"
          options={organisatieTypes}
          required
          error={errors.organisatieType}
        />
        <Select
          label="Gewenste dienst"
          name="gewensteDienst"
          options={gewensteDiensten}
          required
          error={errors.gewensteDienst}
        />
        <Select
          label="Gewenst aantal uren per maand"
          name="urenPerMaand"
          options={urenPerMaand}
          placeholder="Nog niet bekend"
          hint="Helpt ons een passend voorstel te doen."
          error={errors.urenPerMaand}
        />
        <Select
          label="Gewenste startdatum"
          name="gewensteStart"
          options={startMomenten}
          placeholder="Nog niet bekend"
          error={errors.gewensteStart}
        />
      </div>

      <Textarea
        label="Bericht"
        name="bericht"
        required
        rows={6}
        error={errors.bericht}
        placeholder="Welke werkzaamheden wilt u uitbesteden, en waar loopt het nu vast?"
      />

      {status === 'error' && <FormError text={message} />}

      <SubmitRow
        status={status}
        label="Verstuur bericht"
        note={
          <>
            Uw gegevens gebruiken wij alleen om contact met u op te nemen.{' '}
            <Link
              to={routes.privacy.path}
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacyverklaring
            </Link>
          </>
        }
      />
    </form>
  );
}
