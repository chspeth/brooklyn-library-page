import {profileNameLetters, profileName, profileCardNumber, profileVisits, profileBooks, profileList} from './profile.js';
import {reloadFavorites} from './favorites-slider.js';

const dropdownMenuAuthorized = document.querySelector('.dropdown-menu--authorized');
const cardNumberTitle = dropdownMenuAuthorized.querySelector('.dropdown-menu__title');
const logoutButton = dropdownMenuAuthorized.querySelector('.logout-button');
const formData = {};
let users = {};
const idNumbers = [];
const profileButtons = document.querySelectorAll('.header__button--profile');
const LS = localStorage;

const cardSection = document.getElementById('library-card');
const cardTable = document.querySelector('.library-card__table');
const checkButton = cardSection.querySelector('.library-card__button');
const getSectionTitle = cardSection.querySelector('.get-card__subtitle');
const getSectionText = cardSection.querySelector('.get-card__text');
const getSectionButtons = cardSection.querySelectorAll('.get-card__button');
const getSectionProfileButton = cardSection.querySelector('.get-card__button--profile');

function toggleClass (el) {
  el.classList.toggle('hidden');
  el.classList.toggle('shown');
}

function getRandomHexString () {
  let result = [];
  let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
   
  for (let n = 0; n < 9; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }

  const id = result.join('');
  idNumbers.every((el) => {
    return el !== id;
  }) ? idNumbers.push(id) : getRandomHexString();
  
  return id.toUpperCase();
}

function setDataToLS () {
  const userId = getRandomHexString();
  users[userId] = formData; 
  
  LS.setItem('users', JSON.stringify(users));
}

function findActiveUser () {
  users = JSON.parse(LS.getItem('users')) ?? {};
  
  let activeUser;
  const notActiveUsers = [];
  for (let key in users) {
    if (users[key].isActive === true) {
      activeUser = users[key];
    } else {
      notActiveUsers.push(users[key]);
    }
  }

  if (notActiveUsers.length === Object.keys(users).length) {
    return null;
  } else {
    return activeUser;
  }
}

function findIdOfActiveUser () {
  users = JSON.parse(LS.getItem('users'));
  
  for (let key in users) {
    if (users[key].isActive === true) {
      return key;
    }
  }
  
}

function changeAvatarToLetters () {
  const activeUser = findActiveUser();

  profileButtons.forEach((btn) => {
    btn.style.backgroundImage = 'none';
    btn.style.backgroundColor = '#fff';
    btn.style.color = '#BB945F';
    btn.textContent = activeUser["first-name"][0].toUpperCase() + activeUser["last-name"][0].toUpperCase();
  })
}

function changeAvatarNoname () {
  profileButtons.forEach((btn) => {
    btn.style.backgroundImage = 'url("./assets/img/icons/icon-profile.svg")';
    btn.style.backgroundColor = 'transparent';
    btn.textContent = '';
  })
}

function setTitle () {
  const activeUser = findActiveUser();

  profileButtons.forEach((btn) => {
    btn.setAttribute('title', `${activeUser["first-name"]} ${activeUser["last-name"]}`)
  })
}

function removeTitle () {
  profileButtons.forEach((btn) => {
    btn.removeAttribute('title');
  })
}

function setProfileTitle () {
  const idOfActiveUser = findIdOfActiveUser();

  cardNumberTitle.textContent = idOfActiveUser;
  cardNumberTitle.style.fontSize = '0.57em';
}

function setProfileNameAndNumber () {
  const activeUser = findActiveUser();
  const idOfActiveUser = findIdOfActiveUser();

  profileNameLetters.textContent = activeUser["first-name"][0].toUpperCase() + activeUser["last-name"][0].toUpperCase();

  profileName.textContent = activeUser["first-name"] + ' ' + activeUser["last-name"];

  profileCardNumber.textContent = idOfActiveUser;
}

function setVisits () {
  const idOfActiveUser = findIdOfActiveUser();

  profileVisits.forEach((el) => {
    el.textContent = users[idOfActiveUser.toString()].visits;
  })
}

