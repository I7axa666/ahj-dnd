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

    this.actualElement = null;
    this.actualElementStyle = null;
    this.actualElementClone = null;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.clear = this.clear.bind(this);
    this.proectionAct = this.proectionAct.bind(this);
    this.proection = this.proection.bind(this);
    this.replaceDragging = this.replaceDragging.bind(this);

    this.shiftX = null;
    this.shiftY = null;

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

  onMouseDown(e) {
    const { target } = e;

    if (target.classList.contains('task')) {
      this.shiftX = e.offsetX;
      this.shiftY = e.offsetY;
      this.actualElement = target;
      this.actualElementStyle = target.style;

      this.proectionAct(e);
    }
  }

  onMouseUp() {
    if (this.actualElement) {
      this.replaceDragging();
      this.clear();
    }
  }

  onMouseMove(e) {
    e.preventDefault();
    if (this.actualElement) {
      const { pageX, pageY } = e;
      const { width, height } = this.actualElement.style;

      this.actualElement.style = `
        position: absolute;
        left: ${pageX - this.shiftX}px;
        top: ${pageY - this.shiftY}px;
        pointer-events: none;
        width: ${width};
        height: ${height};
      `;
      this.proectionAct(e);
    }
  }

  clear() {
    this.actualElement = null;
    this.actualElementClone = null;
    this.actualElementStyle = null;
  }

  proectionAct(e) {
    const { target } = e;

    if (
      target.classList.contains('task')
      && !target.classList.contains('protaction')
    ) {
      const { y, height, width } = target.getBoundingClientRect();
      const appendPosition = y + height / 2 > e.clientY
        ? 'beforebegin'
        : 'afterend';

      if (!this.actualElementClone) {
        this.actualElementClone = this.proection(target);

        this.actualElementClone.style = `
            width: ${width}px;
            height: ${height}px;
            margin: 10px 0px;
          `;
      } else {
        this.actualElementClone.remove();
        target.insertAdjacentElement(appendPosition, this.actualElementClone);
      }
    } else if (target.classList.contains('tasks')) {
      target.appendChild(this.actualElementClone);
    }
  }
  // eslint-disable-next-line
  proection(target) {
    return (() => {
      const d = document.createElement('div');
      d.classList.add('proection');
      const { width, height } = target.getBoundingClientRect();

      d.style = `
      width: ${width};
      height: ${height};
      margin: 10px 0;
      `;

      return d;
    })();
  }

  replaceDragging() {
    this.actualElementClone.replaceWith(this.actualElement);
    this.actualElement.style = this.actualElementStyle;
  }
}
