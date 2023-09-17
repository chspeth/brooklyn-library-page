import {profileNameLetters, profileName, profileCardNumber, profileVisits} from './profile.js';

const dropdownMenuAuthorized = document.querySelector('.dropdown-menu--authorized');
const cardNumberTitle = dropdownMenuAuthorized.querySelector('.dropdown-menu__title');
const logoutButton = dropdownMenuAuthorized.querySelector('.logout-button');
const formData = {};
let users = {};
const idNumbers = [];
const profileButtons = document.querySelectorAll('.header__button--profile');
const LS = localStorage;

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
    btn.style.backgroundImage = 'url("../assets/img/icons/icon-profile.svg")';
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

function countVisits () {
  let number = +profileVisits.textContent;
  number++;
  profileVisits.textContent = number;
}

function changePageAfterAutorization () {
  if (LS.getItem('users') && findActiveUser() !== null) {
    changeAvatarToLetters();
    setTitle();
    setProfileTitle();
    setProfileNameAndNumber();
    countVisits();
  } else {
    changeAvatarNoname();
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
  // console.log(findActiveUser())
})

export {formData, setDataToLS, changePageAfterAutorization, findActiveUser};