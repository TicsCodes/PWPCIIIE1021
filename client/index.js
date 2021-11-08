/* eslint-disable no-console */
/* eslint-disable no-alert */
import './stylesheets/style.css';
import './stylesheets/mystyle.css';

console.log('Webpack Funcionando!!!!');
// default parameters ES6/2015
const show = (m = 'hola') => {
  alert(m);
};

show();

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('Calling an Async function');
  const result = await resolveAfter2Seconds();
  console.log(result);
}

asyncCall();
