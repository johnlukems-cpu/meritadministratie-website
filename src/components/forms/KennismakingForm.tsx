import { Link } from 'react-router';
import { Input, Select, Textarea } from '@/components/ui/Field';
import { routes } from '@/config/routes';
import { kennismakingDiensten } from '@/data/forms';
import { useForm } from '@/lib/forms/useForm';
import { FormError, FormSuccess, Honeypot, SubmitRow } from './FormShell';

export function KennismakingForm() {
  const { formRef, onSubmit, status, errors, message } = useForm({
    kind: 'kennismaking',
    schema: () => import('@/lib/forms/schemas').then((m) => m.kennismakingSchema),
  });

  if (status === 'success') {
    return (
      <FormSuccess
        title="Bedankt, uw aanvraag is ontvangen."
        text={message ?? 'Wij nemen contact met u op om een moment voor de kennismaking af te stemmen.'}
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-5" aria-label="Kennismakingsformulier">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Naam" name="naam" autoComplete="name" required error={errors.naam} />
        <Input label="Bedrijfsnaam" name="bedrijfsnaam" autoComplete="organization" error={errors.bedrijfsnaam} />
        <Input label="E-mailadres" name="email" type="email" autoComplete="email" inputMode="email" required error={errors.email} />
        <Input label="Telefoonnummer" name="telefoon" type="tel" autoComplete="tel" inputMode="tel" error={errors.telefoon} />
      </div>
      <Select label="Gewenste dienst" name="gewensteDienst" options={kennismakingDiensten} required error={errors.gewensteDienst} />
      <Textarea
        label="Bericht"
        name="bericht"
        rows={4}
        placeholder="Vertel kort iets over uw onderneming of uw vraag (optioneel)."
        error={errors.bericht}
      />

      {status === 'error' && <FormError text={message} />}

      <SubmitRow
        status={status}
        label="Kennismaking aanvragen"
        note={
          <>
            Vrijblijvend.{' '}
            <Link to={routes.privacy.path} className="underline underline-offset-4 hover:text-primary">
              Privacyverklaring
            </Link>
          </>
        }
      />
    </form>
  );
}
