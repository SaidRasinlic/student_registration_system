import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="student"
export default class extends Controller {
  connect() {
    console.log('student connected');
  }

  redirect(e) {
    // Check the response status
    if (e.detail.fetchResponse.response.status === 200) {
      this.element.parentElement.remove();
    }
  }
}
