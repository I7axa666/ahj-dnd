import Task from '../js/classTask';

export function addTask (element) {
  if (!element.classList.contains('btn-selected')) {
    let txtArea = document.createElement("textarea");

    txtArea.rows = "2";
    txtArea.textContent = "Enter a title for this card..."

    element.parentElement.insertBefore(txtArea, element);
    element.classList.add('btn-selected');
    element.textContent = "Add";
  } else {
    const txtArea = element.parentElement.querySelector('textarea');
    const task = new Task(txtArea.textContent).create();
    const tasks = element.parentElement.querySelector('.tasks');
    
    tasks.appendChild(task);
    
    element.classList.remove('btn-selected');
    element.textContent = ` \u{002B} Add another card`;
    txtArea.remove();
  };
};

export const addCloseButton = (element) => {
  const closeButton = document.createElement('button');
  closeButton.classList.add('close');
  closeButton.textContent = `\u{2715}`;
  element.target.appendChild(closeButton);
};

export const deleteCloseButton = (element) => {
  const closeButton = element.target.parentElement.querySelector('.close');
  closeButton.remove();
};
