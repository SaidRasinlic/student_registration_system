// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"

// To see how the app will behave without Hotwire, disable the Turbo Drive framework. With the following line:
// Turbo.session.drive = false // uncomment this line if you want to disable it, by default it's ON.
// Turbo.session.drive = false

// document.querySelectorAll('turbo-frame').forEach((el) => {
//   el.dataset.turbo = false
// });

// document.addEventListener('turbo:before-fetch-request', function (event) {
//   if (event.target.matches('.button_to')) {
//     const spinnerContainer = document.getElementById('loading-spinner');
//     spinnerContainer.style.display = 'flex';
//   }
// });

// document.addEventListener('turbo:load', function (event) {
//   if (event.target.matches('.turbo-modal__inner')) {
//     const spinnerContainer = document.getElementById('loading-spinner');
//     spinnerContainer.style.display = 'none';
//   }
// });

// document.addEventListener('turbo:load', function (event) {
//   const spinnerContainer = document.getElementById('loading-spinner');

//   // Check if the URL matches a specific pattern or condition
//   if (event.target.href.includes('/your_specific_path')) {
//     spinnerContainer.style.display = 'none';
//   }
// });


// document.addEventListener('turbo:before-fetch-request', function (event) {
//   const spinnerContainer = document.getElementById('loading-spinner');

//   // Check if the URL matches a specific pattern or condition
//   if (window.location.href.includes('/your_specific_path')) {
//     spinnerContainer.style.display = 'flex';
//   }
// });

// document.addEventListener('turbo:before-fetch-response', function (event) {
//   const spinnerContainer = document.getElementById('loading-spinner');

//   // Check if the URL matches a specific pattern or condition
//   if (window.location.href.includes('/your_specific_path')) {
//     spinnerContainer.style.display = 'none';
//   }
// });


// trigger anime always on route change
// document.addEventListener('turbo:before-fetch-request', function () {
//   const spinnerContainer = document.getElementById('loading-spinner');
//   spinnerContainer.style.display = 'flex';
// });

// document.addEventListener('turbo:before-fetch-response', function () {
//   const spinnerContainer = document.getElementById('loading-spinner');
//   spinnerContainer.style.display = 'none';
// });

// -----------------------------------------------------------------------------------------------------

// document.addEventListener('turbo:before-fetch-request', function () {
//   console.log('turbo:before-fetch-request called');
//   const importButton = document.querySelector('.btn--import');
//   console.log(importButton);

//   if (importButton) {
//     console.log('here');
//     importButton.addEventListener('click', function (event) {
//       const spinnerContainer = document.getElementById('loading-spinner');
//       spinnerContainer.style.display = 'flex';
//     });
//   }
// });


// document.addEventListener('turbo:before-fetch-response', function (event) {
//   const spinnerContainer = document.getElementById('loading-spinner');

//   // Check if the clicked element has a specific class or data attribute
//   if (event.target.getElementsByClassName('btn--import')[0]) {
//     spinnerContainer.style.display = 'none';
//   }
// });

// -----------------------------------------------------------------------------------------------------









// ______________________________________________________________________________________________________

document.addEventListener('turbo:load', () => {
  // console.log('turbo loaded');
  // Function to be called on load
  addEventListeners = () => {
    const importButton = document.querySelector('.btn--import');

    if (importButton) {
      // console.log('here');

      // Event listener for the 'click' event on the import button
      importButton.addEventListener('click', () => {
        const spinnerContainer = document.getElementById('loading-spinner');
        spinnerContainer.style.display = 'flex';
      });
    }
  }

  // Call the function to add event listeners on Turbo load
  addEventListeners();
});

document.addEventListener('turbo:before-fetch-response', (event) => {
  const spinnerContainer = document.getElementById('loading-spinner');

  // Check if the clicked element has a specific class or data attribute
  if (event.target.getElementsByClassName('btn--import')[0]) {
    spinnerContainer.style.display = 'none';
  }
});






// document.addEventListener('turbo:frame-render', (event) => {
//   console.log('BOY THIS SUX');
//   // Check if the rendered element has the desired Stimulus controller
//   const element = event.detail.newBody.querySelector('[data-controller="login-register"]');
//   console.log(event.detail.url);
//   console.log(event.detail.action);
//   if (element) {
//     // Reconnect the Stimulus controller
//     const controller = Stimulus.controllers.get('login-register', element);
    
//     if (controller) {
//       controller.connect();
//     }
//   }
// });

// document.addEventListener('turbo:after-cache', () => {
//   document.body.classList.remove('restricted');
//   document.getElementsByClassName('overlay')[0].classList.remove('active');
// })

// ______________________________________________________________________________________________________

// document.addEventListener('turbo:before-fetch-request', function (event) {
//   const spinnerContainer = document.getElementById('loading-spinner');
//   console.log(event.target, 'event');
//   console.log(event.target.getElementsByClassName('btn--import')[0], 'getElement');
//   console.log();
//   // console.log(event.target.classList.contains('turbo-modal_btn--import-btn'));
//   // Check if the clicked element has a specific class or data attribute
//   if (event.target.getElementsByClassName('btn--import')[0]) {
//     spinnerContainer.style.display = 'flex';
//   }
// });