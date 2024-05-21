import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="login-register"
export default class extends Controller {
  static targets = ["pwIcon", "form", "said"];

  connect() {
    console.log("login-register connected.");
    // this.formContainerClass = "active";
    // this.showClass = "show";
    this.toggleActiveClass();

    this.element.addEventListener('turbo:load', this.handleMe.bind(this));

    // console.log(this.saidTarget.classList, 'classList');
    // console.log(this.saidTarget, 'saidTarget');
    // if (this.saidTarget) {

    //   console.log(this.saidTarget, 'saidTarget');
    // }

    // let errorInput = document.querySelector('input#user_full_name');

    // errorInput?.addEventListener(('input'), () => {
    //   errorInput.classList.toggle('error')
    //   console.log('called');
    // })
    // if (this.element.dataset.signInRedirectedFrom === "sign_up") {
    //   console.log('redirected');
    //   const registerForm = document.querySelector('.form');
    //   registerForm.classList.add("active");
    // }
    const redirectedFrom = new URLSearchParams(window.location.search).get("redirected_from");
    // const urlParams = new URLSearchParams(window.location.search);
    // const redirectedFrom = urlParams.get("redirected_from");

    if (redirectedFrom === "sign_up") {
      console.log('redirected');
      this.formTarget.classList.add("active");
      history.replaceState(null, null, 'sign_up')
    }
  }

  handleMe(e) {
    e.preventDefault();
    console.log('handleMe() ');
    let form = this.element.querySelector('form'); // Assuming the form is a direct child of the controller's element
    console.log(form, "OLOL");
    if (form) {
      form.reset();
      console.log('Form reset AAHAHAHAHAHA');
    }
    // console.log(this.saidTarget, 'neenenenenw');
    // let error = document.querySelector('input#user_full_name');
    // if (errorInput.classList.contains('error')) {
    //   errorInput.classList.remove('error')
    // }
    // console.log(errorInput, 'errorInput');
    // this.element.reset();
    // if (error) {
    //   error?.classList.remove('error')
    // } else {
    //   error?.classList.add('error')
    // }
    // this.formTarget.reset();
    // this.formTarget.controller = null;
    // this.formTarget.setAttribute("data-controller", "login-register");
    // this.connect();
  }


  toggleActiveClass() {
    console.log('huiolkj');
    const registerForm = this.formTarget;
    const currentPath = window.location.pathname;

    if (currentPath.includes("/users/sign_up")) {
      console.log('whahahahahahah');
      registerForm.classList.add("active");
    } else {
      registerForm.classList.remove("active");
    }
  }

  triggerAnimation() {
    console.log('omg im working');
    this.fieldTarget.classList.remove("error");
    void this.fieldTarget.offsetWidth; // Trigger reflow to restart the animation
    this.fieldTarget.classList.add("error");
  }

  toggleVisibility(e) {
    e.preventDefault();
    console.log('clicked');
    let pwInput = e.target.parentElement.querySelector("input");
    // const cursorPosition = pwInput.selectionStart;

    if (pwInput.type === "password") {
      pwInput.type = "text";
      console.log(e.target);
      e.target.classList.replace("fa-eye-slash", "fa-eye");
      // pwInput.focus();
    } else {
      pwInput.type = "password";
      e.target.classList.replace("fa-eye", "fa-eye-slash");
    }
    pwInput.focus();
  }
  // pwInput.type = pwInput.type === "password" ? "text" : "password";
  // this.pwIconTarget.classList.toggle("uil-eye-slash");
  // this.pwIconTarget.classList.toggle("uil-eye");

  // showForm() {
  //   this.homeTarget.classList.add(this.showClass);
  // }

  // hideForm() {
  //   this.homeTarget.classList.remove(this.showClass);
  // }

  toggle(e) {
    e.preventDefault();
    // Change the URL without reloading the page
    let newUrl = e.target.getAttribute("href");
    history.replaceState(null, null, newUrl);
    this.formTarget.classList.toggle('active');
    // let clickedLink = e.target;

    // Toggle active class form
    // let form = document.getElementsByClassName("form")[0];
    // console.log(form);
    // let hiddenClass = "active"
  }

  toggle2(e) {
    // e.preventDefault();
    console.log('toggle2 called');
    let form = document.getElementsByClassName("form")[0];
    let hiddenClass = "active"
    console.log(form);
    // form.classList.toggle(hiddenClass);
    // form.submit();
  }


  // switchToSignup(event) {
  //   event.preventDefault();
  //   this.formContainerTarget.classList.add(this.formContainerClass);
  // }

  // switchToLogin(event) {
  //   event.preventDefault();
  //   this.formContainerTarget.classList.remove(this.formContainerClass);
  // }
}
