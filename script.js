// MODEL


let todos;

const savedTodos = JSON.parse(localStorage.getItem('todos'));

if (Array.isArray(savedTodos)){
  todos = savedTodos;
} else {
    todos = [
  {
    title: 'Get groceries',
    dueDate: ' 2021-10-04',
    id: 'id1'
  },
  {
    title: 'Wash car',
    dueDate: '2021-10-06',
    id: 'id2' 
  },
  {
    title: 'Make dinner',
    dueDate: '2021-03-04',
    id: 'id3'
  }
  ];
}

function checkTodo(idDone){
    item = document.getElementById(idDone);
    item.parentElement.style.textDecoration = 'line-through';
}

function createTodo(title, dueDate){
  const id = '' + new Date().getTime();

  todos.push({
    title: title,
    dueDate: dueDate,
    id: id
  });
  saveTodos();
}

function removeTodo(idDelete){
  todos = todos.filter(function(todo){
    if (todo.id === idDelete){
      return false;
    }else {
      return true;
    }
    
  })
  saveTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

//VIEW
function render(){
  document.getElementById('todolist').innerHTML = '';

  todos.forEach(function (todo) {
    const element = document.createElement('div');
    element.innerText = todo.title + ' ' + todo.dueDate;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.style = 'width: 50px; height: 25px;';
    deleteButton.onclick = deleteTodo;
    deleteButton.classList.toggle('deleteBtn');
    deleteButton.id = todo.id;
    element.appendChild(deleteButton);

    const doneButton = document.createElement('button');
    doneButton.innerText = '✓';
    doneButton.style = 'width: 50px; height: 25px;';
    doneButton.onclick = doneTodo;
    doneButton.classList.toggle('doneBtn');
    doneButton.id = todo.id;




    element.appendChild(doneButton);

    const todoList = document.getElementById('todolist');
    if(todo.title == ''){

    }else{
        todoList.appendChild(element);
    }

  });
}

// Controller

render();

function addTodo(){
  const textBox = document.getElementById('todo-title');
  const title = textBox.value;

  const datePicker = document.getElementById('datePicker');
  const dueDate = datePicker.value; 

  
  createTodo(title, dueDate);

  render();
}

function deleteTodo(event){
  const deleteButton = event.target;
  const idDelete = deleteButton.id;

  removeTodo(idDelete);
  render();
}

function doneTodo(event){
    const doneButton = event.target;
    const idDone = doneButton.id; 

    checkTodo(idDone);
    render
}
