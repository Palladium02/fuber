window.addEventListener('DOMContentLoaded', (event) => {
  document
    .querySelector('meta[name=theme-color]')
    .setAttribute('content', '#fcfcfc');
});

let sidemenu = document.querySelector('.sidemenu');
let sidemenuButton = document.querySelector('.sidemenuButton');

sidemenuButton.addEventListener('click', (event) => {
  sidemenu.classList.toggle('active');
});
