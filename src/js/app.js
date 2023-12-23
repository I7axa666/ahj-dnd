import Task from '../js/classTask';
import { addTask, addCloseButton, deleteCloseButton } from '../js/utilits';

const taskList = document.querySelectorAll('.tasks');
const btnList = document.querySelectorAll('.btn');



btnList.forEach(btn => {
  btn.addEventListener('click', (ev) => {
    addTask(ev.target);
  });
});

taskList.forEach(el => {
  el.addEventListener('click', (el) => {
    console.log(el.target);
  });

  el.addEventListener('mouseover', addCloseButton);

  el.addEventListener('mouseout', deleteCloseButton);

  
});
