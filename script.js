// SELECTS ELEMENTS 
const form = document.getElementById("todoForm");
const todoInput = document.getElementById("newTodo");
const todoListEl = document.getElementById("todos-list");
const notificationEl = document.querySelector('.notification');

// VARS
let todos = JSON.parse(localStorage.getItem('todos')) || [];
// -1 because this will be an index an with -1 we make sure that it will not be an index
let editTodoId = -1;


// 1st render
renderTodos();

// FORM SUBMIT
form.addEventListener('submit', function(event) {
  event.preventDefault();

  saveTodo();
  renderTodos()
  // save in local storage
  localStorage.setItem('todos', JSON.stringify(todos));
})

// SAVE TODO
function saveTodo() {
  const todoValue = todoInput.value;

  // Check if todo empty 
  const isEmpty = todoValue === '';

  // Check for duplicate 
  const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase())

  if(isEmpty){
    showNotification('Esta vacia tu tarea')
  } else if(isDuplicate) {
    showNotification('Esta duplicada tu tarea')
  } else {
    if(editTodoId >= 0){
      // Update Edit todo
      todos = todos.map((todo, index) => ({
          ...todo,
          value : index === editTodoId ? todoValue : todo.value
        }));
        editTodoId = -1; 
    }else {
      todos.push({
      value: todoValue ,
      checked: false ,
      // Function to random color
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    });
    }
  }
  todoInput.value = ''
}

// RENDER TODO
function renderTodos() {
    if(todos.length === 0){
      todoListEl.innerHTML = '<center>Nada por hacer por ahora!</center>';
      return;
    }
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
        <p class="${todo.checked && 'checked'}" data-action="check">${todo.value}</p>
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
  action === 'edit' && editTodo(todoId);
  action === 'delete' && deleteTodo(todoId);

})

// CHECK A TODO
function checkTodo(todoId) {
  todos = todos.map((todo, index) => ({
        ...todo,
        checked: index === todoId ? !todo.checked : todo.checked
      }))

  renderTodos()
  localStorage.setItem('todos', JSON.stringify(todos));
}

// EDIT A TODO 
function editTodo(todoId) {
  todoInput.value = todos[todoId].value;
  // Change the value of this variable to the index of the selected
  editTodoId = todoId;

}

// DELETE TODO
function deleteTodo(todoId) {
  // This will make to render all todos except for the specific id that we are selecting
  todos = todos.filter((todo, index) => index !== todoId);
  // To prevent editing another todo
  editTodoId = -1;
  // re-render Todos 
  renderTodos()
  localStorage.setItem('todos', JSON.stringify(todos));
}

// SHOW A NOTIFICATION 
function showNotification(msg) {
  // Change message
  notificationEl.innerHTML = msg;
  // Appear notification
  notificationEl.classList.add('notif-enter');
  // Disapear notification
  setTimeout(() =>{
    notificationEl.classList.remove('notif-enter')
  }, 2000)
}

