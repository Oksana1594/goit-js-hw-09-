const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

const CHENGE_DELAY = 1000;
let timeoutId = null;
let isActive = false;

refs.start.addEventListener(`click`, onClick);
refs.stop.addEventListener(`click`, onStop);

function onClick() {
  if (isActive) {
    return;
  }

  isActive = true;
  timeoutId = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.background = color;
  }, CHENGE_DELAY);
}

function onStop() {
  clearInterval(timeoutId);
  isActive = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
