'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

let leftClicked = false;
let rightClicked = false;

const promise3 = new Promise((resolve) => {
  function checkClicked() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClicked = true;
    checkClicked();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;
    checkClicked();
  });
});

function handleSuccess(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = message;
  document.body.appendChild(div);
}

function handleError(error) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'error';
  div.textContent = error.message;
  document.body.appendChild(div);
}

promise1.then(handleSuccess).catch(handleError);
promise2.then(handleSuccess).catch(handleError);
promise3.then(handleSuccess).catch(handleError);
