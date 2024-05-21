import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="import-csv"
export default class extends Controller {
  static targets = ["fileInfo", "fileName"];

  // static targets = ["fileInfo", "fileName"];

  connect() {
    this.fileInput = this.element.querySelector('#import_file');
    if (!this.fileInput) return;
    this.fileInput.addEventListener('change', this.handleFileChange.bind(this));
    // this.fileInput = this.element.querySelector("input[type=file]");
    // this.fileInput.addEventListener("change", this.handleFileChange.bind(this));

    // // this.element.addEventListener('click', this.triggerFileInput.bind(this));
    console.log(this.element);
    // const fileInput = this.element.querySelector('#import_file');
    // if (!fileInput) return;
    // // const fileInput = this.element.querySelector('#import_file');

    // fileInput.addEventListener('change', this.validateFileType.bind(this));


    this.element.addEventListener("dragover", this.handleDragOver.bind(this));
    this.element.addEventListener("drop", this.handleDrop.bind(this));




    // this.fileInputTarget.addEventListener('input', this.handleFileChange.bind(this));

  }

  handleDragOver(event) {
    event.preventDefault();
    this.element.classList.add("drag-over");
  }

  handleDrop(event) {
    event.preventDefault();
    this.element.classList.remove("drag-over");

    const files = event.dataTransfer.files;
    console.log(files, 'latestststst1313');

    if (files.length > 0) {
      this.fileInput.files = files;
      console.log(this.fileInput.files, 'fileInput =========');
      this.handleFileChange();
      // this.fileInput.dispatchEvent(new Event('change'));

      // this.uploadFiles(files);
    }
  }

  handleFileChange() {
    // const label = this.element.querySelector('.file-label');
    const label = this.element.getElementsByClassName('file-label')[0];
    const selectedFile = this.fileInput.files[0];


    if (selectedFile) {
      label.textContent = selectedFile.name;
      this.lastSelectedFile = selectedFile;
      // this.uploadFiles(selectedFile);
    } else if (this.lastSelectedFile) {
      // If the value is not present, use the last selected file
      label.textContent = this.lastSelectedFile.name;
    } else {
      // If the value is not present and there is no last selected file, reset the label
      label.textContent = 'Choose a file';
    }
  }

  refreshFileChange() {

  }

  // handleFileChange() {
  //   const label = this.element.getElementsByClassName('file-label')[0];
  //   console.log(label, 'labelLALAOAALLA');
  //   const selectedFile = this.fileInput.files[0];
  //   console.log(selectedFile, label, 'hehehe');
  //   // label.textContent = selectedFile ? selectedFile.name : 'Choose a file';

  //   if (selectedFile) {
  //     label.textContent = selectedFile.name;
  //   } else {
  //     label.textContent = 'Choose a file';
  //   }


  //   // if (selectedFile) {
  //   //   this.fileInfoTarget.style.display = "block";
  //   //   this.fileNameTarget.textContent = selectedFile.name;
  //   // }
  // }

  uploadFiles(e) {
    e.preventDefault();
    console.log('calleedd');
    const content = "Sample file content";
    const blob = new Blob([content], { type: "text/plain" });

    // Create FormData and append the hardcoded file
    const formData = new FormData();
    formData.append("import_file", blob, "sample_file.txt");






    // console.log(files, 'inside uploadFiles');
    // const formData = new FormData();
    // formData.append("import_file", files[0]); // Adjust the parameter according to your form
    console.log(formData, 'formData');

    fetch("/admin/students/process-csv", {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "text/html",
        "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content,
      },
    })
      .then((response) => {
        console.log(response, 'response');
       return response.text();
      })
      .then((data) => {
        // this.handleFileChange();
        console.log("File uploaded successfully:", data);
        // Handle success (e.g., update UI)
        // this.fileInput.value = ""; // Clear the file input after uploading
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        // Handle error (e.g., show error message)
      });
  }

  removeFile() {
    this.fileInfoTarget.style.display = "none";
    this.fileInput.value = ""; // Clear the file input
  }

  validateFileType() {
    // const fileInput = this.element.querySelector('#import_file');
    try {

      const selectedFile = '.' + fileInput.files[0].name.split('.').pop().toLowerCase();
      console.log(selectedFile);
      // console.log(selectedFile.name.split('.'));
      if (selectedFile) {
        const allowedTypes = ['.csv'];
        // const fileType = '.' + selectedFile.name.split('.').pop().toLowerCase();

        if (!allowedTypes.includes(selectedFile)) {
          console.error('Invalid file type. Please choose a file with a valid extension.');
          // fileInput.value = ''; // Clear the file input
        }
      }
    }
    catch (error) {

    }
  }

  // triggerFileInput() {
  //   const fileInput = this.element.querySelector('#import_file');
  //   console.log(fileInput);
  //   fileInput.click();
  // }
}