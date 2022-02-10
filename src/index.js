import './index.twig';
import './styles/index.scss';

import APP from './config';
import initTimers from './scripts/timer';
import matchMedia from './scripts/utils/match-media';
import { init, destroy } from './scripts/dropdown';

const today = new Date();

initTimers(today);
matchMedia(`(min-width: ${APP.MEDIA.PHABLET}px)`, destroy, init);
