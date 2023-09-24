// Login

const loginWindowContainer = document.querySelector('#modal-login').content.querySelector('.modal');
const loginWindow = loginWindowContainer.cloneNode(true);
const loginButtons = document.querySelectorAll('.login-button');
const closeButton = loginWindow.querySelector('.modal__close-button');
const loginModal = loginWindow.querySelector('.modal__wrapper');
const registrationButton = loginWindow.querySelector('.modal__additional-button');
document.body.append(loginWindow);

function toggleLoginClass () {
  loginWindow.classList.toggle('hidden');
  loginWindow.classList.toggle('shown');
}

loginButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleLoginClass();
  })
})

closeButton.addEventListener('click', () => {
  toggleLoginClass();
})

loginWindow.addEventListener('click', (evt) => {
  if (!loginModal.contains(evt.target)) {
    toggleLoginClass();
  }
})

registrationButton.addEventListener('click', () => {
  toggleLoginClass();
  toggleRegistrarionClass();
})

// Registration

const registrationWindowContainer = document.querySelector('#modal-registration').content.querySelector('.modal');
const registrationWindow = registrationWindowContainer.cloneNode(true);
const registrationButtons = document.querySelectorAll('.registration-button');
const closeButtonReg = registrationWindow.querySelector('.modal__close-button');
const registrationModal = registrationWindow.querySelector('.modal__wrapper');
const loginButton = registrationWindow.querySelector('.modal__additional-button');
document.body.append(registrationWindow);

function toggleRegistrarionClass () {
  registrationWindow.classList.toggle('hidden');
  registrationWindow.classList.toggle('shown');
}

registrationButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleRegistrarionClass();
  })
})

closeButtonReg.addEventListener('click', () => {
  toggleRegistrarionClass();
})

registrationWindow.addEventListener('click', (evt) => {
  if (!registrationModal.contains(evt.target)) {
    toggleRegistrarionClass();
  }
})

loginButton.addEventListener('click', () => {
  toggleRegistrarionClass();
  toggleLoginClass();
})

export {toggleRegistrarionClass, toggleLoginClass};