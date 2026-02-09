# Experiencia Profesional - Web CV

Un portafolio web profesional interactivo que muestra la experiencia laboral, proyectos y habilidades de un desarrollador web full stack.

## Características Principales

### 🎨 Diseño Moderno y Profesional
- Interfaz elegante con gradientes y efectos visuales
- Diseño completamente responsive para todos los dispositivos
- Tipografía moderna con Google Fonts
- Animaciones suaves y transiciones elegantes

### 📱 Experiencia de Usuario Optimizada
- Navegación por anclajes con scroll suave
- Menú responsive para móviles
- Progreso de scroll visual
- Animaciones de aparición al hacer scroll
- Efectos de hover interactivos

### 📋 Secciones Principales

#### 1. Hero/Portada
- Presentación profesional con foto de perfil
- Estadísticas animadas (años de experiencia, proyectos, empresas)
- Redes sociales
- Botones de llamado a la acción

#### 2. Experiencia Profesional
- Timeline interactiva con animaciones
- Detalles de cada puesto de trabajo
- Imágenes y videos de cada experiencia
- Habilidades y tecnologías utilizadas
- Información de empresas y ubicaciones

#### 3. Proyectos Destacados
- Grid de proyectos con imágenes
- Tecnologías utilizadas en cada proyecto
- Botones de demo y código
- Efectos hover con transformaciones 3D

#### 4. Habilidades Técnicas
- Barras de progreso animadas
- Categorías organizadas (Frontend, Backend, Bases de Datos, Herramientas)
- Porcentajes de dominio visual

#### 5. Contacto
- Formulario de contacto funcional
- Información de contacto (email, teléfono, ubicación)
- Validación de campos
- Mensajes de confirmación

### 🛠 Tecnologías Utilizadas

#### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos, animaciones y responsive design
- **JavaScript ES6+** - Interactividad y lógica

#### Características Técnicas
- CSS Grid y Flexbox para layouts
- Variables CSS para theming
- Animaciones con CSS y JavaScript
- Intersection Observer API para animaciones de scroll
- Validación de formularios con JavaScript
- Modal de video funcional
- Scroll progress bar
- Efectos 3D con transformaciones

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints para diferentes tamaños de pantalla
- Menú hamburguesa para móviles
- Grids adaptables
- Tipografía responsive

### 🎯 Accesibilidad
- Navegación por teclado
- Atributos ARIA
- Contrastes de color adecuados
- Focus states visuales

## Estructura de Archivos

```
Ejemplo de web experience/
├── index.html          # Página principal con toda la estructura
├── styles.css          # Estilos CSS con variables y animaciones
├── script.js           # Lógica JavaScript y funcionalidades
└── README.md           # Documentación del proyecto
```

## Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No se requiere servidor web para visualización básica

### Para usar el proyecto

1. **Descargar los archivos**
   ```bash
   # Clonar o descargar los archivos a tu computadora
   ```

2. **Abrir en el navegador**
   ```bash
   # Abrir index.html directamente en tu navegador
   # o usar un servidor local para mejor experiencia
   ```

3. **Opcional: Usar servidor local**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (con http-server instalado)
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

## Personalización

### Cambiar Información Personal
Edita los siguientes archivos:

**index.html** - Sección de perfil:
```html
<h3>Juan Martínez</h3>
<p>Desarrollador Full Stack</p>
```

**styles.css** - Colores y estilos:
```css
:root {
    --primary-color: #2563eb;  /* Color principal */
    --secondary-color: #64748b; /* Color secundario */
}
```

**script.js** - Funcionalidades:
```javascript
// Cambiar datos de contacto
const contactEmail = 'tu-email@ejemplo.com';
```

### Agregar Nueva Experiencia
En `index.html`, dentro de la sección `.timeline`:

```html
<div class="timeline-item left">
    <div class="timeline-content">
        <!-- Contenido de la experiencia -->
    </div>
</div>
```

### Agregar Nuevo Proyecto
En `index.html`, dentro de `.projects-grid`:

```html
<div class="project-card">
    <div class="project-image">
        <img src="ruta/de/tu/imagen.jpg" alt="Nombre del Proyecto">
    </div>
    <div class="project-content">
        <!-- Detalles del proyecto -->
    </div>
</div>
```

## Características Avanzadas

### Animaciones de Scroll
- Las secciones se animan al entrar en el viewport
- Barras de habilidades se llenan al ser visibles
- Timeline con animaciones secuenciales

### Efectos Visuales
- Parallax suave en el hero
- Transformaciones 3D en hover
- Sombras y transparencias
- Gradientes y overlays

### Interactividad
- Modal de video funcional
- Formulario de contacto con validación
- Navegación activa según sección
- Scroll progress indicator

## Compatibilidad

### Navegadores Soportados
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Características que pueden no funcionar en navegadores antiguos
- CSS Grid (se usa fallback con Flexbox)
- Intersection Observer (se usa polyfill)
- CSS Variables (se usan valores fallback)

## Optimización

### Performance
- Imágenes optimizadas
- CSS y JavaScript minificados conceptualmente
- Lazy loading para imágenes
- Optimización de scroll con requestAnimationFrame

### SEO
- Estructura HTML semántica
- Meta tags configurados
- Encabezados jerárquicos
- Alt text en imágenes

## Licencia

Este proyecto es de código abierto y gratuito para uso personal y educativo.

## Contribución

Si deseas mejorar este proyecto:

1. Haz un fork del repositorio
2. Crea una rama con tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Sube a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## Soporte

Para reportar bugs o solicitar features:

- Crea un issue en el repositorio
- Describe detalladamente el problema
- Incluye capturas de pantalla si es necesario
- Indica tu navegador y versión

---

**Creado con ❤️ para desarrolladores que quieren destacar su experiencia profesional**