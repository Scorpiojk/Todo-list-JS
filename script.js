// SELECTS ELEMENTS 
const form = document.getElementById("todoForm");
const todoInput = document.getElementById("newTodo");
const todoListEl = document.getElementById("todos-list");

// VARS
let todos = [];


// FORM SUBMIT
form.addEventListener('submit', function(event) {
  event.preventDefault();

  saveTodo();
  renderTodos()
})

// SAVE TODO
function saveTodo() {
  const todoValue = todoInput.value;

  // Check if todo empty 
  const isEmpty = todoValue === '';

  // Check for duplicate 
  const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase())

  if(isEmpty){
    alert('Esta vacia tu tarea')
  } else if(isDuplicate) {
    alert('Esta duplicada tu tarea')
  } else {
      todos.push({
      value: todoValue ,
      checked: false ,
      // Function to random color
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    });
  }
  todoInput.value = ''
}

// RENDER TODO
function renderTodos() {
    // Clear element before re render
    todoListEl.innerHTML = '';
    
    todos.forEach((todo, index) =>  {
      todoListEl.innerHTML += 
      `
      <div class="todo" id=${index}>
        <i 
        class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi bi-circle'}"
        style="color:${todo.color}"
        data-action="check"
        ></i>
        <p class="" data-action="check">${todo.value}</p>
        <i class="bi bi-pencil-square" data-action="edit"></i>
        <i class="bi bi-trash" data-action="delete"></i>
      </div>
      ` 
    })
}

// CLick Event Listener
todoListEl.addEventListener('click', (e) => {
  const target = e.target;
  const parentElement = target.parentNode;

  if(parentElement.className != 'todo') return;

  // Todo ID
  const todo = parentElement;
  const todoId = Number(todo.id);

  // Target action
  const action = target.dataset.action

  action === 'check' && checkTodo(todoId);
  //action === 'edit' && editTodo(todoId);
  //action === 'delete' && deleteTodo(todoId);

})

// CHECK A TODO
function checkTodo(todoId) {
  
}