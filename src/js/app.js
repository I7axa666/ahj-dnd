import TaskManadger from './listener';

// localStorage.clear();

window.addEventListener('beforeunload', () => {
  localStorage.clear();
  const column = document.querySelectorAll('.column');
  column.forEach((el) => {
    const columnName = el.id;
    const tasks = el.querySelector('.tasks');
    localStorage.setItem(columnName, tasks.outerHTML);
  });
});

if (localStorage.todo || localStorage.inPtogress || localStorage.done) {
  for (let i = 0; i < localStorage.length; i++) {
    const column = localStorage.key(i);
    const taskList = localStorage.getItem(column);

    const board = document.querySelector(`#${column}`);
    const btn = board.querySelector('.add-task-btn');
    board.querySelector('.tasks').remove();
    const div = document.createElement('div');
    div.innerHTML = taskList;
    board.insertBefore(div, btn);
  }
}

const manager = new TaskManadger(document.querySelector('.container'));

document.body.addEventListener('mousedown', manager.onMouseDown);
document.body.addEventListener('mouseup', manager.onMouseUp);
document.body.addEventListener('mousemove', manager.onMouseMove);
