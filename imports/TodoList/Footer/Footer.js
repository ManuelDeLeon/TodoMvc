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
          <a b="click: filter('All'), class: { selected: filter === 'All' }" href="#">All</a>
        </li>
        <li>
          <a b="click: filter('Pending'), class: { selected: filter === 'Pending' }" href="#">Active</a>
        </li>
        <li>
          <a b="click: filter('Completed'), class: { selected: filter === 'Completed' }" href="#">Completed</a>
        </li>
      </ul>
      <button b="if: hasCompleted, click: deleteCompleted" class="clear-completed">Clear completed</button>
    </footer>
  }
})