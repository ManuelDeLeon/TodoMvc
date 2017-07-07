// ./TodoList/Header/Header.js
Header({
  share: 'todoList',
  newItem: '',
  render() {
    <header class="header">
      <h1>todos</h1>
      <input 
        type="text"
        b="value: newItem, enter: addItem(newItem) && newItem.reset" 
        class="new-todo" 
        placeholder="What needs to be done?" 
        autoFocus />
    </header>
  }
})