function countVisits () {
  const idOfActiveUser = findIdOfActiveUser();
  users[idOfActiveUser.toString()].visits++;

  LS.setItem('users', JSON.stringify(users));
}

function setBooksNumber () {
  const idOfActiveUser = findIdOfActiveUser();

  profileBooks.forEach((el) => {
    el.textContent = users[idOfActiveUser.toString()].ownBooks.length;
  })
}

function setBooksToProfile () {
  users = JSON.parse(LS.getItem('users'));
  const idOfActiveUser = findIdOfActiveUser();

  const bookArr = users[idOfActiveUser.toString()].ownBooks;

  while (profileList.firstChild) {
    profileList.removeChild(profileList.firstChild);
  }

  for (let i = 0; i < bookArr.length; i++) {
    const newEl = document.createElement('li');
    newEl.textContent = bookArr[i];
    newEl.classList.add('profile__item');
    profileList.appendChild(newEl);
  }
}

function changeCardSection () {
  toggleClass(checkButton);
  toggleClass(cardTable);
  
  getSectionTitle.textContent = 'Visit your profile';
  getSectionText.textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
  
  for (let i = 0; i < 2; i++) {
    getSectionButtons[i].style.display = 'none';
  }
  getSectionProfileButton.style.display = 'inline-block';
}

function changeCardSectionBack () {
  if (checkButton.classList.contains('hidden') && cardTable.classList.contains('shown')) {
    toggleClass(checkButton);
    toggleClass(cardTable);
  }

  getSectionTitle.textContent = 'Get a reader card';
  getSectionText.textContent = 'You will be able to see a reader card after logging into account or you can register a new account';
  
  for (let i = 0; i < 2; i++) {
    getSectionButtons[i].style.display = 'inline-block';
  }
  getSectionProfileButton.style.display = 'none';
}

function changeFavoritesButtons () {
  const books = document.querySelectorAll('.seasons__book-title');
  
  if (LS.getItem('users') && findActiveUser() !== null) {
    const activeUser = findActiveUser();
    const ownedBooks = activeUser.ownBooks;
    ownedBooks.forEach((el) => {
      for (let i = 0; i < books.length; i++) {
        if (books[i].textContent === el.split(',')[0]) {
          const element = books[i].closest('.seasons__item');
          const btn = element.querySelector('.seasons__button');
          btn.classList.add('button--disabled');
          btn.setAttribute('disabled', 'disabled');
          btn.textContent = 'Own';
        }
      }
    })
  } else {
    for (let i = 0; i < books.length; i++) {
      const element = books[i].closest('.seasons__item');
      const btn = element.querySelector('.seasons__button');
      btn.classList.remove('button--disabled');
      btn.removeAttribute('disabled');
      btn.textContent = 'Buy';
    }
  }
}

function changePageAfterAutorization () {
  if (LS.getItem('users') && findActiveUser() !== null) {
    changeAvatarToLetters();
    setTitle();
    setProfileTitle();
    setProfileNameAndNumber();
    setVisits();
    changeCardSection();
    setBooksNumber();
    setBooksToProfile();
    changeFavoritesButtons();
    reloadFavorites();
  } else {
    changeAvatarNoname();
    dropdownMenuAuthorized.classList.remove('shown');
    dropdownMenuAuthorized.classList.add('hidden');
    removeTitle();
    changeCardSectionBack();
    changeFavoritesButtons();
    reloadFavorites();
  }
}

window.addEventListener('load', () => {
  changePageAfterAutorization();
})

logoutButton.addEventListener('click', () => {
  const idOfActiveUser = findIdOfActiveUser();
  users[idOfActiveUser.toString()].isActive = false;
  LS.setItem('users', JSON.stringify(users));
  changePageAfterAutorization();
})

export {formData, setDataToLS, changePageAfterAutorization, findActiveUser, LS, toggleClass, checkButton, cardTable, findIdOfActiveUser, setBooksNumber, setBooksToProfile, changeFavoritesButtons, countVisits};