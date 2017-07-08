ListItem({
  share: 'todoList',
  id: '',
  text: '',
  completed: false,
  editing: false,
  editText: '',
  created() {
    this.editText(this.text());
  },
  save() {
    this.updateItem({
      id: this.id(),
      text: this.editText(),
      completed: this.completed()
    });
  },
  cancel() {
    this.editText(this.text());
    this.editing(false);
  },
  completeItem() {
    this.completed(!this.completed());
    this.save();
  },
  render() {
    <li b="class: { completed: completed, editing: editing }">
      <div class="view">
        <input b="check: completed, click: completeItem" class="toggle" type="checkbox" />
        <label b="text: text, click: editing(true)" />
        <button b="click: deleteItem(id)" type="button" class="destroy" />
      </div>
      <input class="edit" b="value: editText, enter: save, esc: cancel, blur: editing && save, focus: editing" type="text" />
    </li>
  }
})