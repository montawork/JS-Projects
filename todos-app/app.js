// select elements
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.todos ul');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let inputValue = input.value;

  if (todo) {
    inputValue = todo.text;
  }

  if (inputValue) {
    const li = document.createElement('li');
    if (todo && todo.completed) {
      li.classList.add('completed');
    }

    li.innerText = inputValue;
    ul.appendChild(li);

    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      updateLS();
    });

    li.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      li.remove();
      updateLS();
    });

    updateLS();

    input.value = '';
  }
}

function updateLS() {
  const allTodos = document.querySelectorAll('li');
  const todosList = [];

  allTodos.forEach((todo) => {
    todosList.push({
      text: todo.textContent,
      completed: todo.classList.contains('completed'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todosList));
}
