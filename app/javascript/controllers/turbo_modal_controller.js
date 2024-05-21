import { Controller } from "@hotwired/stimulus"
import { navigator } from '@hotwired/turbo'

// Connects to data-controller="turbo-modal"
export default class extends Controller {
  static targets = ["inner"];
  static history = [];

  constructor() {
    super(...arguments);

    // Initialize the listener property
    this.clickHandler = null;
  }

  connect() {
    this.constructor.history.push(this.element.innerHTML);
    const target = document.getElementsByClassName('turbo-modal')[0];
    const exitButton = document.getElementsByClassName('turbo-modal__btn--close')[0];

    if (target && !this.clickHandler) {
      this.clickHandler = (event) => {
        const withinBoundaries = event.composedPath().includes(target)
        console.log(withinBoundaries, 'withi');
        // const path = event.composedPath();
        // const filteredPath = path.filter(element => !Array.from(elementsToIgnore).includes(element));
        // const withinBoundaries = filteredPath.includes(target);

        // if (withinBoundaries) {
        // console.log('Click happened **INSIDE** element');
        if ((withinBoundaries) && (event.target === exitButton || exitButton.contains(event.target))) {
          // document.removeEventListener('click', this.clickHandler);
          console.log('Exit button clicked');
          // }
        }

        if (!withinBoundaries) {
          console.log('Click happened **OUTSIDE** element');
          this.closeModal();
        }
        // else {
        //   // document.removeEventListener('click', this.clickHandler);
        //   console.log('Click happened **OUTSIDE** element');
        // this.closeModal();
        // }
      };

      document.addEventListener('click', this.clickHandler);
    }
    // this.constructor.history.push(this.element.innerHTML);
    // const target = document.getElementsByClassName('turbo-modal')[0]
    // const elementsToIgnore = document.getElementsByClassName('turbo-modal__btn--close')[0];
    // // const elementsToIgnore = document.querySelectorAll('.ignore-class'); // Replace with the class or selector of elements to ignore

    // if (target && !this.clickHandler) {

    //   const clickHandler = (event) => {    

    //     // const withinBoundaries = event.composedPath().includes(target);
    //     const path = event.composedPath();


    //     const filteredPath = path.filter(element => !Array.from(elementsToIgnore).includes(element));

    //     const withinBoundaries = filteredPath.includes(target);

    //     if (withinBoundaries) {
    //       console.log('Click happened **INSIDE** element');

    //       // Remove the click event listener
    //     } else {
    //       document.removeEventListener('click', clickHandler);
    //       console.log('Click happened **OUTSIDE** element');
    //       this.closeModal();
    //     }
    //   };

    //   // Add the click event listener
    //   document.addEventListener('click', clickHandler);
    // }

    // const modal = document.querySelector('.turbo-modal');
    // const overlay = document.querySelector('.overlay');
    // const exitButton = document.querySelector('.turbo-modal__btn--close');

    // if (overlay && exitButton && modal) {
    //   const handleClick = (e) => {
    //     const clickedWithinModal = modal.contains(e.target);
    //     console.log(clickedWithinModal);
    //     if (!clickedWithinModal && !exitButton.contains(e.target)) {
    //       console.log('nested if');
    //       // If clicked outside Turbo Modal and not on exit button, close everything
    //       console.log('Clicked outside Turbo Modal');
    //       document.removeEventListener('click', handleClick);
    //       this.closeModal();
    //       // Turbo.visit(window.location.pathname.replace('/import-export', ''));
    //     }
    //   };

    //   // Add the click event listener to the body document
    //   document.addEventListener('click', handleClick);
    //   this.handleModalClick = handleClick;
    // }

    // const target = document.querySelector('.turbo-modal');
    // const target = document.getElementsByClassName('turbo-modal')[0];
    // // const exitButton = document.querySelector('.turbo-modal__btn--close');
    // const exitButton = document.getElementsByClassName('turbo-modal__btn--close')[0];

    // if (target && exitButton) {

    // //   // --------------------------------------
    //   const handleClick = (e) => {
    //     const withinModalBoundaries = e.composedPath().includes(target);

    //     if (exitButton.contains(e.target)) {
    //       // If exit button is clicked, close the modal
    //       console.log('Clicked exit button');
    //       document.removeEventListener('click', handleClick);
    //       this.closeModal();
    //       Turbo.visit(window.location.pathname.replace('/import-export', ''));
    //     } else if (!withinModalBoundaries) {
    //       // If clicked outside Turbo Modal, close everything
    //       console.log('Clicked outside Turbo Modal');
    //       document.removeEventListener('click', handleClick);
    //       this.closeModal();
    //       Turbo.visit(window.location.pathname.replace('/import-export', ''));
    //     } else {
    //       // If clicked inside Turbo Modal content, do nothing
    //       console.log('Clicked within Turbo Modal content');
    //     }
    //   };

    //   // Add the click event listener to the body document
    //   document.addEventListener('click', handleClick);
    // }
  }

