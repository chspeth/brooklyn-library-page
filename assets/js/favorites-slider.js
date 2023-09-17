const favoritesSection = document.getElementById('favorites');
const radioButtons = favoritesSection.querySelectorAll('.favorites__input');
const bookLists = favoritesSection.querySelectorAll('.seasons__list');
let checkedBtn = favoritesSection.querySelector('input[type="radio"]:checked');

for (let i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener('change', function() {
      if (this !== checkedBtn) {
        checkedBtn = this;
      }
      
      for (let j = 0; j < bookLists.length; j++) {
        if (!bookLists[j].classList[1].includes(checkedBtn.id)) {
          bookLists[j].style.animation = "fade-out .2s linear";
          setTimeout(() => {
            bookLists[j].style.display = 'none';
          }, 199)
        } else {
          setTimeout(() => {
            bookLists[j].style.animation = "fade-in .8s linear";
            bookLists[j].style.display = 'flex';
          }, 200)
        }
      }
  });
}
