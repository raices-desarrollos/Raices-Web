# Registro de contenido — pendientes de validación

Nada de esta lista se resolvió por suposición. Lo que sigue publicado es el dato que ya estaba en la web, o una cita de la carpeta cuando no había conflicto numérico.

## Superficies

Hay tres juegos de metros para las mismas tipologías. En la web se mantuvieron los que ya estaban publicados.

| Tipología | Web, vigente | Carpeta, ficha redondeada | Carpeta, nota de planos en la página de mercado |
| --- | --- | --- | --- |
| Monoambiente, Unidad B | 35,79 m² cubiertos · 3,27 m² balcón · **39,06 m²** | 34 · 3 · **37 m²** | 36,92 m² |
| 2 ambientes, Unidad C | 48,39 · 7,79 · **56,18 m²** | 48 · 6 · **54 m²** | 54,26 m² |
| 3 ambientes, Unidad A | 68,67 · 11,08 · **79,75 m²** | 71 · 11 · **82 m²** | 82,37 m² |

La página de mercado de la carpeta dice que esas superficies de planos son las de Ceibo y, a la vez, la lista de precios usa 37, 54 y 82. No coinciden entre sí ni con la web.

La carpeta aclara que el 4° piso ajusta levemente las superficies. La web publica un solo juego de metros por tipología.

**Pendiente:** definir qué juego es el aprobado para la web (planos medidos, ficha comercial redondeada, o ambos con una nota).

### Auditoría de superficies por tipología (F3b)

Estado: **no se modificó ningún valor**. La web mantiene los datos que ya estaban publicados hasta que Comercial apruebe un juego. Las discrepancias están marcadas.

Fuente del dato publicado: `app/content/ceibo-vidal.ts` → `typologies.units[].areas` (mismos valores en `README.md` y en `scripts/generate_presentation.py`); son los metros que ya tenía la web, copiados de los planos. Fuente en la carpeta comercial: `carpeta-de-venta.html`, tres lugares: (a) ficha de unidad redondeada, (b) lista de precios de preventa (usa 37 / 54 / 82), (c) nota de planos de la página de mercado. La carpeta vive fuera de este repositorio (`Raices-Brain/knowledge/projects/ceibo-vidal/commercial/carpeta-de-venta.html`). Los valores de la tabla se verificaron contra ese archivo el 28/10/2026: ficha en las líneas 1443–1459 (71/11, 34/3, 48/6), lista de precios en 1563–1565 (82/37/54) y nota de planos en 1940–1986 (36,92 / 54,26 / 82,37).

| Tipología | Concepto | Publicado en la web | Carpeta, ficha (a) | Carpeta, mercado (c) | Estado |
| --- | --- | --- | --- | --- | --- |
| Monoambiente, Unidad B | Cubierta | 35,79 m² | 34 m² | — | Discrepa (−1,79 m²) |
| | Balcón | 3,27 m² | 3 m² | — | Discrepa (−0,27 m²) |
| | Total | 39,06 m² | 37 m² | 36,92 m² | Discrepa con ambas (−2,06 / −2,14 m²) |
| 2 ambientes, Unidad C | Cubierta | 48,39 m² | 48 m² | — | Diferencia por redondeo (−0,39 m²) |
| | Balcón | 7,79 m² | 6 m² | — | Discrepa (−1,79 m²) |
| | Total | 56,18 m² | 54 m² | 54,26 m² | Discrepa con ambas (−2,18 / −1,92 m²) |
| 3 ambientes, Unidad A | Cubierta | 68,67 m² | 71 m² | — | Discrepa (+2,33 m²) |
| | Balcón | 11,08 m² | 11 m² | — | Diferencia por redondeo (−0,08 m²) |
| | Total | 79,75 m² | 82 m² | 82,37 m² | Discrepa con ambas (+2,25 / +2,62 m²) |

Notas de la auditoría:

- Coherencia interna: en la web y en la ficha (a), cubierta + balcón = total (35,79 + 3,27 = 39,06; 48,39 + 7,79 = 56,18; 68,67 + 11,08 = 79,75; 34 + 3 = 37; 48 + 6 = 54; 71 + 11 = 82). La carpeta (c) solo informa el total.
- Las diferencias no tienen un sentido único (la web es mayor en B y C, menor en A): no es un simple redondeo ni un desfase constante.
- La carpeta aclara que el 4° piso ajusta levemente las superficies. La web publica un solo juego por tipología.
- **Decisión comercial (28/10/2026):** la referencia comercial principal para el diseño son las superficies redondeadas de la carpeta: **3 ambientes 82 m², monoambiente 37 m², 2 ambientes 54 m²**. Las precisas de la nota de planos (82,37 / 36,92 / 54,26 m²) quedan documentadas aquí y no reemplazan automáticamente las cifras destacadas.
- **Los datos publicados NO se modifican todavía.** La web sigue mostrando 79,75 / 39,06 / 56,18 m² hasta la aprobación comercial definitiva. No cambiar `typologies.units[].areas` sin autorización.
- Validación comercial: **PENDIENTE** para las tres tipologías. Ningún dato queda como «validado».
- Cuando se apruebe un juego, se cambia solo `typologies.units[].areas` en `ceibo-vidal.ts` (y `README.md`, `scripts/generate_presentation.py` y `WEBSITE_REDESIGN_PLAN.md` §5.2.5 si corresponde).


## Programas de las tipologías

Se publicaron los programas de las fichas de unidad (páginas de Unidad A, B y C), como pedía el encargo:

