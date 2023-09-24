import {LS, findActiveUser, toggleClass, checkButton, cardTable} from './autorization-changes.js';

const userName = document.getElementById('card-check-name');
const userNumber = document.getElementById('card-check-number');

checkButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (LS.getItem('users') && findActiveUser() === null) {
    const users = JSON.parse(LS.getItem('users'));
    let name;
    let number;

    for (let key in users) {
      if (key === userNumber.value.toUpperCase()) {
        number = true;

        if (users[key]["first-name"].toUpperCase() === userName.value.toUpperCase()) {
          name = true;
        }
      }
    }

    if (name && number) {
      toggleClass(checkButton);
      toggleClass(cardTable);
      setTimeout(() => {
        toggleClass(checkButton);
        toggleClass(cardTable);
        userName.value = '';
        userNumber.value = '';
      }, 10000)
    }
  }
})
