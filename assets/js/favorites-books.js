import {LS, findActiveUser, countBooks} from './autorization-changes.js';
import {toggleLoginClass} from './login-registration.js';
import {toggleBuyCardClass} from './buy-card.js';
import {profileList} from './profile.js';

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
      } else {
        btn.classList.add('button--disabled');
        btn.setAttribute('disabled', 'disabled');
        btn.textContent = 'Own';
        countBooks();

        const element = btn.closest('.seasons__item');
        const book = element.querySelector('.seasons__book-title').textContent;
        const autor = element.querySelector('.seasons__book-autor').textContent;
        
        const newEl = document.createElement('li');
        newEl.textContent = `${book}, ${autor}`;
        profileList.appendChild(newEl);
      }
    }
  })
})