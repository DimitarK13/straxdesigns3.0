const navToggle = document.querySelector('#nav-toggle');
const navClose = document.querySelector('#nav-close');
const nav = document.querySelector('#nav');

navToggle.addEventListener('click', () => {
  nav.setAttribute('opened', 'true');
});

navClose.addEventListener('click', () => {
  nav.setAttribute('opened', 'false');
});
