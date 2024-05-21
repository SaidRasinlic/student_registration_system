import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="form"
export default class extends Controller {
  connect() {
    //     this.element.reset();
    //     console.log(this.element, "this elem");
    // const frame = document.getElementById('registry');
    //     const frame2 = frame.querySelector('.form__register').querySelector('form#new_user');
    //     const form = frame.querySelector('form#new_user');
    // console.log(form, 'FORM IS HERE BRO');
    //     // Reset the form
    //     form.reset();
    //     // frame2.reset();
    //     console.log(frame2, 'jewweow');

    // let lol = frame.getElementById('new_user').reset();
    // if (lol) lol.innerHTML = '';
    // console.log(frame.querySelector('#new_user'), 'frame');
    // const newUserForm = frame.querySelector('#new_user');
    // frame.querySelector('#new_user').reset();
    // newUserForm.reset();
    // console.log(newUserForm);

    // frame.querySelectorAll('input').forEach(input => {
    //   input.value = null;
    // });

    // let errorInput = document.querySelector('input#user_full_name');

    // errorInput?
    // this.element.addEventListener('change', () => {
    //   console.log('event triggered');
    //   setTimeout(() => {
    //     this.element.reset();
    //     // this.element.innerHTML = '';
    //    console.log('done');
    //   }, 1500);
    // });

    // const form = document.querySelector('#new_user');
    // console.log(this.form, "ELEMENRNRANRLFAJIDA");
    // if (this.element) {
    //   this.element.reset();
    //   // this.element.remove();
    // }
    this.removeErrorClass();
    // this.element.reset();
    // console.log(this.element);

  }


  removeErrorClass() {
    // Select all elements with the error class
    let errorElements = document.querySelectorAll('.error');
    let emElements = document.querySelectorAll('em');
    // console.log(em);
    setTimeout(() => {
      // Remove <em> elements from the DOM
      emElements.forEach(emElement => {
        emElement.remove();
      });

      // Remove the error class from each error element
      errorElements.forEach(element => {
        element.classList.replace('error', 'newClassName');
      });
    }, 4000);
  }

  resetForm() {
    // Reset the form
    const formElement = document.querySelector('form#new_user');
    if (formElement) {
      formElement.reset();
      console.log('Form has been reset');
    } else {
      console.error('Form element not found');
    }
    console.log(this.element, 'insde resetFOrm');
  }

  // reset(e) {
  //   console.log('reset called sir');

  //   if (e.detail.success) {
  //     this.element.reset();
  //     console.log(this.element, 'suskakka');

  //     // this.element.reset();
  //     // this.element.remove();
  //     e.detail.fetchResponse.response.text().then(value => {
  //       this.element.reset();
  //       console.log(value, 'value');
  //       // this.element.reset();
  //       //value contains the response, if response is html, if response is 
  //       //json, event.detail.fetchResponse.response.json() (did not try, 
  //       //should work)
  //     })
  //   }
  //   // const formy = document.querySelector('form#new_user');
  //   // console.log(this.element); // Check if the correct element is being targeted
  //   // setTimeout(() => {
  //   // frame.src = "/exercises/" + lol + ".turbo_stream"
  //   // const frame = document.getElementById('registry');
  //   // frame.querySelectorAll('input').forEach(input => {
  //   //   input.value = '';
  //   // });
  //   // formy.reset()
  //   // console.log(formy, 'formy');
  //   // console.log(this.element);
  //   // frame.reset;
  //   //   console.log('reset called sir (after timeout)');
  //   //   console.log(this.element, 'reset here');
  //   //   this.element.reset();
  //   //   const newUserElement = frame.querySelector('#new_user');
  //   //   newUserElement.reset();
  //   //   newUserElement.querySelectorAll('input').forEach(input => {
  //   //     input.value = '';
  //   // });
  //   //   console.log(newUserElement, 'frame');
  //   //   console.log(newUserElement);
  //   //   // frame.innerHTML = newUserElement;
  //   //   frame.appendChild(newUserElement);
  //   // this.element.reset();
  //   // console.log(this.element, 'hehehehehe');
  //   // }, 4500);
  //   //   console.log(this.element, 'resert called');
  //   //   e.detail.fetchResponse.response.text().then(value => {
  //   //     console.log(value);
  //   //   })
  //   //   this.element.reset();
  //   // }
  // }

}
