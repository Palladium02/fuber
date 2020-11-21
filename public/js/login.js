let path = window.location.href;

let error = path.split('#')[1];

if (error == 'err') {
  document.querySelector('.error-text').classList.add('visible');
}
