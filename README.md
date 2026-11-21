# Portal de Ubicaciones — Rick & Morty

Buscador web interactivo de ubicaciones del universo de *Rick and Morty* que consume la [API pública oficial](https://rickandmortyapi.com/). Permite filtrar ubicaciones por **nombre** y **tipo** en tiempo real, mostrando los resultados en tarjetas responsivas y recordando automáticamente la última búsqueda realizada.

**Autor:** Jesús Daniel Melida González · Fundamentos de Desarrollo Web · UCSA  
**Variante del TP:** B · Ubicaciones (último dígito de cédula: 6)

## Sitios publicados
- **GitHub Pages:** https://melidadaniel09.github.io/tp-melida-daniel/
- **Vercel / Netlify:** https://TU-PROYECTO.vercel.app

## Captura
![Captura de la aplicación](img/captura.png)

## Funcionalidades
- Búsqueda combinada de ubicaciones por **nombre** (`name`) y **tipo** (`type`, como `Planet`, `Space station`, etc.) contra el endpoint `/api/location`.
- Validación de formulario para evitar peticiones vacías y manejo de estados de carga (`Buscando…`), sin resultados (`404`) y errores de red.
- Renderizado dinámico de tarjetas con nombre, tipo, dimensión y cantidad de residentes.
- Persistencia de la última búsqueda en `localStorage` para restaurar los filtros y resultados al recargar la página.

## Tecnologías
- HTML5 semántico
- CSS3 (Grid, Flexbox, variables CSS, diseño responsivo)
- JavaScript ES6+ (`fetch`, `async/await`, `localStorage`)
- API: [Rick and Morty API](https://rickandmortyapi.com/documentation/#location)

## Estructura del proyecto
```text
tp-melida-daniel/
├── index.html          # Estructura semántica principal y formulario de búsqueda
├── README.md           # Documentación técnica del proyecto
├── .gitignore          # Exclusión de archivos del sistema, editor y dependencias
├── css/
│   └── estilos.css     # Estilos responsivos con variables CSS, Flexbox y Grid
├── js/
│   └── app.js          # Lógica de consumo de API, renderizado y localStorage
└── img/
    └── captura.png     # Captura de pantalla de la aplicación en funcionamiento

