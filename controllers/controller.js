class Controller {
  constructor(todoList) {
    this.todoList = todoList;
    this.DND = new DragNDrop(todoList);
    this.render();
    this.initEvents();
  }

  submit(event) {
    event.preventDefault();
    const input = document.querySelector("input");
    if (input.value != "") {
      let text = input.value;
      let id = Date.now();
      let isDone = false;
      let nTodo = new Todo(text, id, isDone);
      this.todoList.addTodo(nTodo);
      this.render();
    }
    input.value = "";
  }

  addNewLi({ text, id, isDone }) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.id = id;
    li.classList.add("draggable");
    li.addEventListener("mousedown", (e) => this.DND.mouseDownHandler(e));

    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete");
    deleteButton.innerText = "x";
    deleteButton.addEventListener("click", (e) => this.deleteElement(e));
    li.appendChild(deleteButton);

    const checkboxField = document.createElement("input");
    checkboxField.type = "checkbox";
    checkboxField.classList.add("check");
    checkboxField.checked = isDone;
    checkboxField.addEventListener("click", (e) => this.toggleMark(e));
    li.appendChild(checkboxField);

    const label = document.createElement("label");
    label.innerText = text;
    li.appendChild(label);

    ul.appendChild(li);
  }

  render() {
    let status = this.todoList.getStatus();
    const allFilter = document.getElementById("all");
    const activeFilter = document.getElementById("active");
    const completedFilter = document.getElementById("completed");
    const list = document.querySelector("ul");
    list.innerHTML = "";
    this.todoList.getTodos(status).forEach((todo) => {
      this.addNewLi(todo);
    });

    // toggle variable to highlight selected filter
    allFilter.classList.toggle("selected", status === "all");
    activeFilter.classList.toggle("selected", status === "active");
    completedFilter.classList.toggle("selected", status === "completed");
  }

  // initialize event listeners
  initEvents() {
    document
      .querySelector("form")
      .addEventListener("submit", (e) => this.submit(e));
    document
      .getElementById("all")
      .addEventListener("click", (e) => this.switchStatus(e));
    document
      .getElementById("active")
      .addEventListener("click", (e) => this.switchStatus(e));
    document
      .getElementById("completed")
      .addEventListener("click", (e) => this.switchStatus(e));
    document
      .getElementById("clear")
      .addEventListener("click", () => this.clearList());
    document
      .getElementById("rmCompleted")
      .addEventListener("click", () => this.clearCompleted());
  }

  // change selected filter on click
  switchStatus(event) {
    this.todoList.setStatus(event.target.id);
    this.render();
  }

  // clear todolist
  clearList() {
    this.todoList.removeAll();
    this.render();
  }

  // clear completed todo's
  clearCompleted() {
    this.todoList.removeCompleted();
    this.render();
  }

  // delete element
  deleteElement(event) {
    const id = event.target.parentNode.id;
    if (event.target.className === "delete") {
      this.todoList.removeTodo(id);
      this.render();
    }
  }

  // switcher mark "done"
  toggleMark(event) {
    const id = event.target.parentNode.id;
    const todo = this.todoList.getTodoById(id);
    if (todo) {
      this.todoList.toggleTodo(id, !todo.isDone);
      this.render();
    }
  }
}
