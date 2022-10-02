import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmit)

function onSubmit(evt){
  evt.preventDefault();
  let delayVal =Number(document.querySelector('[name="delay"]').value);
  let stepVal = Number(document.querySelector('[name="step"]').value);
  let amountVal = Number(document.querySelector('[name="amount"]').value);
  if (delayVal < 0 || stepVal < 0  || amountVal < 1) {
    Notiflix.Notify.failure('All values must be bigger than zero', {position: 'center-center'});
    return;
  }
  for (let position = 0; position < amountVal; position+=1) {
    createPromise(position, delayVal)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {position: 'center-center'});
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {position: 'center-center'});
    });
    delayVal += stepVal;
  };
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay)
  })
}