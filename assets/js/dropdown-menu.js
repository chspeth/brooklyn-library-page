import {toggleNavBarClass} from './adaptive-menu.js';
import {findActiveUser} from './autorization-changes.js';

const dropdownMenu = document.querySelectorAll('.dropdown-menu');
const dropdownMenuUnauthorized = document.querySelector('.dropdown-menu--unauthorized');
const dropdownMenuAuthorized = document.querySelector('.dropdown-menu--authorized');

const profileButtonNonadaptive = document.querySelector('.header__button--profile-nonadaptive');
const profileButtonAdaptive = document.querySelector('.header__button--profile-adaptive');

function toggleMenuClass () {
  if (findActiveUser() !== null) {
    dropdownMenuAuthorized.classList.toggle('hidden');
    dropdownMenuAuthorized.classList.toggle('shown');
  } else {
    dropdownMenuUnauthorized.classList.toggle('hidden');
    dropdownMenuUnauthorized.classList.toggle('shown');
  }
} 

profileButtonNonadaptive.addEventListener('click', () => {
  toggleMenuClass();
})
profileButtonAdaptive.addEventListener('click', () => {
  toggleNavBarClass();
  toggleMenuClass();
})

window.addEventListener('click', (evt) => {
  dropdownMenu.forEach((el) => {
    if (!el.contains(evt.target) && !profileButtonAdaptive.contains(evt.target) && !profileButtonNonadaptive.contains(evt.target) && el.classList.contains('shown')) {
      toggleMenuClass();
    }
  })
})