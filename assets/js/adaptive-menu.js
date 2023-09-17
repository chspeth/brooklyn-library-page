const menuContainer = document.querySelector('#adaptive-menu').content.querySelector('.adaptive-menu');
const menu = menuContainer.cloneNode(true);
const openedMenuButton = menu.querySelector('.adaptive-menu__button');
const closedMenuButton = document.querySelector('.header__button--navigation');
const links = menu.querySelectorAll('.navigation__link');
document.body.append(menu);

// Navigation bar

function toggleNavBarClass () {
  menu.classList.toggle('hidden');
  menu.classList.toggle('shown');
}

closedMenuButton.addEventListener('click', () => {
  menu.classList.remove('initial');
  toggleNavBarClass();
})

openedMenuButton.addEventListener('click', () => {
  toggleNavBarClass();
})

links.forEach(link => {
  link.addEventListener('click', () => {
    toggleNavBarClass();
  })
})

window.addEventListener('click', (evt) => {
  if (!menu.contains(evt.target) && !closedMenuButton.contains(evt.target) && menu.classList.contains('shown')) {
    toggleNavBarClass();
  }
})

export {toggleNavBarClass};