// config.js — versión corregida con soporte completo de fondo
(function () {
  function aplicarAjustes() {
    // Leer desde localStorage
    const fondo = localStorage.getItem('colorFondo');
    if (fondo) {
      document.documentElement.style.setProperty('--fondo-color', fondo);
    }

    const colorCuadro     = localStorage.getItem('colorCuadro');
    const bordeCuadro     = localStorage.getItem('bordeCuadro');
    const fuente          = localStorage.getItem('fuentePagina');
    const textoColor      = localStorage.getItem('textoColor');
    const sombraCuadro    = localStorage.getItem('sombraCuadro');
    const animacionCuadro = localStorage.getItem('animacionCuadro');
    let   tamanoCuadro    = localStorage.getItem('tamanoCuadro');

    // Selector amplio para todas las clases posibles de cuadros
    const cuadros = document.querySelectorAll(
      '.cuadro-interno, .cuadro, .card, .item-cuadro, .card-link, .panel, .bloque, .flip-card-front, .flip-card-back'
    );

    // Aplicar fondo y fuente
    if (fondo) {
      document.body.style.backgroundColor = fondo;
      document.documentElement.style.backgroundColor = fondo;
    }

    if (fuente) {
      document.body.style.fontFamily = fuente;
    }

    // Color del texto
    if (textoColor) {
      document.body.style.color = textoColor;
      cuadros.forEach(c => { c.style.color = textoColor; });
    }

    // Color, borde y sombra de cuadros
    if (colorCuadro)  cuadros.forEach(c => c.style.backgroundColor = colorCuadro);
    if (bordeCuadro)  cuadros.forEach(c => c.style.borderRadius = bordeCuadro);
    if (sombraCuadro) cuadros.forEach(c => c.style.boxShadow = sombraCuadro);

    // Tamaño: agregar px si falta
    if (tamanoCuadro) {
      if (/^\d+$/.test(tamanoCuadro)) tamanoCuadro += 'px';
      cuadros.forEach(c => {
        c.style.width = tamanoCuadro;
        c.style.height = tamanoCuadro;
      });
    }

    // Keyframes (solo una vez)
    (function ensureKeyframes() {
      if (document.getElementById('aux-anim-kf')) return;
      const style = document.createElement('style');
      style.id = 'aux-anim-kf';
      style.textContent = `
        @keyframes auxFadeIn  { from {opacity:0; transform: translateY(8px);} to {opacity:1; transform:none;} }
        @keyframes auxSlideIn { from {opacity:0; transform: translateX(-20px);} to {opacity:1; transform:none;} }
        @keyframes auxZoomIn  { from {opacity:0; transform: scale(0.9);} to {opacity:1; transform: scale(1);} }
      `;
      document.head.appendChild(style);
    })();

    // Animaciones
    cuadros.forEach(c => {
      c.style.animation = 'none';
      c.onmouseenter = c.onmouseleave = null;
    });

    if (animacionCuadro) {
      cuadros.forEach(c => {
        if (animacionCuadro === 'fade') {
          c.style.animation = 'auxFadeIn 0.6s ease both';
        } else if (animacionCuadro === 'slide') {
          c.style.animation = 'auxSlideIn 0.6s ease both';
        } else if (animacionCuadro === 'zoom') {
          c.style.animation = 'auxZoomIn 0.6s ease both';
          c.style.transition = 'transform 0.2s ease';
          c.addEventListener('mouseenter', () => { c.style.transform = 'scale(1.03)'; });
          c.addEventListener('mouseleave', () => { c.style.transform = 'scale(1)'; });
        }
      });
    }

    console.log('Ajustes aplicados:', {
      fondo, colorCuadro, bordeCuadro, fuente, textoColor,
      sombraCuadro, animacionCuadro, tamanoCuadro,
      cuadrosEncontrados: cuadros.length
    });
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aplicarAjustes);
  } else {
    aplicarAjustes();
  }

  // Exponer para aplicar manualmente tras guardar ajustes
  window.aplicarAjustes = aplicarAjustes;
})();
