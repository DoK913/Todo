class TodoList {
  constructor() {
    this.todos = [];
    this.status = "all";
  }

  async loadTodos() {
    const todosFromJSON = await apiRequest("GET", "todos");
    if (todosFromJSON) {
      this.todos = todosFromJSON.map(
        (todo) => new Todo(todo.text, todo.id, todo.isDone)
      );
    }
  }

  async addTodo(newTodo) {
    this.todos.push(newTodo);
    const dataReq = JSON.stringify(newTodo);

    await apiRequest("POST", "todos", dataReq);
    await this.loadTodos();
  }

  async removeTodo(id) {
    await apiRequest("DELETE", "todos/byIds", JSON.stringify([id]));
    await this.loadTodos();
  }

  async toggleTodo(id, anotherDone) {
    const todo = this.todos.find((todo) => String(todo.id) === String(id));

    if (todo) {
      todo.isDone = anotherDone;
      await apiRequest("PATCH", `todos/${id}`, JSON.stringify(todo));
      await this.loadTodos();
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
  }

  getStatus() {
    return this.status;
  }

  async removeAll() {
    await apiRequest("DELETE", "todos", "");
    await this.loadTodos();
  }

  async removeCompleted() {
    const completedIds = this.todos
      .filter((todo) => todo.isDone)
      .map((todo) => todo.id);
    await apiRequest("DELETE", "todos/byIds", JSON.stringify(completedIds));
    await this.loadTodos();
  }

  async swapTodos(idA, idB) {
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

      await apiRequest("PUT", "todos", JSON.stringify(this.todos));
      await this.loadTodos();
    }
  }
}
