const todoForm = document.getElementById("newTodoForm");
const todoList = document.getElementById("todoList");

// retrieve from localStorage
const myTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < myTodos.length; i++) {
  let newTodo = document.createElement("li");
  newTodo.innerText = myTodos[i].task;
  newTodo.isCompleted = myTodos[i].isCompleted ? true : false;
  if (newTodo.isCompleted) {
    newTodo.style.textDecoration = "line-through";
  }
  todoList.appendChild(newTodo);
}

todoForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let newTodo = document.createElement("li");
  let taskValue = document.getElementById("task").value;
  newTodo.innerText = taskValue;
  newTodo.isCompleted = false;
  todoForm.reset();
  todoList.appendChild(newTodo);

  // save to localStorage
  myTodos.push({ task: newTodo.innerText, isCompleted: false });
  localStorage.setItem("todos", JSON.stringify(myTodos));
});

todoList.addEventListener("click", function(event) {
  let clickedListItem = event.target;

  if (!clickedListItem.isCompleted) {
    clickedListItem.style.textDecoration = "line-through";
    clickedListItem.isCompleted = true;
  } else {
    clickedListItem.style.textDecoration = "none";
    clickedListItem.isCompleted = false;
  }

  // breaks for duplicates - another option is to have dynamic IDs
  for (let i = 0; i < myTodos.length; i++) {
    if (myTodos[i].task === clickedListItem.innerText) {
      myTodos[i].isCompleted = !myTodos[i].isCompleted;
      localStorage.setItem("todos", JSON.stringify(myTodos));
    }
  }
});
