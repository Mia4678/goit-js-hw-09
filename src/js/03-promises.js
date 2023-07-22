import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = form.elements.delay;
  const stepInput = form.elements.step;
  const amountInput = form.elements.amount;

  const delay = parseInt(delayInput.value, 10);
  const step = parseInt(stepInput.value, 10);
  const amount = parseInt(amountInput.value, 10);

  for (let i = 0; i < amount; i++) {
    createPromise(i, delay + i * step)
      .then(({ position, delay }) => {
        // Використовуємо Notiflix для відображення успішного повідомлення
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // Використовуємо Notiflix для відображення повідомлення про відхилення
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});