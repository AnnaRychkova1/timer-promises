import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const TIMER_DELAY = 1000;
let intervalId = null;
let userSelectedDate = null;
let currentDate = null;
let remainingTime = 0;

const calendar = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

iziToast.success({
  title: '👋 Greeting, my Friend!',
  message: 'Please, choose a date and click on "Start" button to start timer',
  position: 'topCenter',
});

startButton.disabled = true;
startButton.addEventListener('click', timerStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateCheck(selectedDates);
  },
};

flatpickr(calendar, options);

function onDateCheck(selectedDates) {
  userSelectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();

  if (userSelectedDate > currentDate) {
    iziToast.info({
      title: '🥰 Congratulation! Click on start!',
      message: 'Please click on the "Start" button to start timer',
      position: 'topCenter',
      timeout: 10000,
    });
    startButton.disabled = false;
    return;
  }
  iziToast.error({
    title: '🥺 Ooops...',
    message: 'Please choose a date in the future',
    position: 'topCenter',
  });
}

function timerStart() {
  intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    if (userSelectedDate - currentDate <= 1000) {
      clearInterval(intervalId);
      startButton.disabled = true;
      calendar.disabled = false;

      iziToast.success({
        title: '👏 Congratulation! Timer stopped!',
        message:
          'Please, if you want to start timer, choose a date and click the "Start" button',
        position: 'topCenter',
      });

      return;
    } else {
      startButton.disabled = true;
      calendar.disabled = true;
      currentDate += 1000;
      remainingTime = Math.floor(userSelectedDate - currentDate);
      updateTimer(convertMs(remainingTime));
    }
  }, TIMER_DELAY);
}

function updateTimer({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${addLeadingZero(days)}`;
  dataHours.textContent = `${addLeadingZero(hours)}`;
  dataMinutes.textContent = `${addLeadingZero(minutes)}`;
  dataSeconds.textContent = `${addLeadingZero(seconds)}`;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