- A: «Living-comedor al frente, suite y segundo dormitorio, baño social.»
- B: «Ambiente integrado · baño completo · balcón propio.»
- C: «Living-comedor con cocina, dormitorio en suite, baño social.»

La grilla «Tres tipologías» de la carpeta dice otra cosa:

- A: «Suite, segundo dormitorio, baño completo y balcón corrido.»
- B: «Amplio estudio, espacio de guardado y balcón propio.»
- C: «Suite, toilette y balcón corrido.»

**Pendiente:** confirmar si la ficha de unidad manda sobre la grilla, en especial el toilette de la Unidad C.

## Características técnicas no publicadas o comprimidas

Documentadas en la carpeta y no volcadas como ficha nueva:

- Terrazas privadas: 33 m², 20 m² y 25 m². En la web solo se dice que hay tres.
- Terraza común: 76 m². Sí está publicada, porque el encargo la incluye en amenities.
- Planta baja: accesos independientes, bicicletero, cocheras y referencias de plano (SUM, expansión, bombeo, etc.). No se publicó el listado numerado del plano.
- «El 4° ajusta levemente las superficies.» No hay una segunda tabla en la web.

La ficha visible comprime datos de la carpeta en cuatro campos: PB + 4, 12 unidades, balcones en cada unidad («Todas»), terrazas «1 + 3». No agrega materiales ni sistemas.

## Condiciones comerciales

Guardadas en `app/content/ceibo-vidal.ts` (`commercial`) y **no renderizadas**:

- Título: «Un esquema simple, en pesos.»
- Anticipo del 30% al boleto.
- 70% en 18 cuotas en pesos, ajustadas por CAC.
- Entrega prevista para 2029.

La carpeta también tiene lista de precios de preventa (octubre 2026) y una comparativa de mercado, en páginas restringidas. No se publicaron montos, USD/m² ni porcentajes de diferencia con la zona.

**Pendiente:** decidir si el esquema 30/70 se muestra en la ficha. Hoy la sección sigue oculta, como estaba.

## Contacto

| Dato | Web | Carpeta |
| --- | --- | --- |
| WhatsApp, enlace | `5491136994200` | `wa.me/5491136994200` |
| Cómo se muestra | +54 9 11 3699-4200 | +54 11 3699-4200 |

Es el mismo número. No se cambió el formato visible: el 9 es el prefijo móvil del enlace que ya funciona.

Email vigente, no aparece en la carpeta: `contacto@raicesdesarrolladores.com.ar`. Se mantuvo.

**Pendiente:** confirmar si el teléfono visible debe escribirse sin el 9.

## Textos nuevos o adaptados

En uso, y hay que confirmarlos porque no son citas literales:

1. **Proyectos, bajada.** «Cada proyecto sigue una idea simple: hacer edificios en los que nosotros mismos viviríamos.» Adaptación del mensaje principal. No había en la web una frase previa que dijera lo mismo.
2. **Home, rótulos** Simplicidad, Durabilidad y Funcionalidad. Organizan frases literales. Los rótulos no están en el brief.
3. **Ceibo, titular de la sección de aire libre.** «Terraza común y balcones.» Ordena datos de la carpeta. No es una frase de la carpeta.
4. **Ceibo, títulos de tarjeta** «Jacuzzi y estar al aire libre.», «Una por unidad.» y «Tres terrazas privadas.» Recortes de la carpeta para el título de cada tarjeta. El párrafo de cada una sí es textual, salvo que el de terrazas privadas repite la frase completa de la página de terrazas.
5. **Identidad, tercer punto.** «La vegetación se integra a la arquitectura y al entorno urbano.» Síntesis de textos que ya estaban en el sitio, no del brief.
6. **Rayas del brief.** «habitar -y después…-» se publicó con rayas (—). El sentido no cambia.
7. **«donde» sin tilde** en «Construimos espacios donde da placer vivir.» Cambio ortográfico aprobado en el encargo. El brief escribe «dónde».

No se aplicó, a propósito:

- **Contacto general:** «Coordinemos una reunión.» y «Conocé nuestros proyectos y recibí información directamente de nuestro equipo.» Se mantuvo «Hablemos.» y la bajada que ya estaba, porque el encargo pedía priorizar texto existente.

## Afirmaciones que estaban en la web y no tienen respaldo en las fuentes

Se sacaron de la interfaz:

- «Naturaleza urbana con criterio.» como slogan. Entra en conflicto con el mensaje principal. Sigue siendo solo memoria de la comunicación anterior.
- «Construyamos lo que viene.»
- «Para compradores e inversores que quieran construir ciudad con más naturaleza.»
- «Arquitectura que deja huella.»
- «La ciudad también puede echar raíces.» como titular de Nosotros.
- «Un edificio bajo, claro y vegetal.»
- «Edificios que ganan valor con el tiempo.»
- Jacarandá y Ombú nombrados como próximos edificios. No hay proyectos confirmados con esos nombres. El criterio que queda es: cada proyecto toma el nombre de un árbol autóctono.
- «Riego automatizado», drenajes y «sistema sostenible» en Ceibo Vidal. No están en la carpeta. También se retiró «riego y mantenimiento» del punto de identidad en Nosotros.

Se conservó, con origen en el sitio anterior y no en GAMISU:

- «La naturaleza no es decoración. Es parte del proyecto.»
- El verde como decisión de fachada, balcones y terraza.
- Edificios con nombre de árbol autóctono, pensados para un barrio concreto.

Esas frases no describen un sistema técnico. Si no se quieren en Nosotros, se pueden quitar sin reemplazarlas por una filosofía nueva.
