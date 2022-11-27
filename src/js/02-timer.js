import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startButton: document.querySelector(`button[data-start]`),
  daysEl: document.querySelector(`span[data-days]`),
  hoursEl: document.querySelector(`span[data-hours]`),
  minutesEl: document.querySelector(`span[data-minutes]`),
  secondsEl: document.querySelector(`span[data-seconds]`),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenTime = selectedDates[0].getTime();
    isAvaibleDate = chosenTime - Date.now();
    if (isAvaibleDate <= 0) {
      window.alert(
        'You cannot select a past date. Please choose a date in the future'
      );
      return;
    }
    refs.startButton.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor() {
    this.intervals = null;
    this.isActive = false;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    const currentTime = Date.now();
    let deltaTime = chosenTime - currentTime;

    this.intervals = setInterval(() => {
      deltaTime = deltaTime -= 1000;
      const time = convertMs(deltaTime);
      updateClockFace(time);
      if (deltaTime <= 1000) {
        clearInterval(this.intervals);
        this.isActive = false;
      }
    }, 1000);
  }
}

const timer = new Timer();

function onStartButtonClick() {
  timer.start();
}

refs.startButton.addEventListener(`click`, onStartButtonClick);

function pad(value) {
  return String(value).padStart(2, `0`);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.secondsEl.textContent = `${seconds}`;
}
