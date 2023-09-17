import {toggleRegistrarionClass} from './registration-button.js';
import {formData, setDataToLS, changePageAfterAutorization} from './autorization-changes.js';

const form = document.getElementById('registration-form');
const inputList = form.getElementsByTagName('input');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  formData.isActive = true;
  for (let input of inputList) {
    formData[input.name] = input.value;
  }

  setDataToLS();
  changePageAfterAutorization();

  toggleRegistrarionClass();
})

// LS.clear()