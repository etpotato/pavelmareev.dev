import memo from './utils/memo';
import debounce from './utils/debounce';

const NAV_CLASS = 'js-nav';
const NAV_LIST_CLASS = 'js-nav-list';
const LINK_CLASS = 'js-nav-link';
const NAV_ANCHOR_CLASS = 'js-nav-anchor';
const SECTION_CLASS = 'js-nav-section';
const ACTIVE_CLASS = 'active';
const PADDING_MOBILE = 8;
const PADDING_DESKTOP = 12;
const SCROLL_TIMEOUT = 200;
const DEVICES = {
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
};

const nav = document.querySelector(`.${NAV_CLASS}`);
const navList = nav.querySelector(`.${NAV_LIST_CLASS}`);
const links = [...navList.querySelectorAll(`.${LINK_CLASS}`)];
const navAnchor = document.querySelector(`.${NAV_ANCHOR_CLASS}`);
const sections = [...document.querySelectorAll(`.${SECTION_CLASS}`)];

const getNavHeight = memo((deviceType) => {
  switch (deviceType) {
    case DEVICES.MOBILE:
      return nav.clientHeight;
    case DEVICES.DESKOP:
      return PADDING_DESKTOP;
    default:
      return null;
  }
});

const scrollNavToLink = (link) => {
  const scrollAmount = navList.scrollLeft
    + link.getBoundingClientRect().x - PADDING_MOBILE * 2;
  navList.scroll({
    left: scrollAmount,
    behavior: 'smooth',
  });
};

const initObserver = (observer, entries) => entries.forEach((entry) => observer.observe(entry));
const clearObserver = (observer, entries) => entries.forEach((entry) => observer.unobserve(entry));

const getSectionCallback = (deviceType) => (entries) => {
  const isMobile = deviceType === DEVICES.MOBILE;
  entries.forEach((entry) => {
    const { id } = entry.target;
    if (!id) return;

    if (entry.isIntersecting) {
      links.forEach((link) => {
        link.classList.remove(ACTIVE_CLASS);
        if (link.href.includes(id)) {
          isMobile && scrollNavToLink(link);
          link.classList.add(ACTIVE_CLASS);
        }
      });
    } else {
      links.find((link) => link.href.includes(id)).classList.remove(ACTIVE_CLASS);
    }
  });
};

const anchorCallback = ([entry]) => {
  if (!entry.isIntersecting && entry.boundingClientRect.bottom >= entry.rootBounds.bottom) {
    nav.classList.remove(ACTIVE_CLASS);
    links.forEach((link) => link.classList.remove(ACTIVE_CLASS));
  } else nav.classList.add(ACTIVE_CLASS);
};

const getSectionsObserver = (() => {
  const observers = {
    [DEVICES.MOBILE]: false,
    [DEVICES.DESKTOP]: false,
  };

  return (deviceType) => {
    if (observers[deviceType] === false) {
      observers[deviceType] = new IntersectionObserver(getSectionCallback(deviceType), {
        rootMargin: '-50%',
      });
    }

    return observers[deviceType];
  };
})();

const getLinkClickHandler = (deviceType) => {
  // eslint-disable-next-line no-use-before-define
  const debouncedScrollListener = debounce(scrollListener, SCROLL_TIMEOUT);

  function scrollListener() {
    initObserver(getSectionsObserver(deviceType), sections);
    window.removeEventListener('scroll', debouncedScrollListener);
  }

  return (evt) => {
    if (!evt.target.classList.contains(LINK_CLASS)) return;
    evt.preventDefault();

    const link = evt.target;
    const id = new URL(link.href).hash.slice(1);
    const targetSection = sections.find((section) => section.id === id);
    const windowScrollAmount = window.scrollY
      + targetSection.getBoundingClientRect().y - getNavHeight(deviceType);

    clearObserver(getSectionsObserver(deviceType), sections);
    links.forEach((item) => item.classList.remove(ACTIVE_CLASS));
    link.classList.add(ACTIVE_CLASS);
    link.blur();
    window.addEventListener('scroll', debouncedScrollListener);
    window.scroll({
      top: windowScrollAmount,
      behavior: 'smooth',
    });

    if (deviceType === DEVICES.MOBILE) scrollNavToLink(link);
  };
};

const anchorObserver = new IntersectionObserver(anchorCallback, {
  rootMargin: '100% 0px -120% 0px',
});

const mobileLinkClickHandler = getLinkClickHandler('mobile');
const desktopLinkClickHandler = getLinkClickHandler('desktop');

export const initNavAnchor = () => initObserver(anchorObserver, [navAnchor]);

export const initMobileNav = () => {
  clearObserver(getSectionsObserver(DEVICES.DESKTOP), sections);
  initObserver(getSectionsObserver(DEVICES.MOBILE), sections);
  navList.removeEventListener('click', desktopLinkClickHandler);
  navList.addEventListener('click', mobileLinkClickHandler);
};

export const initDesktopNav = () => {
  clearObserver(getSectionsObserver(DEVICES.MOBILE), sections);
  initObserver(getSectionsObserver(DEVICES.DESKTOP), sections);
  navList.removeEventListener('click', mobileLinkClickHandler);
  navList.addEventListener('click', desktopLinkClickHandler);
};
