import debounce from './utils/debounce';
import APP from '../config';

const OPENED_CLASS = 'active';
const DROPDOWN_CLASS = 'js-dropdown';
const DROPDOWN_BUTTON_CLASS = 'js-dropdown-button';
const DROPDOWN_CONTENT_CLASS = 'js-dropdown-content';
const MAX_HEIGHT = '1000px';

const dropdownElements = [...document.querySelectorAll(`.${DROPDOWN_CLASS}`)];

const Dropdown = (dropdownElem) => {
  const dropdown = dropdownElem;
  const dropdownButton = dropdown.querySelector(`.${DROPDOWN_BUTTON_CLASS}`);
  const dropdownContent = dropdown.querySelector(`.${DROPDOWN_CONTENT_CLASS}`);

  const show = () => {
    dropdownButton.classList.add(OPENED_CLASS);
    dropdownButton.ariaExpanded = true;
    dropdownContent.style.maxHeight = `${dropdownContent.scrollHeight}px`;
    dropdownContent.ariaHidden = false;
  };

  const hide = () => {
    dropdownButton.classList.remove(OPENED_CLASS);
    dropdownButton.ariaExpanded = false;
    dropdownContent.style.maxHeight = 0;
    dropdownContent.ariaHidden = true;
  };

  const toggle = (evt) => {
    evt.preventDefault();
    dropdownButton.classList.contains(OPENED_CLASS)
      ? hide()
      : show();
  };

  const resize = () => {
    if (dropdownButton.classList.contains(OPENED_CLASS)) {
      const targetHeight = window.matchMedia(`(min-width: ${APP.MEDIA.PHABLET}px)`).matches
        ? MAX_HEIGHT
        : `${dropdownContent.scrollHeight}px`;
      dropdownContent.style.maxHeight = targetHeight;
    }
  };

  const init = () => {
    hide();
    dropdownButton.addEventListener('click', toggle);
  };

  const destroy = () => {
    dropdownButton.classList.add(OPENED_CLASS);
    dropdownButton.ariaExpanded = true;
    dropdownContent.style.maxHeight = MAX_HEIGHT;
    dropdownContent.ariaHidden = false;
    dropdownButton.removeEventListener('click', toggle);
  };

  return {
    resize,
    init,
    destroy,
  };
};

const dropdowns = dropdownElements.map((item) => new Dropdown(item));
const resizeAll = debounce(() => dropdowns.forEach((dropdown) => dropdown.resize()), 300);

export const initDropdown = () => {
  dropdowns.forEach((dropdown) => dropdown.init());
  window.addEventListener('resize', resizeAll);
};

export const destroyDropdown = () => {
  dropdowns.forEach((dropdown) => dropdown.destroy());
  window.removeEventListener('resize', resizeAll);
};
