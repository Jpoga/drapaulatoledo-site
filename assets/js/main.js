const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const year = document.querySelector('[data-year]');

if (year) year.textContent = new Date().getFullYear();

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = menu?.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', Boolean(isOpen));
  menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuToggle?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const accordion = document.querySelector('[data-accordion]');
accordion?.querySelectorAll('details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    accordion.querySelectorAll('details').forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

// Fecha o menu móvel ao clicar fora dele ou pressionar Escape.
document.addEventListener('click', (event) => {
  if (!menu?.classList.contains('is-open')) return;
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (menu.contains(target) || menuToggle?.contains(target)) return;

  menu.classList.remove('is-open');
  menuToggle?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !menu?.classList.contains('is-open')) return;
  menu.classList.remove('is-open');
  menuToggle?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.focus();
});

