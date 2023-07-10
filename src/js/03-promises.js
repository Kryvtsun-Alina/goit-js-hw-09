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
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const delay = parseInt(formData.get('delay'));
  const step = parseInt(formData.get('step'));
  const amount = parseInt(formData.get('amount'));

  const promises = [];
  let currentDelay = delay;

  for (let i = 1; i <= amount; i++) {
    promises.push(createPromise(i, currentDelay));
    currentDelay += step;
  }

  Promise.allSettled(promises)
    .then((results) => {
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          console.log(`✅ Fulfilled promise ${result.value.position} in ${result.value.delay}ms`);
        } else {
          console.log(`❌ Rejected promise ${result.reason.position} in ${result.reason.delay}ms`);
        }
      });
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });

  form.reset();
}