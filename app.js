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

// --- Banner de cookies (se activa en el Paso 4) ---
(function () {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  if (localStorage.getItem('cookiesAceptadas') === '1') {
    banner.hidden = true;
    return;
  }
  banner.hidden = false;
  banner.querySelector('[data-aceptar]')?.addEventListener('click', () => {
    localStorage.setItem('cookiesAceptadas', '1');
    banner.hidden = true;
  });
})();
