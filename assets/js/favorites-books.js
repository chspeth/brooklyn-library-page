import {LS, findActiveUser} from './autorization-changes.js';
import {toggleLoginClass} from './login-registration.js';
import {toggleBuyCardClass} from './buy-card.js';

const buyButtons = document.querySelectorAll('.seasons__button');

buyButtons.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (LS.getItem('users') && findActiveUser() === null) {
      toggleLoginClass();
    }

    if (LS.getItem('users') && findActiveUser() !== null) {
      const activeUser = findActiveUser();

      if (activeUser['hasLibraryCard'] === false) {
        toggleBuyCardClass();
      } else {}
    }
  })
})