import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import type { z } from 'zod';
import { submitForm, type FormKind } from './provider';

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface FieldErrors {
  [field: string]: string | undefined;
}

interface UseFormOptions<S extends z.ZodObject> {
  kind: FormKind;
  /**
   * Schema wordt lazy geladen (dynamische import), zodat de validatiebibliotheek
   * niet in de initiële bundel van elke pagina zit maar pas bij het verzenden.
   */
  schema: () => Promise<S>;
  /** Velden die als lijst (meerdere waarden) moeten worden gelezen */
  arrayFields?: string[];
  /** Velden die als checkbox (true/false) moeten worden gelezen */
  booleanFields?: string[];
}

function newSubmissionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Lichte formulier-hook: leest de (ongecontroleerde) velden bij submit uit,
 * valideert met zod, toont foutmeldingen per veld en verzendt via de provider-adapter.
 */
export function useForm<S extends z.ZodObject>({
  kind,
  schema,
  arrayFields = [],
  booleanFields = [],
}: UseFormOptions<S>) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // Bescherming tegen dubbel verzenden: één id per formulierpoging (server negeert herhaling)
  // en het moment van openen (server weert inzendingen die onmenselijk snel binnenkomen).
  const submissionIdRef = useRef<string>('');
  const startedAtRef = useRef<number>(0);
  const inFlightRef = useRef(false);
  useEffect(() => {
    // Na mount (niet tijdens render): id en starttijd van deze formulierpoging vastleggen
    submissionIdRef.current = newSubmissionId();
    startedAtRef.current = Date.now();
  }, []);

  const readValues = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    const values: Record<string, unknown> = {};
    // Namen uit de DOM halen (niet uit fd.keys()): een <select> met een disabled
    // placeholder-optie of een lege checkbox-groep zit niet in FormData.
    const names = Array.from(form.querySelectorAll<HTMLElement>('[name]'))
      .map((el) => el.getAttribute('name') ?? '')
      .filter(Boolean);
    for (const key of new Set([...names, ...booleanFields])) {
      if (arrayFields.includes(key)) values[key] = fd.getAll(key).map(String);
      else if (booleanFields.includes(key)) values[key] = fd.get(key) !== null;
      else values[key] = String(fd.get(key) ?? '');
    }
    return values;
  };

  const focusFirstError = (fieldErrors: FieldErrors) => {
    const first = Object.keys(fieldErrors)[0];
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  };

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (inFlightRef.current) return; // dubbele klik/Enter tijdens verzenden negeren
      const form = event.currentTarget;
      const raw = readValues(form);

      setStatus('submitting');
      const resolvedSchema = await schema();
      const parsed = resolvedSchema.safeParse(raw);
      if (!parsed.success) {
        const fieldErrors: FieldErrors = {};
        for (const issue of parsed.error.issues) {
          const key = String(issue.path[0] ?? 'form');
          if (!fieldErrors[key]) fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        setStatus('idle');
        focusFirstError(fieldErrors);
        return;
      }

      // Honeypot gevuld → stil "succes" tonen, niets verzenden
      if (typeof raw.website === 'string' && raw.website.length > 0) {
        setStatus('success');
        return;
      }

      setErrors({});
      const { website: _honeypot, ...data } = parsed.data as Record<string, unknown>;
      void _honeypot;
      inFlightRef.current = true;
      try {
        const result = await submitForm(kind, data as Parameters<typeof submitForm>[1], {
          submissionId: submissionIdRef.current,
          startedAt: startedAtRef.current,
        });
        if (result.ok) {
          setMessage(result.message ?? null);
          setStatus('success');
          form.reset();
          submissionIdRef.current = newSubmissionId(); // volgende inzending krijgt een nieuwe id
        } else {
          setMessage(result.error);
          setStatus('error');
        }
      } finally {
        inFlightRef.current = false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [kind, schema],
  );

  const reset = () => {
    setStatus('idle');
    setErrors({});
    setMessage(null);
  };

  return { formRef, onSubmit, status, errors, message, reset };
}
