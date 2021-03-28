class Controller {
  constructor(todoList) {
    this.todoList = todoList;
    this.DND = new DragNDrop(todoList);
    this.initEvents();
    this.render();
  }

  submit(event) {
    event.preventDefault();
    const input = document.querySelector("input");
    if (input.value != "") {
      this.todoList.addTodo(input.value);
      this.render();
    }
    input.value = "";
  }

  addTodo({ id, text, checked }) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.id = id;
    li.addEventListener("click", (e) => this.deleteOrMark(e));
    li.addEventListener("mousedown", (e) => this.DND.mouseDownHandler(e));
    li.innerHTML = `  <span class="delete">×</span>
                      <input class="check" type="checkbox" 
                      ${checked ? "checked" : ""}>
                      <label>${text}</label>`;
    li.classList.add("draggable");
    ul.appendChild(li);
  }

  render() {
    const list = document.querySelector("ul");
    list.innerHTML = "";
    this.todoList.getTodos(status).forEach((todo) => {
      this.addTodo(todo);
    });

    document
      .getElementById("all")
      .classList.toggle("selected", this.todoList.status === "all");
    document
      .getElementById("active")
      .classList.toggle("selected", this.todoList.status === "active");
    document
      .getElementById("completed")
      .classList.toggle("selected", this.todoList.status === "completed");
  }

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
  }

  switchStatus(event) {
    this.todoList.status = event.target.id;
    this.render();
  }

  // clear todolist
  clearList() {
    this.todoList.removeAll();
    this.render();
  }

  // delete-Mark
  deleteOrMark(event) {
    const id = event.target.parentNode.id;
    if (event.target.className === "delete") {
      this.todoList.removeTodo(id);
      this.render();
    } else {
      this.todoList.toggleTodo(id);
      this.render();
    }
  }
}
