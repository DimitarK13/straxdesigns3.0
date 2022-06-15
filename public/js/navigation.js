const navToggle = document.querySelector('#nav-toggle');
const navClose = document.querySelector('#nav-close');
const nav = document.querySelector('#nav');

navToggle.addEventListener('click', () => {
  nav.style.display = 'flex';
  setTimeout(() => {
    nav.style.transform = 'translateX(0)';
  }, 50);
});

navClose.addEventListener('click', () => {
  nav.style.transform = 'translateX(-101%)';
  setTimeout(() => {
    nav.style.display = 'none';
  }, 400);
});
