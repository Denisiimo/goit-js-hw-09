import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmit)

function onSubmit(action){
  action.preventDefault();
  let delayRef =Number(action.currentTarget.elements.delay.value);
  let stepNum = Number(action.currentTarget.elements.step.value);
  let amountVal = Number(action.currentTarget.elements.amount.value);
  if (delayRef < 0 || stepNum < 0  || amountVal < 1) {
    Notiflix.Notify.failure('All values must be bigger than zero', {position: 'center-center'});
    return;
  }
  for (let position = 0; position < amountVal; position += 1) {
    createPromise(position + 1, delayRef)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {position: 'center-center'});
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {position: 'center-center'});
    });
    delayRef += stepNum;
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