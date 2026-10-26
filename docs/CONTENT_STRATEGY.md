# Estrategia de contenido — Raíces Developers

Documento permanente de voz. Los textos editables viven en `app/content/`. Si una frase de este archivo no coincide con el código, manda el código y se corrige este documento.

## Identidad institucional

**Mensaje principal.** Hacemos edificios donde nosotros mismos viviríamos.

Es la idea central del brief de marca (GAMISU). Es el título del hero de la home y de Nosotros. No se reemplaza por el slogan secundario ni por otra fórmula.

**Slogan secundario.** Espacios para echar raíces.

Queda en el footer (`brand.claim`) y como cota de la presentación de la home. No encabeza el hero.

**Filosofía.** Un edificio se piensa primero para quien lo va a habitar, y después para quien lo va a vender. Cada elección tiene un propósito, cada espacio funciona, y el proyecto sigue teniendo sentido con los años.

**Promesa.** Vamos a construir cada proyecto como si fuera para nosotros.

**Diferenciación.** Buscamos construir mejor. No buscamos reinventar cómo vive la gente. Buscamos eliminar fricciones para que viva mejor.

Estas tres frases están en el brief y no se publican hoy como bloque propio. No se convierten en un claim publicitario.

**Tono.** Serena, sobria, atemporal, humana, precisa. Nunca ostentosa, pretenciosa ni fría.

No se usan fórmulas de este tipo: «revolucionamos la forma de habitar», «experiencias residenciales únicas», «el futuro de la arquitectura», «lujo incomparable», «la mejor inversión».

## Fuentes oficiales

1. **GAMISU — Brief de marca.** Voz institucional: idea central, qué creemos, forma de construir, promesa, tono. Prevalece sobre cualquier redacción anterior del sitio.
2. **Carpeta comercial de Ceibo Vidal.** Presentación, edificio, tipologías, amenities, barrio, forma de pago y contacto del desarrollo. El archivo de trabajo está en Raíces Brain: `knowledge/projects/ceibo-vidal/commercial/carpeta-de-venta.html`.
3. **Textos ya publicados en el sitio.** Solo para la identidad ligada a la naturaleza, que el brief no desarrolla. Origen: la sección anterior de `app/content/about.ts` y los principios de `app/content/home.ts`. No autorizan proyectos, años ni métricas nuevas.

Si una frase de un encargo editorial no coincide con estas fuentes, mandan las fuentes. La excepción son las decisiones marcadas abajo como aprobadas.

## Distribución

### Home

Presenta la idea, resume la filosofía y destaca Ceibo Vidal.

| Pieza | Texto | Estado |
| --- | --- | --- |
| Hero | «Hacemos edificios donde nosotros mismos viviríamos.» | Literal |
| Bajada del hero | «Creemos que un edificio debe estar pensado primero para quien lo va a habitar —y después para quien lo va a vender—.» | Literal. Los guiones del brief se normalizaron a rayas. |
| Manifiesto | «Pensados para quienes los habitan.» + la frase «Por eso buscamos…» | El título organiza la frase literal del brief. |
| Tres bloques | Simplicidad, Durabilidad, Funcionalidad | Los rótulos organizan tres frases literales. No son citas. |
| Arquitectura e ingeniería | «La buena arquitectura y la buena ingeniería tienen algo en común: cuando están bien hechas, no necesitan explicarse.» | Literal, integrada en la misma sección para no alargar la home. |
| Ceibo Vidal | Las dos frases de presentación de la carpeta. Datos: 12 unidades, 1, 2 y 3 ambientes, entrega 2029. | Literal |
| Cierre | «Construimos espacios donde da placer vivir.» | Adaptación ortográfica aprobada: el brief escribe «dónde». |
| Cierre, apoyo | «Vamos a construir cada proyecto como si fuera para nosotros.» | Literal |

### Nosotros

Desarrolla criterio, confianza y compromiso. Repite la idea central porque es la filosofía de la empresa, no un slogan de campaña.

Qué creemos, la forma de construir y la promesa son literales del brief. La sección Identidad reutiliza textos previos del sitio sobre vegetación, nombre de árbol autóctono y relación con el barrio. No afirma sustentabilidad ni un sistema de riego.

G&D Developers y Daimar Developers se mantienen con sus logos. No se publican años de trayectoria ni cantidad de edificios.

### Proyectos

Directa. El título «Nuestros desarrollos.» es de este encargo. La bajada es una adaptación, no una cita: está registrada en `CONTENT_REVIEW.md`.

Ceibo Vidal se describe con la frase del balance entre ciudad y aire libre. No se inventan otros desarrollos.

### Ceibo Vidal

El edificio, no la marca. Textos de la carpeta: presentación, características de la página 3, espacios comunes, tipologías (programa de las fichas de unidad), «¿Por qué Saavedra?» y el contacto «Coordiná tu reunión.».

El wordmark del logo es el nombre. El titular en itálica es la versión corta «Un equilibrio entre ciudad y aire libre.».

Las superficies en metros que ya estaban en la web no se reemplazaron. Ver el registro.

La forma de pago está en `ceiboVidalContent.commercial` y no se renderiza. No hay precios ni comparativa de mercado.

### Contacto

Se conservó «Hablemos.» y la bajada ya publicada, porque el encargo pedía priorizar texto existente si ya cubría la consulta. El título propuesto «Coordinemos una reunión.» no se aplicó. En Ceibo Vidal sí se usa «Coordiná tu reunión.», que está en la carpeta.

### Footer

Logo completo original. Slogan secundario. Navegación y contacto sin texto largo.

## Reglas de redacción

- No inventar slogans.
- No prometer lo que no está en el brief o en la carpeta.
- No exagerar beneficios ni hablar de rentabilidad.
- No repetir el mismo párrafo en dos secciones seguidas si una versión más corta ya lo dijo.
- Preferir la cita literal. Si un componente necesita menos palabras, se corta, no se reescribe.
- Una frase nueva se marca como propuesta y se anota en `CONTENT_REVIEW.md` antes de darse por aprobada.
- Los metros, precios, teléfonos y plazos no se “redondean” ni se completan.

## Proyectos futuros

Cada desarrollo tiene su propio archivo en `app/content/`, con ficha técnica y texto comercial de su carpeta. Se registra en `projectBySlug`.

No se copian a otro edificio las frases específicas de Ceibo Vidal («dejar nuestras propias raíces», el balance entre ciudad y aire libre, Saavedra, las tipologías o la forma de pago).

Sí se puede usar la voz institucional del brief: criterio, simplicidad, durabilidad y la idea de hacer edificios donde nosotros mismos viviríamos.
