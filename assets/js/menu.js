const menuContainer = document.querySelector('#adaptive-menu').content.querySelector('.adaptive-menu');
const menu = menuContainer.cloneNode(true);
const openedMenuButton = menu.querySelector('.adaptive-menu__button');
const closedMenuButton = document.querySelector('.header__button--navigation');
const links = menu.querySelectorAll('.navigation__link');
document.body.append(menu);

function toggleMenuClass () {
  menu.classList.toggle('hidden');
  menu.classList.toggle('shown');
}

closedMenuButton.addEventListener('click', () => {
  menu.classList.remove('initial');
  toggleMenuClass();
})

openedMenuButton.addEventListener('click', () => {
  toggleMenuClass();
})

links.forEach(link => {
  link.addEventListener('click', () => {
    toggleMenuClass();
  })
})
