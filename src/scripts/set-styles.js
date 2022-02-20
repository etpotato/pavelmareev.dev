const NOJS_CLASS = 'no-js';

const elements = [...document.querySelectorAll(`.${NOJS_CLASS}`)];

export default () => elements.forEach((element) => element.classList.remove(NOJS_CLASS));
