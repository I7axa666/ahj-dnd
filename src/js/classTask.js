export default class Task {
  constructor(text) {
    this.text = text;
  }

  create () {
    const liElement = document.createElement("li");
    const div = document.createElement("div");

    div.classList.add("task");
    div.textContent = this.text;
    liElement.appendChild(div);
    return liElement;
  }
}
