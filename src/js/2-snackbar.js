import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('[name="delay"]');
const setledInput = document.querySelectorAll('[name="state"]');

form.addEventListener('submit', onFormSubmit);

iziToast.info({
  title: 'Hello',
  message: 'Welcome!',
  position: 'topCenter',
  timeout: 3000,
});

function onFormSubmit(evt) {
  evt.preventDefault();

  const delay = delayInput.value;
    const setled = Array.from(setledInput).find(input => input.checked).value;
    
  if (isNaN(delay) || delay <= 0 || !setled) {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter a valid delay and select a state.',
      position: 'topCenter',
    });
    evt.currentTarget.reset();
    return;
  }

  const makePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (setled === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  evt.currentTarget.reset();

  makePromise
    .then(delay =>
      iziToast.success({
        title: '👏 Congratulation!',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
      })
    )
    .catch(delay =>
      iziToast.error({
        title: '🥺 Ooops...',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topCenter',
      })
    );
}
