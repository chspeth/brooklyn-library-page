import {toggleRegistrarionClass, toggleLoginClass} from './login-registration.js';
import {formData, setDataToLS, changePageAfterAutorization, LS, findActiveUser} from './autorization-changes.js';

// Registrarion

const formRegistrarion = document.getElementById('registration-form');
const inputList = formRegistrarion.getElementsByTagName('input');

formRegistrarion.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  formData.isActive = true;
  formData.hasLibraryCard = false;
  formData.visits = 0;
  formData.ownBooks = [];
  
  for (let input of inputList) {
    formData[input.name] = input.value;
  }
  
  setDataToLS();
  changePageAfterAutorization();
  toggleRegistrarionClass();

  for (let input of inputList) {
    input.value = '';
  }
})

// Login

const formLogin = document.getElementById('login-form');
const userEmail = document.getElementById('log-email');
const userPassword = document.getElementById('log-password');

formLogin.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (LS.getItem('users') && findActiveUser() === null) {
    let users = JSON.parse(LS.getItem('users'));
    let password;
    let email;
  
    for (let key in users) {
      if (users[key]['email'] === userEmail.value) {
        email = true;

        if (users[key]['password'] === userPassword.value) {
          password = true;
        }
      }

      if (password && email) {
        users[key].isActive = true;
        LS.setItem('users', JSON.stringify(users));
        changePageAfterAutorization();
        toggleLoginClass();
        userEmail.value = '';
        userPassword.value = '';
      }
    }
  }
})