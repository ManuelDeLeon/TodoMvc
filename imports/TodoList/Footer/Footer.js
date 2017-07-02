// ./TodoList/Footer/Footer.js
Footer({
  share: 'todoList',
  pendingWord() {
    return this.pendingCount() === 1 ? "item" : "items";
  },
  render() {
    <footer class="footer">
      <span class="todo-count"><strong b="text: pendingCount" /> <span b="text: pendingWord" /> left</span>
      <ul class="filters">
        <li>
          <a b="click: filter('ALL'), class: { selected: filter === 'ALL' }" href="#">All</a>
        </li>
        <li>
          <a b="click: filter('PENDING'), class: { selected: filter === 'PENDING' }" href="#">Active</a>
        </li>
        <li>
          <a b="click: filter('COMPLETED'), class: { selected: filter === 'COMPLETED' }" href="#">Completed</a>
        </li>
      </ul>
      <button b="if: hasCompleted, click: deleteCompleted" class="clear-completed">Clear completed</button>
    </footer>
  }
})