import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({position, delay})
    } else {
      reject({position, delay})
    }
  })
}

const submit = document.querySelector('.form')

function createPromises(e) {
  e.preventDefault();
  let delay = Number(submit[0].value)
  let delayStep = Number(submit[1].value)
  let amount = Number(submit[2].value)
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        }, delay)
  })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        }, delay)
      });
    delay += delayStep
  }
};


submit.addEventListener('submit', createPromises)