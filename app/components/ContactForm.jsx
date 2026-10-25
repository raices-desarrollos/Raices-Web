'use client';

import { useState } from 'react';
import { contact } from '../content/site';
import { buildInquiryMessage, mailtoHref, whatsappHref } from '../lib/contact';
import { trackFormSubmit, trackWhatsAppClick } from '../lib/analytics';
import { WhatsAppIcon } from './Icons';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USES_ENDPOINT = Boolean(contact.formEndpoint);

const initialFields = { nombre: '', email: '', telefono: '', mensaje: '', consentimiento: false };

function validate(fields) {
  const errors = {};
  if (!fields.nombre.trim()) errors.nombre = 'Escribí tu nombre.';
  if (!fields.email.trim()) errors.email = 'Escribí tu email.';
  else if (!EMAIL_PATTERN.test(fields.email.trim())) errors.email = 'Revisá el formato del email.';
  if (!fields.consentimiento) errors.consentimiento = 'Necesitamos tu consentimiento para responderte.';
  return errors;
}

export default function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [honeypot, setHoneypot] = useState('');

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
      telefono: fields.telefono.trim(),
      mensaje: fields.mensaje.trim(),
    };

    if (USES_ENDPOINT) {
      setStatus('sending');
      try {
        const response = await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...payload, _subject: 'Consulta por Ceibo Vidal' }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        trackFormSubmit('endpoint');
        setStatus('sent');
        setFields(initialFields);
      } catch {
        setStatus('error');
      }
      return;
    }

    // Sin backend: se arma el mensaje y se abre WhatsApp con el texto prellenado.
    const href = whatsappHref(buildInquiryMessage(payload));
    trackFormSubmit('whatsapp');
    trackWhatsAppClick('form');
    const opened = window.open(href, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = href;
    setStatus('sent');
  }

  function handleEmailFallback() {
    trackFormSubmit('email');
  }

  const emailHref = mailtoHref({
    body: buildInquiryMessage({
      nombre: fields.nombre.trim(),
      email: fields.email.trim(),
      telefono: fields.telefono.trim(),
      mensaje: fields.mensaje.trim(),
    }),
  });

  const sentMessage = USES_ENDPOINT
    ? 'Recibimos tu consulta. Te respondemos a la brevedad.'
    : 'Se abrió WhatsApp con tu consulta. Si no se abrió, usá el botón de WhatsApp o escribinos por email.';

  return (
    <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
      <div className={`field ${errors.nombre ? 'is-invalid' : ''}`}>
        <label htmlFor="contact-nombre">Nombre</label>
        <input
          id="contact-nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
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

      <div className="field-row">
        <div className={`field ${errors.email ? 'is-invalid' : ''}`}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="tu@email.com"
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

        <div className="field">
          <label htmlFor="contact-telefono">
            Teléfono <span className="field-optional">Opcional</span>
          </label>
          <input
            id="contact-telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+54 9 11 …"
            value={fields.telefono}
            onChange={update}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="contact-mensaje">
          Mensaje <span className="field-optional">Opcional</span>
        </label>
        <textarea
          id="contact-mensaje"
          name="mensaje"
          rows="4"
          placeholder="Quiero recibir información sobre las unidades disponibles."
          value={fields.mensaje}
          onChange={update}
        />
      </div>

      {/* Honeypot: oculto para personas, visible para bots. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="contact-empresa">Empresa</label>
        <input
          id="contact-empresa"
          name="empresa"
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
          <span>
            Acepto que Raíces Developers use estos datos para responder mi consulta sobre Ceibo Vidal.
          </span>
        </label>
        {errors.consentimiento ? (
          <p className="field-error" id="error-consentimiento">
            {errors.consentimiento}
          </p>
        ) : null}
      </div>

      <div className="form-actions">
        <button className="button" type="submit" disabled={status === 'sending'}>
          {USES_ENDPOINT ? null : <WhatsAppIcon size={16} />}
          {status === 'sending'
            ? 'Enviando…'
            : USES_ENDPOINT
              ? 'Enviar consulta'
              : 'Enviar por WhatsApp'}
        </button>
        <a className="text-link" href={emailHref} onClick={handleEmailFallback}>
          Prefiero escribir por email
        </a>
      </div>

      <p className="form-status" role="status" aria-live="polite">
        {status === 'sent' ? sentMessage : null}
        {status === 'error'
          ? 'No pudimos enviar la consulta. Probá de nuevo o escribinos por WhatsApp.'
          : null}
      </p>
    </form>
  );
}
