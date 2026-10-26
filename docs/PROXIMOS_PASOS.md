# Próximos pasos

Lista de trabajo pendiente. Nada de esto está cerrado en el sitio actual.

## 1. Mejorar el diseño con Fable o Sonnet

Pasada visual sobre el sitio ya construido. Usar Claude Fable o Claude Sonnet. La dirección sigue siendo lujo arquitectónico oscuro: Carbón `#101210` y Caliza `#D1C7BA`.

Antes de tocar UI, layout, motion o assets:

- Leer `docs/RAICES_DESIGN_SYSTEM.md` y respetar los tokens de `app/globals.css`.
- Reutilizar `app/components/` antes de crear piezas nuevas.
- Si el cambio visual queda en el código, actualizar `docs/RAICES_DESIGN_SYSTEM.md` con los valores reales.
- Verificar en ~1440, ~768 y ~390, y respetar `prefers-reduced-motion`.

## 2. Hacer funcionar el formulario de consulta

El formulario de `/contacto` ya está en el sitio y no simula un envío. Si `NEXT_PUBLIC_FORM_ENDPOINT` está vacío, avisa que el email no está activo y deja WhatsApp como canal real.

El worker está en `functions/contact-worker.js`. Recibe el POST, valida y manda el mail con Resend. Los pasos de despliegue están en `functions/README.md`:

1. Cuenta en Resend y dominio verificado (o remitente de prueba).
2. Confirmar el destinatario (`CONTACT_TO_EMAIL`) antes de producción.
3. Cargar los secrets del worker: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `ALLOWED_ORIGIN`.
4. Desplegar el worker y copiar su URL a `NEXT_PUBLIC_FORM_ENDPOINT`.
5. Rebuild y redeploy del sitio. La variable se resuelve en el build.

Esas claves no van al frontend. Un envío de prueba tiene que llegar al buzón y mostrar el mensaje de éxito del formulario.

## 3. Revisar textos

Los textos viven en `app/content/`. El detalle de lo que falta confirmar está en `docs/CONTENT_REVIEW.md`. Lo más urgente:

- Elegir el juego de superficies de Ceibo Vidal (web vigente, ficha redondeada de la carpeta, o nota de planos).
- Confirmar los programas de las tipologías A, B y C.
- Decidir si se publica el esquema comercial 30/70 (hoy está en `app/content/ceibo-vidal.ts` y no se renderiza).
- Confirmar las frases adaptadas de Home, Proyectos, Ceibo y Nosotros listadas en ese documento.
- Confirmar si el teléfono visible se escribe sin el 9 (`+54 11 3699-4200`). El enlace de WhatsApp ya usa `5491136994200`.
- Completar LinkedIn e Instagram en `app/content/contact.ts`. Mientras las URLs estén vacías, esos botones no se muestran.

No inventar proyectos, años, métricas ni historia.

## 4. Revisar mails

El mail que sale del formulario lo arma `functions/contact-worker.js`:

- Asunto: `Consulta Raíces · {motivo}` (`Ceibo Vidal` o `Consulta general`).
- Cuerpo: motivo, nombre, email del visitante y mensaje.
- `reply_to`: el email que dejó quien consulta.
- Remitente: `CONTACT_FROM_EMAIL` (tiene que estar verificado en Resend).
- Destinatario: `CONTACT_TO_EMAIL`, todavía sin confirmar.

En el sitio, el email visible es `contacto@raicesdesarrolladores.com.ar` (`app/content/contact.ts`). No aparece en la carpeta comercial: hay que confirmar que es el buzón correcto, tanto para el mailto de la página como para el destinatario del worker.

También revisar los textos de estado del formulario en `contactContent.form` (éxito, error y “email no activo”).

## 5.

Pendiente de definir.
