import {LS, findActiveUser, setBooksNumber, findIdOfActiveUser, setBooksToProfile, changeFavoritesButtons} from './autorization-changes.js';
import {toggleLoginClass} from './login-registration.js';
import {toggleBuyCardClass} from './buy-card.js';

const buyButtons = document.querySelectorAll('.seasons__button');

buyButtons.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    evt.preventDefault();

    if ((LS.getItem('users') && findActiveUser() === null) || (!LS.getItem('users'))) {
      toggleLoginClass();
    }

    if (LS.getItem('users') && findActiveUser() !== null) {
      const activeUser = findActiveUser();
      let users = JSON.parse(LS.getItem('users'));
      const idOfActiveUser = findIdOfActiveUser();

      if (activeUser['hasLibraryCard'] === false) {
        toggleBuyCardClass();
      } else {

        const element = btn.closest('.seasons__item');
        const book = element.querySelector('.seasons__book-title').textContent;
        const autor = element.querySelector('.seasons__book-autor').textContent.slice(3);

        users[idOfActiveUser.toString()].ownBooks.push(`${book}, ${autor}`);
        LS.setItem('users', JSON.stringify(users));
        users = JSON.parse(LS.getItem('users'));
        setBooksNumber();
        setBooksToProfile();
        changeFavoritesButtons();
      }
    }
  })
})