class TodoList {
  constructor() {
    // this.todos = [];
    this.status = "all";
    this.loadTodos();
  }

  loadTodos() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addTodo(text) {
    this.todos.push({
      text,
      checked: false,
      id: Date.now(),
    });

    this.saveTodos();
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => String(todo.id) !== String(id));
    this.saveTodos();
  }

  toggleTodo(id) {
    const todoIndex = this.todos.findIndex(
      (todo) => String(todo.id) === String(id)
    );

    if (todoIndex >= 0) {
      this.todos[todoIndex].checked = !this.todos[todoIndex].checked;
      this.saveTodos();
    }
  }

  getTodos() {
    switch (this.status) {
      case "active": {
        return this.todos.filter((todo) => !todo.checked);
      }

      case "completed": {
        return this.todos.filter((todo) => todo.checked);
      }

      default:
        return this.todos;
    }
  }

  removeAll() {
    this.todos = [];
    this.saveTodos();
  }

  swapTodos(idA, idB) {
    const indexA = this.todos.findIndex(
      (todo) => String(todo.id) === String(idA)
    );

    const indexB = this.todos.findIndex(
      (todo) => String(todo.id) === String(idB)
    );

    if (indexA >= 0 && indexB >= 0) {
      //B = this.todos[indexB]
      //A = this.todos[indexA]
      //this.todos[indexA] = B
      //this.todos[indexB] = A
      [this.todos[indexA], this.todos[indexB]] = [
        this.todos[indexB],
        this.todos[indexA],
      ];

      this.saveTodos();
    }
  }
}
