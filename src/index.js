import './index.twig';
import './styles/index.scss';

import smoothscroll from 'smoothscroll-polyfill';
import APP from './config';
import initTimers from './scripts/timer';
import matchMedia from './scripts/utils/match-media';
import { initNavAnchor, initMobileNav, initDesktopNav } from './scripts/nav';
import { initDropdown, destroyDropdown } from './scripts/dropdown';

const today = new Date();

smoothscroll.polyfill();
initNavAnchor();
matchMedia(`(min-width: ${APP.MEDIA.LAPTOP}px)`, initDesktopNav, initMobileNav);
initTimers(today);
matchMedia(`(min-width: ${APP.MEDIA.PHABLET}px)`, destroyDropdown, initDropdown);
