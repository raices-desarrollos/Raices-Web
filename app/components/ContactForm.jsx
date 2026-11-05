'use client';

import { useEffect, useRef, useState } from 'react';
import { contact, contactContent } from '@/content/contact';
import { trackFormSubmit } from '../lib/analytics';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USES_ENDPOINT = Boolean(contact.formEndpoint);
const MIN_FILL_MS = 3000; // un humano tarda más que esto en completar el formulario
const form = contactContent.form;

function validate(fields) {
  const errors = {};
  if (!fields.nombre.trim()) errors.nombre = form.name.required;
  if (!fields.email.trim()) errors.email = form.email.required;
  else if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = form.email.invalid;
  if (!fields.mensaje.trim()) errors.mensaje = form.message.required;
  if (!fields.consentimiento) errors.consentimiento = form.consent.required;
  return errors;
}

/**
 * Formulario de contacto.
 *  - Con NEXT_PUBLIC_FORM_ENDPOINT: POST JSON al worker (`functions/contact-worker.js`),
 *    que envía el email con Resend. El éxito se confirma solo si el servidor respondió OK.
 *  - Sin endpoint: no se finge un envío. El formulario lo dice y WhatsApp sigue disponible.
 */
export default function ContactForm({ defaultSubject }) {
  const initialFields = {
    nombre: '',
    email: '',
    asunto: defaultSubject || contact.subjects[0],
    mensaje: '',
    consentimiento: false,
  };
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [honeypot, setHoneypot] = useState('');
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setFields((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'sending') return;

    // Honeypot: los bots completan el campo oculto. Se simula éxito y no se envía nada.
    if (honeypot) {
      setStatus('sent');
      return;
    }

    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = event.currentTarget.elements.namedItem(Object.keys(nextErrors)[0]);
      firstInvalid?.focus();
      return;
    }

    const payload = {
      nombre: fields.nombre.trim(),
      email: fields.email.trim(),
      asunto: fields.asunto,
      mensaje: fields.mensaje.trim(),
    };

    if (!USES_ENDPOINT) {
      setStatus('unconfigured');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...payload,
          website: honeypot,
          elapsedMs: Date.now() - startedAt.current,
          minFillMs: MIN_FILL_MS,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok === false) throw new Error(data.error || `HTTP ${response.status}`);
      trackFormSubmit('endpoint');
      setStatus('sent');
      setFields(initialFields);
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
      <div className="field-row">
        <div className={`field ${errors.nombre ? 'is-invalid' : ''}`}>
          <label htmlFor="contact-nombre">{form.name.label}</label>
          <input
            id="contact-nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            placeholder={form.name.placeholder}
            value={fields.nombre}
            onChange={update}
            aria-invalid={errors.nombre ? 'true' : undefined}
            aria-describedby={errors.nombre ? 'error-nombre' : undefined}
            required
          />
          {errors.nombre ? (
            <p className="field-error" id="error-nombre">
              {errors.nombre}
            </p>
          ) : null}
        </div>

        <div className={`field ${errors.email ? 'is-invalid' : ''}`}>
          <label htmlFor="contact-email">{form.email.label}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={form.email.placeholder}
            value={fields.email}
            onChange={update}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'error-email' : undefined}
            required
          />
          {errors.email ? (
            <p className="field-error" id="error-email">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="field">
        <label htmlFor="contact-asunto">{form.subject.label}</label>
        <select id="contact-asunto" name="asunto" value={fields.asunto} onChange={update}>
          {contact.subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className={`field ${errors.mensaje ? 'is-invalid' : ''}`}>
        <label htmlFor="contact-mensaje">{form.message.label}</label>
        <textarea
          id="contact-mensaje"
          name="mensaje"
          rows="4"
          placeholder={form.message.placeholder}
          value={fields.mensaje}
          onChange={update}
          aria-invalid={errors.mensaje ? 'true' : undefined}
          aria-describedby={errors.mensaje ? 'error-mensaje' : undefined}
          required
        />
        {errors.mensaje ? (
          <p className="field-error" id="error-mensaje">
            {errors.mensaje}
          </p>
        ) : null}
      </div>

      {/* Honeypot: oculto para personas, visible para bots. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="contact-website">{form.honeypot.label}</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className={`field field-check ${errors.consentimiento ? 'is-invalid' : ''}`}>
        <label htmlFor="contact-consentimiento">
          <input
            id="contact-consentimiento"
            name="consentimiento"
            type="checkbox"
            checked={fields.consentimiento}
            onChange={update}
            aria-invalid={errors.consentimiento ? 'true' : undefined}
            aria-describedby={errors.consentimiento ? 'error-consentimiento' : undefined}
            required
          />
          <span>{form.consent.label}</span>
        </label>
        {errors.consentimiento ? (
          <p className="field-error" id="error-consentimiento">
            {errors.consentimiento}
          </p>
        ) : null}
      </div>

      <div className="form-actions">
        <button className="button button-fill" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? form.sending : form.submit}
        </button>
        <p className="form-hint">{USES_ENDPOINT ? form.hintConfigured : form.hintUnconfigured}</p>
      </div>

      <p className="form-status" role="status" aria-live="polite">
        {status === 'sent' ? form.statusSent : null}
        {status === 'unconfigured' ? form.statusUnconfigured : null}
        {status === 'error' ? form.statusError : null}
      </p>
    </form>
  );
}
