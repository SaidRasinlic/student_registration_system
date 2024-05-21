import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="csv-export"
export default class extends Controller {
  connect() {
    console.log('csv-export controller');
  }
  
  changeExport(e) {
    console.log('csv-export changeExport called');
    // e.preventDefault();
    // console.log('clicked');
    // const btn = document.getElementsByClassName('turbo-modal_btn--export-btn')[0];
    // btn.click();
    // const link = document.createElement('a');
    // link.href = '/admin/students/export-csv.csv' // Replace with the actual path to your CSV export action
    // link.click();
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
}
