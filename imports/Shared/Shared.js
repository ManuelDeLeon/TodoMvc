import ViewModel from 'viewmodel-react';
import { Filter } from '../Enumerations';

let id = 0;
ViewModel.share({
  todoList: {
    allItems: [],
    filter: ViewModel.property
      .default(Filter.All)
      .beforeUpdate(key => Filter[key])
      ,
    filteredItems() {
      switch (this.filter()) {
        case Filter.Completed :
          return this.allItems().filter(i => i.completed);
        case Filter.Pending:
          return this.allItems().filter(i => !i.completed);
        default:
          return this.allItems();
      }
    },
    items() {
      // Can't just return the sort without slicing it.
      // This is called when rendering and it's the equivalent
      // of changing an array while looping through it.
      // React *really* hates it.
      return this.filteredItems().slice().sort((a, b) => a.id - b.id);
    },
    hasItems() {
      return this.allItems().length > 0;
    },
    hasPending() {
      return !!this.allItems().find(i => !i.completed);
    },
    pendingCount() {
      return this.allItems().filter(i => !i.completed).length;
    },
    hasCompleted() {
      return !!this.allItems().find(i => i.completed);
    },
    addItem(itemText) {
      if (!itemText) return;
      const item = { id: id++, text: itemText, completed: false };
      this.allItems().push(item);
      return item;
    },
    updateItem({ id, text, completed }) {
      const index = this.allItems().findIndex(i => i.id === id);
      if (~index) {
        this.allItems().splice(index, 1);
        this.allItems().push({ id, text, completed });
      }
    },
    deleteItem(id) {
      const index = this.allItems().findIndex(i => i.id === id);
      if (~index) {
        this.allItems().splice(index, 1);
      }
    },
    toggleItems() {
      const next = this.hasPending();
      this.allItems().map(i => i.completed = next);
      // map doesn't change the array so we have to trigger the changed event manually.
      // We can get the same effect by updating allItems with a mapped array
      this.allItems.changed(); 
    },
    deleteCompleted() {
      const filtered = this.allItems().filter(i => !i.completed);
      this.allItems(filtered);
    }
  }
})