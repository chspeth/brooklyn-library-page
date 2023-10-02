import {LS, findIdOfActiveUser} from './autorization-changes.js';

const buyCardWindowContainer = document.querySelector('#buy-card').content.querySelector('.modal');
const buyCardWindow = buyCardWindowContainer.cloneNode(true);
const buyCardModal = buyCardWindow.querySelector('.buy-card__wrapper');
const closeButton = buyCardWindow.querySelector('.buy-card__close-button');
const buyCardForm = buyCardWindow.querySelector('.buy-card__form');
document.body.append(buyCardWindow);
const inputList = buyCardForm.getElementsByTagName('input');

// Open window

function toggleBuyCardClass () {
  buyCardWindow.classList.toggle('hidden');
  buyCardWindow.classList.toggle('shown');
}

closeButton.addEventListener('click', () => {
  toggleBuyCardClass();
})

buyCardWindow.addEventListener('click', (evt) => {
  if (!buyCardModal.contains(evt.target)) {
    toggleBuyCardClass();
  }
})

// Validation

const pristine = new Pristine(buyCardForm, {
  classTo: 'buy-card__element',
  errorTextParent: 'buy-card__element',
  errorTextClass: 'buy-card__error-text',
});

buyCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    toggleBuyCardClass();

    const users = JSON.parse(LS.getItem('users'));
    const idOfActiveUser = findIdOfActiveUser();
    users[idOfActiveUser.toString()].hasLibraryCard = true;
    LS.setItem('users', JSON.stringify(users));

    for (let input of inputList) {
      input.value = '';
    }
  }
})

export {toggleBuyCardClass};