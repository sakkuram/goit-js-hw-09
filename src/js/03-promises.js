import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        console.log(`Promise ${position} resolved after ${delay} ms`);
        resolve();
      } else {
        console.log(`Promise ${position} rejected after ${delay} ms`);
        reject();
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const firstDelay = parseInt(this.elements.delay.value);
  const delayStep = parseInt(this.elements.step.value);
  const amount = parseInt(this.elements.amount.value);

  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelay + (i - 1) * delayStep;
    createPromise(i, currentDelay)
      .then(() => {
        // Handle resolution if needed
      })
      .catch(() => {
        // Handle rejection if needed
      });
  }
});
