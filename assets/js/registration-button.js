const registrationWindowContainer = document.querySelector('#modal-registration').content.querySelector('.modal');
const registrationWindow = registrationWindowContainer.cloneNode(true);
const registrationButtons = document.querySelectorAll('.registration-button');
const closeButton = registrationWindow.querySelector('.modal__close-button');
const registrationModal = registrationWindow.querySelector('.modal__wrapper');
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

closeButton.addEventListener('click', () => {
  toggleRegistrarionClass();
})

registrationWindow.addEventListener('click', (evt) => {
  if (!registrationModal.contains(evt.target)) {
    toggleRegistrarionClass();
  }
})

export {toggleRegistrarionClass};