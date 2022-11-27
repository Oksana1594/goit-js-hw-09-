const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('input[name="delay"]'),
  delayStep: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isresolve = Math.random() > 0.3;
      if (isresolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  let firstDelayValue = Number(refs.firstDelay.value);
  let delayStepValue = Number(refs.delayStep.value);
  let amountValue = Number(refs.amount.value);

  for (let i = 0; i < amountValue; i += 1) {
    createPromise(i + 1, i * delayStepValue + firstDelayValue)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  event.target.reset();
}

refs.form.addEventListener('submit', onFormSubmit);
