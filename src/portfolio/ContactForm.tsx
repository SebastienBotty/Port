"use client";

import Arrow from "./Arrow";
import { useForm, ValidationError } from "@formspree/react";
import type { Locale } from "./routing";
import { text } from "./text";

export default function ContactForm({ locale }: { locale: Locale }) {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if (!endpoint) return null;
  return <ConfiguredForm locale={locale} endpoint={endpoint} />;
}

function ConfiguredForm({ locale, endpoint }: { locale: Locale; endpoint: string }) {
  const [state, handleSubmit] = useForm(endpoint);
  const t = text[locale];
  if (state.succeeded) return <p className="form-status" role="status">{t.sent}</p>;
  return <details className="contact-form-toggle"><summary>{t.formToggle}</summary><form className="contact-form" onSubmit={handleSubmit}>
    <label htmlFor="contact-email">{t.email}</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} />
    <ValidationError prefix="Email" field="email" errors={state.errors} />
    <label htmlFor="contact-message">{t.message}</label><textarea id="contact-message" name="message" rows={5} required maxLength={10000} />
    <ValidationError prefix={t.message} field="message" errors={state.errors} />
    {state.errors && <p role="alert">{t.formError}</p>}
    <button className="nav-contact" type="submit" disabled={state.submitting}>{state.submitting ? t.sending : t.send} <Arrow /></button>
  </form></details>;
}
