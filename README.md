# Beztial

Sitio web de **Beztial** — parrilla de altura en una azotea sobre Colina, Santiago.
Carta gourmet en tres conceptos: **Fuego · Mar · Tierra**.

Sitio estático bilingüe (ES/EN), sin dependencias ni build.

## Estructura

- `index.html` — marcado de la página (hero, concepto, banda de marca, carta, azotea, ambiente, footer)
- `styles.css` — estilos (paleta, tipografías Cormorant Garamond + Jost, layout responsive)
- `script.js` — i18n ES/EN, crossfade del video del hero, rastro de humo del cursor, miniaturas de la carta con zoom
- `assets/` — logos, video e imágenes

## Ver localmente

```bash
python -m http.server 4321
# abrir http://localhost:4321
```

## Publicación

Desplegado con GitHub Pages desde la rama `main`.
