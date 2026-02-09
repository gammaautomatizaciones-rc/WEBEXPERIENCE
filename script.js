// Variables globales
let currentSection = 'inicio';
let hasAnimatedSkills = false;

// Elementos del DOM
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');
const scrollProgress = document.createElement('div');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initScrollProgress();
    initNavigation();
    initMobileMenu();
    initVideoModal();
    initContactForm();
    initScrollAnimations();
    initTimelineAnimations();
    
    // Animación de estadísticas al cargar
    setTimeout(() => {
        animateStats();
    }, 500);
});

// 1. Progreso de scroll
function initScrollProgress() {
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// 2. Navegación activa
function initNavigation() {
    // Detectar sección actual al hacer scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Actualizar navegación
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Efecto header al scrollear
                const header = document.querySelector('.header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });
    });
    
    // Scroll suave para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Cerrar menú móvil si está abierto
                closeMobileMenu();
                
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 3. Menú móvil
function initMobileMenu() {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
}

// 4. Modal de video
function initVideoModal() {
    // Abrir modal al hacer click en videos de la timeline
    document.querySelectorAll('.timeline-media video').forEach(video => {
        video.addEventListener('click', (e) => {
            e.preventDefault();
            openVideoModal(video.querySelector('source').src);
        });
    });
    
    // Cerrar modal
    closeModal.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            closeVideoModal();
        }
    });
}

function openVideoModal(videoSrc) {
    modalVideo.src = videoSrc;
    modalVideo.load();
    videoModal.style.display = 'block';
    
    // Animación de entrada
    setTimeout(() => {
        videoModal.style.opacity = '1';
    }, 10);
}

function closeVideoModal() {
    videoModal.style.opacity = '0';
    setTimeout(() => {
        videoModal.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }, 300);
}

