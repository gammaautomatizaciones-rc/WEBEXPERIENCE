# Carpetas de Assets

Esta carpeta contiene recursos optimizados para la web experience.

## Estructura de Carpetas

```
assets/
├── images/          # Imágenes optimizadas
│   ├── profile/     # Fotos de perfil
│   ├── companies/   # Imágenes de empresas
│   ├── projects/    # Screenshots de proyectos
│   └── icons/       # Íconos personalizados
├── videos/          # Videos optimizados para móviles
└── fonts/           # Fuentes personalizadas (opcional)
```

## Recomendaciones de Optimización

### Imágenes
- **Formato**: WebP para modern browsers, JPEG/PNG como fallback
- **Tamaño**: Máximo 1920px de ancho para desktop
- **Peso**: Menos de 200KB para imágenes principales
- **Lazy Loading**: Implementado automáticamente

### Videos
- **Formato**: MP4 H.264 para mejor compatibilidad
- **Tamaño**: Máximo 720p para móviles
- **Peso**: Menos de 5MB por video
- **Autoplay**: Desactivado para mejor performance

### Mejoras de Performance
- CDN recomendado para recursos externos
- Compresión Gzip habilitada
- Caché del navegador optimizado
- Minificación de CSS/JS (conceptual)

## Uso

Para usar imágenes optimizadas, reemplazar las URLs de las imágenes en `index.html` con rutas locales:

```html
<!-- Antes -->
<img src="https://images.unsplash.com/photo-...">

<!-- Después -->
<img src="assets/images/profile/juan-martinez.jpg" alt="Foto de perfil">
```

## Herramientas de Optimización Recomendadas

- **Imágenes**: TinyPNG, ImageOptim, Squoosh
- **Videos**: HandBrake, FFmpeg
- **Performance**: Lighthouse, PageSpeed Insights
- **Compresión**: Gzip, Brotli