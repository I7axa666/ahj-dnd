import Task from './Task';

export default class TaskManadger {
  constructor(container) {
    this.container = container;
    this.todoBoard = container.querySelector('#todo');
    this.progressBoard = container.querySelector('#inProgress');
    this.doneBoard = container.querySelector('#done');

    this.todoBtn = this.todoBoard.querySelector('.add-task-btn');
    this.progressBtn = this.progressBoard.querySelector('.add-task-btn');
    this.doneBtn = this.doneBoard.querySelector('.add-task-btn');

    this.todoBtn.addEventListener('click', this.addTask.bind(this, 'todo'));
    this.progressBtn.addEventListener('click', this.addTask.bind(this, 'inProgress'));
    this.doneBtn.addEventListener('click', this.addTask.bind(this, 'done'));

    this.actualElement = '';
    this.actualElementClone = '';
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.dragAndDrop = this.dragAndDrop.bind(this);

    this.start();
  }

  start() {
    const tasks = this.container.querySelectorAll('.task');

    tasks.forEach((el) => {
      const btn = el.querySelector('.delete-task');

      btn.addEventListener('click', (e) => {
        this.removeTask(e.target.parentElement);
      });

      el.addEventListener('mouseenter', (e) => {
        const task = e.target;
        const deleteBtn = task.querySelector('.delete-task');
        deleteBtn.classList.remove('hidden');
      });

      el.addEventListener('mouseleave', (e) => {
        const task = e.target;
        const deleteBtn = task.querySelector('.delete-task');
        deleteBtn.classList.add('hidden');
      });

      this.dragAndDrop(el);
    });
  }

  addTask(columnName) {
    const taskCard = new Task(this.removeTask.bind(this), columnName);
    const column = this.container.querySelector(`#${columnName}`);
    const tasks = column.querySelector('.tasks');

    tasks.appendChild(taskCard.element);
  }

  // eslint-disable-next-line
  removeTask(taskCardElement) {
    taskCardElement.remove();
  }

  onMouseOver(e) {
    this.actualElement.style.top = `${e.clientY}px`;
    this.actualElement.style.left = `${e.clientX}px`;
  }

  dragAndDrop(el) {
    el.addEventListener('mousedown', (e) => {
      e.preventDefault();

      if (!e.target.classList.contains('delete-task')) {
        this.actualElement = e.target;

        this.actualElementClone = this.actualElement.cloneNode(true);
        this.actualElementClone.classList.add('clone');

        this.actualElement.parentElement.insertBefore(this.actualElementClone, this.actualElement);

        this.actualElement.classList.add('dragged');

        document.documentElement.addEventListener('mouseup', this.onMouseUp);
        document.documentElement.addEventListener('mouseover', this.onMouseOver);
      }
    });
  }

  onMouseUp(e) {
    const mouseUpItem = e.target;

    const parentColumn = e.target.closest('.column');

    const tasks = parentColumn.querySelector('.tasks');

    if (mouseUpItem.classList.contains('tasks')) {
      tasks.appendChild(this.actualElement);
    } else {
      tasks.insertBefore(this.actualElement, mouseUpItem);
    }

    this.actualElement.classList.remove('dragged');

    if (document.querySelector('.clone')) {
      document.querySelector('.clone').remove();
    }

    this.actualElement = undefined;
    this.actualElementClone = undefined;

    document.documentElement.removeEventListener('mouseup', this.onMouseUp);
    document.documentElement.removeEventListener('mouseover', this.onMouseOver);
  }
}
