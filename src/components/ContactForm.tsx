import { useId, useRef, useState, type SubmitEvent } from 'react';

/**
 * The one React island on the site.
 *
 * Hydrated with `client:visible` on the contact page only — every other page
 * ships zero JavaScript. React earns its place here because the form needs
 * real inline validation, per-field error state and submission feedback.
 *
 * ── WIRING THIS UP ─────────────────────────────────────────────────────────
 * TODO(confirm): set FORM_ENDPOINT to a form backend that accepts a JSON POST
 * (Formspree, Web3Forms, Basin, or your own handler) and returns 2xx.
 *
 * Until it is set, the form validates and then hands off to the visitor's mail
 * client with the message pre-filled, so it is never a dead end.
 * ───────────────────────────────────────────────────────────────────────────
 */
const FORM_ENDPOINT = '';
const CONTACT_EMAIL = 'shilpan@urjapod.com';

const projectTypes = [
  'Solar plant storage',
  'Wind plant storage',
  'Grid / ancillary services',
  'Commercial or industrial site',
  'Something else',
] as const;

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;
type Status = 'idle' | 'submitting' | 'sent' | 'mailto' | 'error';

export default function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  // Errors only appear after the first submit attempt, so the form never
  // scolds someone for a field they have not reached yet.
  const [submitted, setSubmitted] = useState(false);

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name) next.name = 'Please tell us your name.';
    if (!email) next.email = 'We need an email address to reply to.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = 'That does not look like a valid email address.';
    if (!message) next.message = 'Please tell us a little about the project.';
    else if (message.length < 20)
      next.message = 'A sentence or two more would help us reply usefully.';

    return next;
  };

  const revalidate = () => {
    if (!submitted || !formRef.current) return;
    setErrors(validate(new FormData(formRef.current)));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setSubmitted(true);
    const found = validate(data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first field in error so keyboard and screen reader
      // users land on the problem instead of hunting for it.
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const payload = Object.fromEntries(data.entries());
    setStatus('submitting');

    if (!FORM_ENDPOINT) {
      const body = [
        `Name: ${payload.name}`,
        `Company: ${payload.company || '—'}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone || '—'}`,
        `Project type: ${payload.projectType}`,
        '',
        String(payload.message),
      ].join('\n');

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `Enquiry from ${payload.name}`
      )}&body=${encodeURIComponent(body)}`;

      setStatus('mailto');
      return;
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setSubmitted(false);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-panel border border-energy-500/40 bg-energy-50 p-8"
      >
        <h3 className="text-xl font-bold text-ink-950">Thank you — message sent.</h3>
        <p className="mt-2.5 leading-relaxed text-ink-700">
          We read every enquiry ourselves and will get back to you shortly. If
          it is urgent, call us on{' '}
          <a className="font-semibold underline" href="tel:+918154070298">
            +91 81540 70298
          </a>
          .
        </p>
      </div>
    );
  }

  const fieldClass = (hasError: boolean) =>
    [
      'w-full rounded-lg border bg-white px-4 py-3 text-base text-ink-900 transition-colors duration-200',
      'placeholder:text-ink-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600/30',
      hasError
        ? 'border-[color:var(--color-danger)] focus-visible:border-[color:var(--color-danger)]'
        : 'border-ink-300 focus-visible:border-accent-600',
    ].join(' ');

  const labelClass = 'mb-2 block text-sm font-semibold text-ink-800';
  const errorClass = 'mt-2 text-sm font-medium text-[color:var(--color-danger)]';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${uid}-name`}>
            Name <span className="text-[color:var(--color-danger)]">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            className={fieldClass(!!errors.name)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            onBlur={revalidate}
            onChange={revalidate}
          />
          {errors.name && (
            <p id={`${uid}-name-error`} className={errorClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor={`${uid}-company`}>
            Company
          </label>
          <input
            id={`${uid}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldClass(false)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`${uid}-email`}>
            Email <span className="text-[color:var(--color-danger)]">*</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass(!!errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            onBlur={revalidate}
            onChange={revalidate}
          />
          {errors.email && (
            <p id={`${uid}-email-error`} className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor={`${uid}-phone`}>
            Phone
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass(false)}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor={`${uid}-type`}>
          What is this about?
        </label>
        <select
          id={`${uid}-type`}
          name="projectType"
          defaultValue={projectTypes[0]}
          className={`${fieldClass(false)} cursor-pointer`}
        >
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor={`${uid}-message`}>
          Message <span className="text-[color:var(--color-danger)]">*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          className={`${fieldClass(!!errors.message)} resize-y`}
          placeholder="Plant capacity, the duty cycle you need to meet, target commissioning date — whatever you have."
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? `${uid}-message-error` : `${uid}-message-hint`
          }
          onBlur={revalidate}
          onChange={revalidate}
        />
        {errors.message ? (
          <p id={`${uid}-message-error`} className={errorClass}>
            {errors.message}
          </p>
        ) : (
          <p id={`${uid}-message-hint`} className="mt-2 text-sm text-ink-600">
            The more detail you give, the more useful our first reply can be.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent-600 px-7 font-semibold text-white shadow-soft-sm transition-all duration-200 hover:bg-accent-700 hover:shadow-soft-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
      </button>

      <div aria-live="polite">
        {status === 'mailto' && (
          <p className="rounded-lg border border-ink-200 bg-ink-100 p-4 text-sm leading-relaxed text-ink-700">
            Your email client should have opened with the message ready to
            send. If nothing happened, email us directly at{' '}
            <a className="font-semibold underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        )}
        {status === 'error' && (
          <p className="rounded-lg border border-[color:var(--color-danger)]/30 bg-red-50 p-4 text-sm leading-relaxed text-ink-800">
            Something went wrong sending that. Please email us directly at{' '}
            <a className="font-semibold underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
