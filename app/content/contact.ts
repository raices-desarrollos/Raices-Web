import { brand, routes } from './shared';

export const contact = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491136994200',
  whatsappDisplay: '+54 9 11 3699-4200',
  whatsappMessage: 'Hola, quiero recibir información sobre Ceibo Vidal.',
  email: 'contacto@raicesdesarrolladores.com.ar',
  /**
   * Endpoint del worker de email (`functions/contact-worker.js`).
   * Si está vacío, el formulario no finge un envío: avisa que el email no está activo.
   * CONTACT_TO_EMAIL y RESEND_API_KEY viven solo en el worker, nunca en el frontend.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || '',
  /** Motivos del formulario. El primero es el valor por defecto. */
  subjects: ['Ceibo Vidal', 'Consulta general'],
};

export const social = {
  // TODO: URL oficial de LinkedIn de Raíces Developers. Mientras esté vacía, el botón no se muestra.
  linkedin: '',
  // TODO: URL oficial de Instagram de Raíces Developers. Mientras esté vacía, el botón no se muestra.
  instagram: '',
};

export const contactContent = {
  seo: {
    title: 'Contacto',
    description:
      'Escribinos por WhatsApp o por el formulario para recibir información sobre Ceibo Vidal y los próximos desarrollos de Raíces Developers.',
    ogTitle: `Contacto · ${brand.name}`,
  },
  header: {
    kicker: 'Contacto',
    title: 'Hablemos.',
    lead: 'Te respondemos con información del proyecto, planos y unidades disponibles.',
  },
  section: {
    kicker: 'Canales',
    title: 'Escribinos.',
    text: 'Dejanos un mensaje o escribinos por WhatsApp. Te respondemos con información del proyecto, planos y unidades disponibles.',
  },
  defaults: {
    kicker: 'Contacto',
    title: 'Hablemos.',
    text: 'Para compradores e inversores que quieran construir ciudad con más naturaleza. Te respondemos con información del proyecto, planos y unidades disponibles.',
    cota: 'Ceibo Vidal · Entrega prevista 2029',
  },
  channels: {
    whatsappLabel: 'WhatsApp',
    emailLabel: 'Email',
    linkedinLabel: 'LinkedIn',
    instagramLabel: 'Instagram',
    socialAriaSuffix: `de ${brand.name}`,
  },
  mailto: {
    defaultSubject: 'Consulta por Ceibo Vidal',
  },
  inquiry: {
    aboutSubject: (subject: string) => `Hola, quiero recibir información sobre ${subject}.`,
    general: 'Hola, quiero hacer una consulta a Raíces Developers.',
    generalSubject: 'Consulta general',
    namePrefix: 'Nombre:',
    emailPrefix: 'Email:',
  },
  form: {
    name: {
      label: 'Nombre',
      placeholder: 'Tu nombre',
      required: 'Escribí tu nombre.',
    },
    email: {
      label: 'Correo electrónico',
      placeholder: 'tu@email.com',
      required: 'Escribí tu email.',
      invalid: 'Revisá el formato del email.',
    },
    subject: {
      label: 'Motivo',
    },
    message: {
      label: 'Mensaje',
      placeholder: 'Quiero recibir información sobre las unidades disponibles.',
      required: 'Contanos brevemente qué querés saber.',
    },
    honeypot: {
      label: 'Sitio web',
    },
    consent: {
      label: 'Acepto que Raíces Developers use estos datos para responder mi consulta.',
      required: 'Necesitamos tu consentimiento para responderte.',
    },
    submit: 'Enviar mensaje',
    sending: 'Enviando…',
    hintConfigured: 'Tu mensaje llega al equipo de Raíces por email.',
    hintUnconfigured: 'El envío por email todavía no está activo. Mientras tanto, escribinos por WhatsApp.',
    statusSent: 'Recibimos tu mensaje. Te respondemos a la brevedad.',
    statusUnconfigured:
      'El envío por email todavía no está configurado. Usá el botón de WhatsApp para escribirnos ahora.',
    statusError: 'No pudimos enviar el mensaje. Probá de nuevo en unos minutos o escribinos por WhatsApp.',
  },
  pageCanonical: `${routes.contact}/`,
} as const;
