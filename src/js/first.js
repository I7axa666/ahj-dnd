const tasks = document.querySelectorAll('.tasks');
const btn = document.querySelectorAll('.btn');

let actualElement;

const onMouseOver = (event) => {
  actualElement.style.top = event.clientY + 'px';
  actualElement.style.left = event.clientX - 100 + 'px';
  
};

const onMouseUp  = (e) => {
  const mouseUpItem = e.target;
  
  const task = e.target.parentElement;
  
  task.parentElement.insertBefore(actualElement.parentElement, mouseUpItem.parentElement);

  actualElement.classList.remove('dragged');
  actualElement = undefined;

  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
};

tasks.forEach(element => {
  element.addEventListener('mousedown', (el) => {
    el.preventDefault();
    actualElement = el.target;
    actualElement.classList.add('dragged');

    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);
  })

  element.addEventListener('mouseover', (el) => {
    const div = document.createElement('button');
    div.classList.add('close');
    div.textContent = `\u{2715}`;
    el.target.parentElement.appendChild(div);
  });

  element.addEventListener('mouseout', (el) => {
    const div = el.target.parentElement.querySelector('.close');
    div.remove();
  });

});

btn.forEach(element => {
  element.addEventListener('click', (ev) => {
    let columnElement = ev.target.parentElement;
    let taskList = columnElement.querySelector('.tasks');

    if (!columnElement.querySelector('.btn-selected')) {
      let txtArea = document.createElement("textarea");

      txtArea.rows = "2";
      txtArea.textContent = "Enter a title for this card..."

      columnElement.insertBefore(txtArea, element);
      element.classList.add('btn-selected');
      element.textContent = "Add";
    } else {
      const liElement = document.createElement("li");
      const div = document.createElement("div");
      const txtArea = columnElement.querySelector('textarea');

      div.classList.add("task");
      div.textContent = txtArea.textContent;
      liElement.appendChild(div);
      taskList.appendChild(liElement);
      element.classList.remove('btn-selected');
      element.textContent = ` \u{002B} Add another card`;
      txtArea.remove();
    };
  })
})

