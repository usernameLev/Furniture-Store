// Подключение функционала "Чертогов Фрилансера"
import { isMobile, removeClasses } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';

// Touch screen
window.onload = function () {
  document.addEventListener('click', documentActions);

  // Actions (делегирование события click)
  function documentActions(e) {
    const targetElement = e.target;

    if (window.innerWidth > 368 && isMobile.any()) {
      if (targetElement.classList.contains('menu__arrow')) {
        targetElement.closest('.menu__item').classList.toggle('_hover');
      }

      if (
        !targetElement.closest('.menu__item') &&
        document.querySelectorAll('.menu__item._hover').length > 0
      ) {
        removeClasses(
          document.querySelectorAll('.menu__item._hover'),
          '_hover',
        );
      }
    }

    if (window.innerWidth >= 320) {
      if (targetElement.classList.contains('search-form__icon')) {
        document.querySelector('.search-form').classList.toggle('_active');
      } else if (
        !targetElement.closest('.menu__item') &&
        document.querySelector('.search-form._active')
      ) {
        document.querySelector('.search-form').classList.remove('_active');
      }
    }
  }

  // Header
  const headerElement = document.querySelector('.header');

  const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
      headerElement.classList.remove('_scroll');
    } else {
      headerElement.classList.add('_scroll');
    }
  };

  const headerObserver = new IntersectionObserver(callback);
  headerObserver.observe(headerElement);

  // Furniture Gallery
  const furniture = document.querySelector('.furniture__body');

  if (furniture && !isMobile.any()) {
    const furnitureItems = document.querySelector('.furniture__items');
    const furnitureColumn = document.querySelectorAll('.furniture__column');

    // Speed
    const speed = furniture.dataset.speed;

    let positionX = 0;
    let coordXprocent = 0;

    function setMouseGalleryStyle() {
      let furnitureItemsWidth = 0;
      furnitureColumn.forEach((element) => {
        furnitureItemsWidth += element.offsetWidth;
      });

      const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
      const distX = Math.floor(coordXprocent - positionX);

      positionX = positionX + distX * speed;
      let position = (furnitureDifferent / 200) * positionX;

      furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

      if (Math.abs(distX) > 0) {
        requestAnimationFrame(setMouseGalleryStyle);
      } else {
        furniture.classList.remove('_init');
      }
    }

    furniture.addEventListener('mousemove', function (e) {
      const furnitureWidth = furniture.offsetWidth;
      const coordX = e.pageX - furnitureWidth / 2;
      coordXprocent = (coordX / furnitureWidth) * 200;

      if (!furniture.classList.contains('_init')) {
        requestAnimationFrame(setMouseGalleryStyle);
        furniture.classList.add('_init');
      }
    });
  }
};
