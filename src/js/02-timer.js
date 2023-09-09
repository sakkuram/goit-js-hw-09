import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.querySelector('[data-start]');
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  let countdownInterval;

  function updateTimer() {
    const currentDate = new Date().getTime();
    const inputDate = new Date(
      document.getElementById('datetime-picker').value
    ).getTime();
    const timeRemaining = inputDate - currentDate;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      alert('Countdown expired!');
      return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    daysElement.textContent = String(days).padStart(2, '0');
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
  }

  startButton.addEventListener('click', function () {
    countdownInterval = setInterval(updateTimer, 1000);
    updateTimer();
  });
});
