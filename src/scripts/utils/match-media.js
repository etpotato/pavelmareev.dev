export default (media, inCb, outCb) => {
  const matchMedia = window.matchMedia(media);

  const listener = (evt) => {
    if (evt.matches) inCb && inCb();
    else outCb && outCb();
  };

  listener(matchMedia);

  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    matchMedia.addListener(listener);
  } else {
    matchMedia.addEventListener('change', listener);
  }
};
