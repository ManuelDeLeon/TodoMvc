Main({
  share: 'todoList',
  render() {
    <section class="main">
      <input b="check: !hasPending" class="toggle-all" type="checkbox" />
      <label b="click: toggleItems" for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <ListItem b="repeat: items, key: id" />
      </ul>
    </section>
  }
})