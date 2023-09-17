let position = 0;
let slidesToShow = (window.innerWidth <= 768) ? 1 : 3;
const SLIDES_TO_SCROLL = 1;
const aboutSection = document.getElementById('about');
const container = aboutSection.querySelector('.about__slider');
const track = aboutSection.querySelector('.about__list');
const items = aboutSection.querySelectorAll('.about__item');
const dotButtons = aboutSection.querySelectorAll('.about__pagination-item');
const arrowPrevButton = aboutSection.querySelector('.about__button--prev');
const arrowNextButton = aboutSection.querySelector('.about__button--next');
const itemsNumber = items.length;
let itemWidth = (window.innerWidth <= 768) ? container.clientWidth / slidesToShow :
(container.clientWidth - 50) / slidesToShow;
const widthOfMovePosition = SLIDES_TO_SCROLL * itemWidth;

window.addEventListener('resize', () => {
  slidesToShow = (window.innerWidth <= 768) ? 1 : 3;

  itemWidth = (window.innerWidth <= 768) ? container.clientWidth / slidesToShow :
(container.clientWidth - 50) / slidesToShow;
  
  setWidth();

  changePictureWithDotBtn();
})

// Carousel logic width right & left buttons on small width

const getItemWidth = () => {}

const setWidth = () => {
  items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
    item.style.maxWidth = '450px';
    if (window.innerWidth <= 768) {
      item.style.minWidth = '100%';
    }
  })
}

setWidth();

arrowPrevButton.addEventListener('click', () => {
  const itemsLeft = Math.abs(position) / itemWidth;

  position += (itemsLeft >= SLIDES_TO_SCROLL) ? widthOfMovePosition : itemsLeft * itemWidth;

  setPosition();
  checkButtons();
  changeBtnColor();
})

arrowNextButton.addEventListener('click', () => {
  const itemsLeft = itemsNumber - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

  position -= (itemsLeft >= SLIDES_TO_SCROLL) ? widthOfMovePosition : itemsLeft * itemWidth;

  setPosition();
  checkButtons();
  changeBtnColor();
})

const setPosition = () => track.style.transform = `translateX(${position}px)`;

const checkButtons = () => {
  if (position === 0) arrowPrevButton.disabled;
  if (position <= -(itemsNumber - slidesToShow) * itemWidth) arrowNextButton.disabled;
}

checkButtons();

// Logic of dotted buttons 

const changeBtnColor = () => {
  for (let i = 0; i < dotButtons.length; i++) {
    if (Math.abs(position) / itemWidth === i || Math.abs(position + 50) / itemWidth === i || Math.abs(position + 25) / itemWidth === i) {
      dotButtons[i].classList.add('about__pagination-item--current');
    } else {
      dotButtons[i].classList.remove('about__pagination-item--current');
    }
  }
}

const changePictureWithDotBtn = () => {
  let indexOfChosedBtn;

  for (let i = 0; i < dotButtons.length; i++) {
    if (dotButtons[i].classList.contains('about__pagination-item--current')) {
      indexOfChosedBtn = i;
    }
  }

  for (let i = 0; i < dotButtons.length; i++) {
    dotButtons[i].addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        position = -(i * itemWidth);
      } else {
        if (i > indexOfChosedBtn) {
          position = -(i * (itemWidth + 25));
        } else {
          position = -(i * (itemWidth - 25));
        }
      }
      setPosition();
      changeBtnColor();
    })
  }
}

changePictureWithDotBtn();