  //  handleClick = (e) => {
  //   if (!overlay.contains(e.target) && !exitButton.contains(e.target)) {
  //     // If clicked outside Turbo Modal and not on exit button, close everything
  //     console.log('Clicked outside Turbo Modal');
  //     document.removeEventListener('click', handleClick);
  //     this.closeModal();
  //     // Turbo.visit(window.location.pathname.replace('/import-export', ''));
  //   }
  // };

  disconnect() {
    if (this.clickHandler) {
      document.removeEventListener('click', this.clickHandler);
      this.clickHandler = null;
      console.log('done closeModal remove');
    }
    console.log('disconnected');
    // Remove event listener when the controller is disconnected
    Turbo.cache.clear();
    // this.clearState();
    // this.element.removeEventListener("click", this.openModal.bind(this));
  }


  openModal() {
    document.body.classList.add('restricted');
    document.getElementsByClassName('overlay')[0].classList.add('active');
  }

  closeModal() {
    // if (this.clickHandler) {
    //   document.removeEventListener('click', this.clickHandler);
    //   this.clickHandler = null;
    //   console.log('done closeModal remove');
    // }
    // document.removeEventListener('click', this.handleModalClick);

    this.clearState();
    // Turbo.visit(window.location.pathname.replace('/import-export', ''), { action: "replace" });
    const newUrl = window.location.pathname.replace('/import-export', '');

    // Use Turbo to update the URL without triggering a request
    // Turbo.visit(newUrl, { action: 'replace' });
    // Turbo.visit(newUrl, { action: 'replace', historyChanged: true });
    // const newUrl = window.location.pathname.replace('/import-export', '');

    // Change the URL without triggering a request
    history.pushState(null, '', newUrl);
    // history.pushState({ path: newUrl }, '', newUrl);

    console.log(this.element, ' ELEMENT TO REMOVEOEOVEOVE');
    // console.log(this.element, 'this element remove before');
    // document.body.classList.remove('restricted');
    // document.getElementsByClassName('overlay')[0].classList.remove('active');
    this.element.remove()
  }

  clearState() {

    // Clear previous state of modal overlay and pointers event
    document.body.classList.remove('restricted');
    document.getElementsByClassName('overlay')[0]?.classList.remove('active');
  }

  changeImport(e) {
    console.log(this.element);
    console.log(e.target.value, 'lolol');
    const frame = document.getElementById('import_export');
    // frame.src = e.target.value;
    // frame.src = this.element;
    frame.id = "import_csv"
    // console.log(frame, " =import_csv");
    // frame.contentWindow.location.reload();
    frame.reload();
    // frame.contentWindow.location.reload();
  }

  changeExport(e) {
    // if (this.clickHandler) {
    //   document.removeEventListener('click', this.clickHandler);
    //   this.clickHandler = null;
    //   console.log('done closeModal remove');
    // }
    // e.preventDefault();
    // console.log('clicked');
    // const btn = document.getElementsByClassName('turbo-modal_btn--export-btn')[0];
    // btn.click();
    const link = document.createElement('a');
    link.href = '/admin/students/export-csv.csv' // Replace with the actual path to your CSV export action
    link.click();
    // link.target = '_blank'; // Opens the link in a new tab
    // console.log('done');
    // window.location.href = 'students';
    // window.location.href = 'http://localhost:3000/admin/students';
    // window.location.assign("http://localhost:3000/admin/students");
    // Turbo.visit("students", { action: "replace" })
    // Turbo.visit('students');

    // window.open(this.element.href, '_blank');
    // history.back()

    // console.log('clicked');
    // const frame = document.getElementById('import_export');
    // console.log(e.target.value, 'frame');
    // frame.src = e.target.value;
    // frame.id = "export_csv"

    // const flashMessages = document.getElementsByClassName('flash__message')[0];

    // if (flashMessages) {
    //   const alertBox = document.createElement('div');
    //   alertBox.classList.add('alert-box', 'notice');
    //   alertBox.innerHTML = '<div class="alert alert-info">CSV download started. Check your downloads folder.</div>';

    //   flashMessages.appendChild(alertBox);
    // }

    // console.log('boombbmbobm');
    // console.log(frame, " =export_csv");
    // frame.reload();
  }

