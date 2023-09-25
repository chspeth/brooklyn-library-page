import {LS, findIdOfActiveUser} from './autorization-changes.js';

const buyCardWindowContainer = document.querySelector('#buy-card').content.querySelector('.modal');
const buyCardWindow = buyCardWindowContainer.cloneNode(true);
const buyCardModal = buyCardWindow.querySelector('.buy-card__wrapper');
const closeButton = buyCardWindow.querySelector('.buy-card__close-button');
const buyButton = buyCardWindow.querySelector('.buy-card__button');
const inputList = buyCardWindow.getElementsByTagName('input');
document.body.append(buyCardWindow);

function toggleBuyCardClass () {
  buyCardWindow.classList.toggle('hidden');
  buyCardWindow.classList.toggle('shown');
}

closeButton.addEventListener('click', () => {
  toggleBuyCardClass();
})

buyButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  const arr = [];
  for (let i = 0; i < inputList.length; i++) {
    arr.push(inputList.item(i))
  }
  if (arr.every((el) => el.value.length > 0)) {
    toggleBuyCardClass();

    const users = JSON.parse(LS.getItem('users'));
    const idOfActiveUser = findIdOfActiveUser();
    users[idOfActiveUser.toString()].hasLibraryCard = true;
    LS.setItem('users', JSON.stringify(users));
  }
})

buyCardWindow.addEventListener('click', (evt) => {
  if (!buyCardModal.contains(evt.target)) {
    toggleBuyCardClass();
  }
})

export {toggleBuyCardClass};