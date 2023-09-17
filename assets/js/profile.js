const profileWindowContainer = document.querySelector('#profile').content.querySelector('.modal');
const profileWindow = profileWindowContainer.cloneNode(true);
const profileButton = document.querySelector('.profile-button');
const closeButton = profileWindow.querySelector('.profile__close-button');
const profileModal = profileWindow.querySelector('.profile__wrapper');
document.body.append(profileWindow);

const profileNameLetters = profileWindow.querySelector('.profile__name-letters');
const profileName = profileWindow.querySelector('.profile__name');
const profileCardNumber = profileWindow.querySelector('.profile__card-number');
const profileCopyButton = profileWindow.querySelector('.profile__copy-button');
const profileVisits = profileWindow.querySelector('.profile__visits');

function toggleProfileClass () {
  profileWindow.classList.toggle('hidden');
  profileWindow.classList.toggle('shown');
}

profileButton.addEventListener('click', () => {
  toggleProfileClass();
})

closeButton.addEventListener('click', () => {
  toggleProfileClass();
})

profileWindow.addEventListener('click', (evt) => {
  if (!profileModal.contains(evt.target)) {
    toggleProfileClass();
  }
})

profileCopyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(profileCardNumber.innerHTML)
})

export {profileNameLetters, profileName, profileCardNumber, profileVisits};