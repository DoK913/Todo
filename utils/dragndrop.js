// Drag and Drop
class DragNDrop {
  constructor(todoList) {
    this.todoList = todoList;
    this.x = 0;
    this.y = 0;
    this.draggingEle;
    this.placeholder;
    this.isDraggingStarted = false;
    this.prevEle = {};
  }

  mouseDownHandler = function (e) {
    this.draggingEle = e.target;

    // Calculate the mouse position
    const rect = this.draggingEle.getBoundingClientRect();
    this.x = e.pageX - rect.left;
    this.y = e.pageY - rect.top;

    // Attach the listeners to `document`
    document.addEventListener("mousemove", (e) => this.mouseMoveHandler(e));
    document.addEventListener("mouseup", (e) => this.mouseUpHandler(e));
  };

  mouseMoveHandler = function (e) {
    if (this.draggingEle) {
      const draggingRect = this.draggingEle.getBoundingClientRect();

      if (!this.isDraggingStarted) {
        // Update the flag
        this.isDraggingStarted = true;

        // Let the placeholder take the height of dragging element
        // So the next element won't move up
        this.placeholder = document.createElement("div");
        this.placeholder.classList.add("placeholder");
        this.draggingEle.parentNode.insertBefore(
          this.placeholder,
          this.draggingEle.nextSibling
        );

        // Set the placeholder's height
        this.placeholder.style.height = `${draggingRect.height}px`;
      }
      // Set position for dragging element
      this.draggingEle.style.position = "absolute";
      this.draggingEle.style.top = `${e.pageY - this.y}px`;
      this.draggingEle.style.left = `${e.pageX - this.x}px`;

      // The current order:
      // this.prevEle
      // draggingEle
      // placeholder
      // nextEle
      const prevEle = this.draggingEle.previousElementSibling;
      const nextEle = this.placeholder.nextElementSibling;

      // User moves item to the top
      if (prevEle && this.isAbove(this.draggingEle, prevEle)) {
        // The current order    -> The new order
        // this.prevEle         -> placeholder
        // draggingEle          -> draggingEle
        // placeholder          -> this.prevEle
        this.swap(this.placeholder, this.draggingEle);
        this.swap(this.placeholder, prevEle);
        //LocalStorageSave
        //condition for prevent call swaptodo for same id's during dragging
        if (prevEle.id !== this.prevEle.id && this.isDraggingStarted) {
          this.prevEle = prevEle;
          this.todoList.swapTodos(this.draggingEle.id, this.prevEle.id);
        }

        return;
      }

      // User moves the dragging element to the bottom
      if (nextEle && this.isAbove(nextEle, this.draggingEle)) {
        // The current order    -> The new order
        // draggingEle          -> nextEle
        // placeholder          -> placeholder
        // nextEle         -> draggingEle
        this.swap(nextEle, this.placeholder);
        this.swap(nextEle, this.draggingEle);
        //localStorageSave
        this.todoList.swapTodos(nextEle.id, this.draggingEle.id);
      }
    }
  };

  mouseUpHandler = function () {
    // Remove the placeholder
    this.placeholder &&
      this.placeholder.parentNode &&
      this.placeholder.parentNode.removeChild(this.placeholder);
    // Reset the flag
    this.isDraggingStarted = false;
    // Remove the position styles
    if (this.draggingEle) {
      this.draggingEle.style.removeProperty("top");
      this.draggingEle.style.removeProperty("left");
      this.draggingEle.style.removeProperty("position");
    }
    this.x = null;
    this.y = null;
    this.draggingEle = null;
    this.prevEle = {};
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener("mousemove", (e) => this.mouseMoveHandler(e));
    document.removeEventListener("mouseup", (e) => this.mouseUpHandler(e));
  };

  swap = function (nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
  };

  isAbove = function (nodeA, nodeB) {
    // Get the bounding rectangle of nodes
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();

    return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
  };
}