  // reloadFlashMessages() {
  //   this.element.dispatchEvent(new Event("reloadFrame"));
  // }
  navigateTo(event) {
    const url = event.currentTarget.getAttribute("data-url");
    console.log(url);
    if (url) {
      Turbolinks.visit(url);
    }
  }

  goBack(e) {
    console.log('clicked');
    Turbo.visit('students/import-export');
    // const frame = document.getElementById('import_csv');
    // frame.src = e.target.value;
    // frame.id = "import_export"
    // console.log(frame, " =import_export");
    // frame.reload();
    // window.Turbo.navigator.history.replace({ href: "http://localhost:3000/admin/students" });
    // window.history.back();
    // this.element.remove();
    // navigator.history;
    // console.log(navigator.history);
    // this.element.remove();
    // window.history.back();    
  }

  // goBack2+1(e) {
  //   const frame = document.getElementById('import_csv');
  //   console.log('Current history length:', this.constructor.history.length);

  //   if (this.constructor.history.length > 1) {
  //     // Remove the click event listener before updating the Turbo Frame content
  //     document.removeEventListener('click', this.handleModalClick);

  //     this.constructor.history.pop();
  //     const previousState = this.constructor.history[this.constructor.history.length - 1];
  //     console.log('Previous state:', previousState);

  //     // Update the content of the Turbo Frame with the previous state
  //     frame.innerHTML = previousState;

  //     // Reinitialize the click event listener after updating the Turbo Frame content
  //     document.addEventListener('click', this.handleModalClick);

  //     console.log('Updated Turbo Frame with the previous state');
  //   }
  // }

  goBack265(e) {
    const frame = document.getElementById('import_csv'); // Replace with the actual ID of your Turbo Frame
    console.log('Current history length:', this.constructor.history.length);

    if (this.constructor.history.length > 1) {
      // Remove the click event listener before updating the Turbo Frame content
      document.removeEventListener('click', this.handleModalClick);

      this.constructor.history.pop();
      const previousState = this.constructor.history[this.constructor.history.length - 1];
      console.log('Previous state:', previousState);

      // Update the content of the Turbo Frame with the previous state
      frame.innerHTML = previousState;

      // Reinitialize the click event listener after updating the Turbo Frame content
      document.addEventListener('click', this.handleModalClick);

      console.log('Updated Turbo Frame with previous state');
    }
  }


  goBack2(e) {
    const frame = document.getElementById('import_csv'); // Replace with the actual ID of your Turbo Frame
    console.log('Current history length:', this.constructor.history.length);

    if (this.constructor.history.length > 1) {
      this.constructor.history.pop();
      const previousState = this.constructor.history[this.constructor.history.length - 1];
      console.log('Previous state:', previousState);

      // Update the content of the Turbo Frame with the previous state
      frame.innerHTML = previousState;
      console.log('go back btn done');
      console.log('Updated Turbo Frame with previous state');
    }
  }


  goBack23(e) { // this
    const target = document.getElementsByClassName('turbo-modal')[0];
    // console.log(target);
    // console.log(this.element, 'this element');
    // console.log(this.constructor.history[1], 'heheh');
    // console.log(this.constructor.history.length);
    if (this.constructor.history.length > 1) {
      this.constructor.history.pop();
      const previousState = this.constructor.history[this.constructor.history.length - 1];
      // console.log(previousState, 'previousState');
      target.innerHTML = previousState;
      console.log(target, 'target');
    }


    // goBack2(e) { olddldldldldl
    //   const frame = document.getElementById('import_csv');
    //   frame.src = e.target.value;
    //   frame.id = "import_export"
    //   console.log('started goback2');
    //   // console.log('historyKey:', this.data.get('history-key'));
    //   console.log(this.constructor.history.pop(), 'history');
    //   console.log(this.constructor.history.length - 1, 'this current');
    //   console.log(this.constructor.history, 'history');
    //   console.log(this.constructor.history[1], 'heheh');
    //   console.log(this.constructor.history.length);
    //   if (this.constructor.history.length > 1) {
    //     this.constructor.history.pop();
    //     const previousState = this.constructor.history[1];
    //     console.log(previousState, 'previousState');
    //     this.element.innerHTML = previousState;
    //   }
    //   // if (this.element.dataset.historyKey) {
    //   //   this.constructor.history.pop();
    //   //   const previousFrame = this.constructor.history[this.constructor.history.length - 1];
    //   //   Turbo.visit(previousFrame, { action: 'replace' });
    //   // }

    //   console.log('finished goback2');
  }

  goBack3() {
    if (this.constructor.history.length > 1) {
      this.constructor.history.pop();
      const previousState = this.constructor.history[this.constructor.history.length - 1];
      this.element.innerHTML = previousState;
    }
  }
}
