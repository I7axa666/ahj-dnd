export default class Task {
  constructor(onDelete, columnName) {
    this.container = document.querySelector('.container');
    this.columnName = columnName;
    this.onDelete = onDelete;
    this.actualElement = null;

    this.element = document.createElement('div');
    this.element.className = 'task-card';

    this.buttonContainer = document.createElement('div');
    this.buttonContainer.className = 'btn-container';

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Enter task';

    this.closeBtn = document.createElement('span');
    this.closeBtn.innerHTML = '&times';
    this.closeBtn.className = 'close-btn';
    this.closeBtn.addEventListener('click', () => onDelete(this.element));

    this.addButton = document.createElement('button');
    this.addButton.innerText = 'Add';
    this.addButton.addEventListener('click', this.addTask.bind(this));

    this.buttonContainer.appendChild(this.addButton);
    this.buttonContainer.appendChild(this.closeBtn);
    this.element.appendChild(this.input);
    this.element.appendChild(this.buttonContainer);

    this.input.focus();
    this.tasksList = [];
  }

  addTask() {
    const column = document.querySelector(`#${this.columnName}`);
    const tasks = column.querySelector('.tasks');
    const taskContainer = document.createElement('div');
    const deletTaskBtn = document.createElement('span');

    taskContainer.innerHTML = this.input.value;
    taskContainer.className = 'task';
    deletTaskBtn.className = 'delete-task hidden';
    deletTaskBtn.innerHTML = 'X';
    taskContainer.appendChild(deletTaskBtn);

    this.tasksList.push(this.input.value);

    tasks.appendChild(taskContainer);

    deletTaskBtn.addEventListener('click', () => this.onDelete(taskContainer));

    taskContainer.addEventListener('mouseover', (e) => {
      e.preventDefault();
      deletTaskBtn.classList.remove('hidden');
    });

    taskContainer.addEventListener('mouseout', (e) => {
      e.preventDefault();
      deletTaskBtn.classList.add('hidden');
    });

    this.element.remove();
  }
}
