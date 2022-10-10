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

function changeTodo(idDone){
    item = document.getElementById(idDone);
    let parent = item.parentElement
    const inputText = document.createElement('input');
    inputText.id = 'edit-todo-title'
    inputText.type = 'text';
    parent.appendChild(inputText);

    const inputDate = document.createElement('input');
    inputDate.id = 'edit-date-picker'
    inputDate.type = 'date';
    parent.appendChild(inputDate);

    const doneButton = document.createElement('button');
    doneButton.innerText = '✓';
    doneButton.style = 'width: 50px; height: 30px;';
    doneButton.classList.toggle('editBtn');
    doneButton.id = idDone;
    doneButton.onclick = editTodo;
    parent.appendChild(doneButton);
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
  console.log(todos)
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

    addBtn(element, todo)

    const todoList = document.getElementById('todolist');
    if(todo.title == ''){

    }else{
        todoList.appendChild(element);
    }

  });
}
function addBtn(element, todo){
  const deleteButton = document.createElement('button');
    deleteButton.innerText = 'X';
    deleteButton.style = 'width: 50px; height: 25px;';
    deleteButton.onclick = deleteTodo;
    deleteButton.classList.toggle('deleteBtn');
    deleteButton.id = todo.id;
    element.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.innerText = '♻️';
    editButton.style = 'width: 50px; height: 25px;';
    editButton.onclick = updateTodo;
    editButton.classList.toggle('doneBtn');
    editButton.id = todo.id;
    element.appendChild(editButton);
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

function findTodo(id){
  for(let i = 0; i < todos.length; i++){ 
    if(todos[i].id == id){
      return i;
    }else{

    }
  }
}

function deleteTodo(event){
  const deleteButton = event.target;
  const idDelete = deleteButton.id;

  removeTodo(idDelete);
  render();
}

function updateTodo(event){
    const editButton = event.target;
    const idDone = editButton.id; 
    const deleteBtn = document.getElementById(idDone);
    deleteBtn.style.display = "none";
    editButton.style.display = "none";

    changeTodo(idDone);
    render;
}

function editTodo(event){
    const editButton = event.target;
    let id = editButton.id;
    let todoIndex = findTodo(id);
    const textBox = document.getElementById('edit-todo-title');
    const title = textBox.value;
    const dateBox = document.getElementById('edit-date-picker');
    const date = dateBox.value;
    if(title == ''){

    }else{
      todos[todoIndex] = {
        title: title,
        dueDate: date,
        id: id
      }
      saveTodos();
      render();
    }
}
