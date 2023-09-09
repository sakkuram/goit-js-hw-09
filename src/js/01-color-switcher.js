function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const body = document.body;
let intervalId;

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);

function startColorChange() {
  // Disable the "Start" button and enable the "Stop" button
  startButton.disabled = true;
  stopButton.disabled = false;

  // Start changing the background color every second
  intervalId = setInterval(changeBackgroundColor, 1000);
}

function stopColorChange() {
  // Enable the "Start" button and disable the "Stop" button
  startButton.disabled = false;
  stopButton.disabled = true;

  // Stop changing the background color
  clearInterval(intervalId);
}

function changeBackgroundColor() {
  // Set a random background color
  body.style.backgroundColor = getRandomHexColor();
}