// 5. Formulario de contacto
function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validación básica
        if (!data.name || !data.email || !data.subject || !data.message) {
            showMessage('Por favor, completa todos los campos.', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showMessage('Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        // Simular envío (en un proyecto real, aquí iría la lógica para enviar el formulario)
        showMessage('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.', 'success');
        contactForm.reset();
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, type) {
    // Crear mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Estilos del mensaje
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: var(--font-primary);
    `;
    
    document.body.appendChild(messageDiv);
    
    // Animación de entrada
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 10);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// 6. Animaciones de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
                
                // Animar habilidades cuando se ven
                if (entry.target.id === 'habilidades' && !hasAnimatedSkills) {
                    animateSkills();
                    hasAnimatedSkills = true;
                }
            }
        });
    }, observerOptions);
    
    // Observar secciones
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observar tarjetas de proyectos
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

// 7. Animaciones de timeline
function initTimelineAnimations() {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar elementos de la timeline
                const timelineItems = entry.target.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });
    
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        timelineObserver.observe(timeline);
    }
}

// 8. Animación de estadísticas
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }, 20);
    });
}

// 9. Animación de barras de habilidades
function animateSkills() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        const width = level.style.width;
        level.style.width = '0%';
        
        setTimeout(() => {
            level.style.width = width;
        }, 500);
    });
}

// 10. Función de scroll a sección (para botones del hero)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 11. Efectos de hover mejorados
document.addEventListener('DOMContentLoaded', () => {
    // Efecto de parallax suave en el hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Efecto de brillo en cards al pasar el mouse
    document.querySelectorAll('.timeline-card, .project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// 12. Manejo de enlaces externos
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.href.startsWith('http')) {
        e.target.target = '_blank';
        e.target.rel = 'noopener noreferrer';
    }
});

// 13. Optimización para móviles y tablets
function initMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    
    if (isMobile) {
        // Desactivar efectos de parallax en móviles para mejor performance
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = 'none';
        }
        
        // Optimizar scroll en móviles
        document.body.style.overflowX = 'hidden';
        
        // Mejorar touch interactions
        const touchElements = document.querySelectorAll('.btn, .nav-link, .project-card, .timeline-card');
        touchElements.forEach(element => {
            element.style.touchAction = 'manipulation';
        });
        
        // Evitar zoom automático en inputs
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.setAttribute('autocomplete', 'off');
        });
    }
    
    if (isTablet) {
        // Ajustes para tablets
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.style.animationDuration = '0.4s';
        });
    }
}

// 19. Detectar tipo de dispositivo
function detectDeviceType() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Detectar iOS
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    
    // Detectar Android
    const isAndroid = /Android/.test(userAgent);
    
    // Detectar Desktop
    const isDesktop = !isIOS && !isAndroid && window.innerWidth > 1024;
    
    // Añadir clases al body para estilos específicos
    const body = document.body;
    if (isIOS) body.classList.add('ios-device');
    if (isAndroid) body.classList.add('android-device');
    if (isDesktop) body.classList.add('desktop-device');
    
    return { isIOS, isAndroid, isDesktop };
}

// 20. Optimización de imágenes para diferentes dispositivos
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Añadir srcset para diferentes densidades de pantalla
        if (img.src && !img.srcset) {
            const baseSrc = img.src.replace(/\.(jpg|jpeg|png|webp)$/, '');
            const extension = img.src.split('.').pop();
            
            img.srcset = `
                ${baseSrc}@1x.${extension} 1x,
                ${baseSrc}@2x.${extension} 2x,
                ${baseSrc}@3x.${extension} 3x
            `;
        }
        
        // Lazy loading para imágenes fuera del viewport
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        }
    });
}

// 21. Manejo de orientación del dispositivo
function handleOrientationChange() {
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Recalcular posiciones después del cambio de orientación
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.classList.remove('loading');
            });
            
            // Re-iniciar observadores
            initScrollAnimations();
            initTimelineAnimations();
        }, 300);
    });
}

// 22. Optimización de eventos táctiles - SOLUCIÓN PARA SCROLL EN MÓVILES
function initTouchOptimizations() {
    // Variables para controlar el scroll
    let touchStartY = 0;
    let touchEndY = 0;
    let isScrolling = false;
    let scrollTimeout;
    
    // Mejorar el desempeño de scroll en móviles SIN INTERFERIR
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        isScrolling = false;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        // Permitir scroll natural del navegador
        // No interferir con el touchmove para que el scroll funcione correctamente
        isScrolling = true;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        
        // Solo activar swipe gesture si no hubo scroll
        if (!isScrolling) {
            handleSwipeGesture();
        }
        
        // Resetear después de un tiempo
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 100);
    }, { passive: true });
    
    function handleSwipeGesture() {
        const difference = touchStartY - touchEndY;
        
        // Solo activar swipe si el movimiento es significativo
        if (Math.abs(difference) > 100) {
            // Swipe down: scroll up
            if (difference > 100) {
                window.scrollBy({ top: -200, behavior: 'smooth' });
            }
            // Swipe up: scroll down
            else if (difference < -100) {
                window.scrollBy({ top: 200, behavior: 'smooth' });
            }
        }
    }
    
    // Solución principal: Asegurar que el scroll funcione correctamente
    document.body.style.overflow = 'visible';
    document.body.style.height = 'auto';
    
    // Eliminar cualquier restricción de scroll que pueda existir
    const preventScrollElements = document.querySelectorAll('*');
    preventScrollElements.forEach(element => {
        element.style.touchAction = 'auto';
    });
}

// 23. Optimización de animaciones según performance del dispositivo
function optimizeAnimations() {
    // Detectar si el dispositivo tiene buena performance
    const isHighPerformance = navigator.hardwareConcurrency && 
                             navigator.hardwareConcurrency >= 4 &&
                             window.innerWidth > 768;
    
    if (!isHighPerformance) {
        // Reducir complejidad de animaciones en dispositivos lentos
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        
        // Desactivar animaciones 3D en dispositivos lentos
        const cards = document.querySelectorAll('.timeline-card, .project-card');
        cards.forEach(card => {
            card.style.transform = 'none';
            card.removeEventListener('mousemove', handleCardTilt);
        });
    }
}

// 24. Mejorar accesibilidad en móviles
function enhanceMobileAccessibility() {
    // Añadir aria-labels a botones importantes
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn, index) => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', `Botón ${index + 1}`);
        }
    });
    
    // Mejorar focus en móviles
    document.addEventListener('touchstart', function(e) {
        if (e.target.closest('button, a, input, textarea')) {
            document.body.classList.add('touch-mode');
        }
    }, { passive: true });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('touch-mode');
    });
}

// 25. Gestión de memoria en móviles
function manageMemory() {
    // Limpiar videos cuando no están en uso
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        video.addEventListener('pause', () => {
            if (!video.paused && !video.ended && video.currentTime > 0) {
                video.load();
            }
        });
    });
    
    // Limpiar eventos cuando no son necesarios
    window.addEventListener('beforeunload', () => {
        videos.forEach(video => {
            video.pause();
            video.removeAttribute('src');
            video.load();
        });
    });
}

// Llamar a las funciones de optimización
document.addEventListener('DOMContentLoaded', () => {
    initMobileOptimizations();
    detectDeviceType();
    optimizeImages();
    handleOrientationChange();
    initTouchOptimizations();
    optimizeAnimations();
    enhanceMobileAccessibility();
    manageMemory();
});

// 14. Accesibilidad - Mejorar focus
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// 15. Lazy loading para imágenes (mejora de performance)
document.addEventListener('DOMContentLoaded', () => {
    if ('loading' in HTMLImageElement.prototype) {
        // Soporte nativo para lazy loading
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Polyfill para navegadores antiguos
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.head.appendChild(script);
    }
});

// 16. Manejo de errores
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.error);
    // No mostrar errores al usuario en producción
});

// 17. Optimización de scroll
let ticking = false;

function updateScroll() {
    // Lógica de scroll optimizada
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
    }
});

// 18. Soporte para prefers-reduced-motion
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.style.setProperty('--animation-duration', '0s');
}