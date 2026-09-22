import { Link } from 'react-router';
import { Input, Select, Textarea } from '@/components/ui/Field';
import { routes } from '@/config/routes';
import { contactOnderwerpen } from '@/data/forms';
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
        text={message ?? 'Wij nemen zo spoedig mogelijk contact met u op.'}
      />
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-5" aria-label="Contactformulier">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Naam" name="naam" autoComplete="name" required error={errors.naam} />
        <Input label="Bedrijfsnaam" name="bedrijfsnaam" autoComplete="organization" error={errors.bedrijfsnaam} />
        <Input label="E-mailadres" name="email" type="email" autoComplete="email" inputMode="email" required error={errors.email} />
        <Input label="Telefoonnummer" name="telefoon" type="tel" autoComplete="tel" inputMode="tel" error={errors.telefoon} />
      </div>
      <Select label="Onderwerp" name="onderwerp" options={contactOnderwerpen} required error={errors.onderwerp} />
      <Textarea label="Bericht" name="bericht" required rows={6} error={errors.bericht} placeholder="Waar kunnen wij u mee helpen?" />

      {status === 'error' && <FormError text={message} />}

      <SubmitRow
        status={status}
        label="Verstuur bericht"
        note={
          <>
            Uw gegevens gebruiken wij alleen om contact met u op te nemen.{' '}
            <Link to={routes.privacy.path} className="underline underline-offset-4 hover:text-primary">
              Privacyverklaring
            </Link>
          </>
        }
      />
    </form>
  );
}
