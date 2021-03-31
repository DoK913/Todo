class TodoList {
  constructor() {
    this.todos = [];
    this.status = "all";
    this.loadTodos();
  }

  loadTodos() {
    const todosFromStorage = JSON.parse(localStorage.getItem("todos"));
    if (todosFromStorage) {
      this.todos = todosFromStorage;
    }
  }

  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addTodo(newTodo) {
    this.todos.push(newTodo);
    this.saveTodos();
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => String(todo.id) !== String(id));
    this.saveTodos();
  }

  toggleTodo(id, anotherDone) {
    const todoIndex = this.todos.findIndex(
      (todo) => String(todo.id) === String(id)
    );

    if (todoIndex >= 0) {
      this.todos[todoIndex].isDone = anotherDone;
      this.saveTodos();
    }
  }

  getTodoById(id) {
    return this.todos.find((todo) => String(todo.id) === String(id));
  }

  getTodos() {
    switch (String(this.status)) {
      case "active": {
        return this.todos.filter((todo) => !todo.isDone);
      }

      case "completed": {
        return this.todos.filter((todo) => todo.isDone);
      }

      default:
        return this.todos;
    }
  }

  setStatus(status) {
    this.status = String(status);
    this.saveTodos();
  }

  getStatus() {
    return this.status;
  }

  removeAll() {
    this.todos = [];
    this.saveTodos();
  }

  removeCompleted() {
    this.todos = this.todos.filter((todo) => !todo.isDone);
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
      [this.todos[indexA], this.todos[indexB]] = [
        this.todos[indexB],
        this.todos[indexA],
      ];

      this.saveTodos();
    }
  }
}
