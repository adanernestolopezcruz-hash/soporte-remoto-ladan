// =========================================================
// SOPORTE REMOTO LADAN — app.js
// =========================================================

// --- Menú móvil accesible ---
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const abierto = navMenu.classList.toggle('activo');
    menuToggle.classList.toggle('abierto', abierto);
    menuToggle.setAttribute('aria-expanded', String(abierto));
  });
}

// --- Copiar hash SHA-256 al portapapeles ---
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      const original = btn.textContent;
      btn.textContent = '¡Copiado!';
      setTimeout(() => (btn.textContent = original), 1500);
    } catch { /* silencioso */ }
  });
});

// --- Banner de cookies automático ---
(function () {
  // Crear el banner si no existe en el HTML (así aparece en todas las páginas)
  let banner = document.getElementById('cookieBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.hidden = true;
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML = `
      <span>Usamos cookies propias y de terceros (publicidad) para mejorar la experiencia. <a href="cookies.html">Más información</a>.</span>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap">
        <button class="btn btn-secondary" data-rechazar>Rechazar</button>
        <button class="btn btn-primary" data-aceptar>Aceptar</button>
      </div>
    `;
    document.body.appendChild(banner);
  }

  // Si ya eligió antes, no mostrarlo
  const eleccion = localStorage.getItem('cookiesAceptadas');
  if (eleccion === '1' || eleccion === '0') {
    banner.hidden = true;
    return;
  }

  banner.hidden = false;

  banner.querySelector('[data-aceptar]')?.addEventListener('click', () => {
    localStorage.setItem('cookiesAceptadas', '1');
    banner.hidden = true;
  });

  banner.querySelector('[data-rechazar]')?.addEventListener('click', () => {
    localStorage.setItem('cookiesAceptadas', '0');
    banner.hidden = true;
  });
})();
