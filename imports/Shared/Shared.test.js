import './Shared';
import ViewModel from 'viewmodel-react';
import { Filter } from '../Enumerations';

describe('todoList shared bucket', () => {

  let vm;
  beforeEach(() => {
    vm = ViewModel.loadComponent({
      share: 'todoList'
    });
  });

  describe('allItems', () => {
    it('defaults to empty', () => {
      expect(vm.allItems() instanceof Array).toBe(true);
      expect(vm.allItems().length).toBe(0);
    });
  });

  describe('filter', () => {
    it('defaults to All', () => {
      expect(vm.filter()).toBe(Filter.All);
    });
    it('accepts valid filter', () => {
      expect(() => vm.filter(Filter.Completed)).not.toThrow();
    });
    it('throws error with bad filter', () => {
      expect(() => vm.filter("Bad")).toThrow();
    });
  });

  describe('filteredItems', () => {
    beforeEach(()=>{
      vm.allItems().push(
        { completed: true }, 
        { completed: false },
        { completed: false }
      );
    });
    it('returns all items by default', () => {
      expect(vm.filteredItems().length).toBe(3);
    });
    it('returns 1 item for Completed', () => {
      vm.filter(Filter.Completed);
      expect(vm.filteredItems().length).toBe(1);
    });
    it('returns 2 items for Pending', () => {
      vm.filter(Filter.Pending);
      expect(vm.filteredItems().length).toBe(2);
    });
  });

  describe('items', () => {
    beforeEach(() => {
      vm.allItems().push(
        { id: 3, completed: true },
        { id: 1, completed: true },
        { id: 2, completed: false }
      );
    });
    it('returns all items sorted by default', () => {
      expect(vm.items().length).toBe(3);
      expect(vm.items()[0].id).toBe(1);
      expect(vm.items()[1].id).toBe(2);
      expect(vm.items()[2].id).toBe(3);
    });
    it('returns 2 items sorted for Completed', () => {
      vm.filter(Filter.Completed);
      expect(vm.items().length).toBe(2);
      expect(vm.items()[0].id).toBe(1);
      expect(vm.items()[1].id).toBe(3);
    });
    it('returns 1 item for Pending', () => {
      vm.filter(Filter.Pending);
      expect(vm.items().length).toBe(1);
      expect(vm.items()[0].id).toBe(2);
    });
  });

  describe('hasItems', () => {
    it('returns false with []', () => {
      vm.allItems([]);
      expect(vm.hasItems()).toBe(false);
    });
    it('returns true with [1]', () => {
      vm.allItems([1]);
      expect(vm.hasItems()).toBe(true);
    });
  });

  describe('hasPending', () => {
    it('returns false with completed item', () => {
      vm.allItems([{completed: true}]);
      expect(vm.hasPending()).toBe(false);
    });
    it('returns true with incomplete item', () => {
      vm.allItems([{ completed: false }]);
      expect(vm.hasPending()).toBe(true);
    });
  });

  describe('pendingCount', () => {
    it('returns 0 with completed item', () => {
      vm.allItems([{ completed: true }]);
      expect(vm.pendingCount()).toBe(0);
    });
    it('returns 1 with incomplete item', () => {
      vm.allItems([{ completed: false }]);
      expect(vm.pendingCount()).toBe(1);
    });
  });

  describe('hasCompleted', () => {
    it('returns true with completed item', () => {
      vm.allItems([{ completed: true }]);
      expect(vm.hasCompleted()).toBe(true);
    });
    it('returns false with incomplete item', () => {
      vm.allItems([{ completed: false }]);
      expect(vm.hasCompleted()).toBe(false);
    });
  });

  describe('addItem', () => {
    it('does not add empty item', () => {
      expect(vm.addItem('')).toBeFalsy();
      expect(vm.allItems().length).toBe(0);
    });
    it('adds item to collection', () => {
      const item = vm.addItem('A');
      expect(item).toBeTruthy();
      expect(vm.allItems().length).toBe(1);
      expect('id' in item).toBe(true);
      expect(item.text).toBe('A');
      expect(item.completed).toBe(false);
    });
  });

  describe('updateItem', () => {
    it('updates item in collection', () => {
      const item1 = vm.addItem('A');
      const item2 = vm.addItem('B');
      item1.text = "AA";
      item1.completed = true;
      vm.updateItem(item1);
      const item1InCol = vm.allItems().find(i => i.id === item1.id);
      const item2InCol = vm.allItems().find(i => i.id === item2.id);
      expect(item1).toEqual(item1InCol);
      expect(item2).toEqual(item2InCol);
      expect(vm.allItems().length).toBe(2);
    });
    it(`doesn't do anything with invalid id`, () => {
      const item = vm.addItem('A');
      const itemBad = { 
        id: item.id + 1,
        text: "AA",
        completed: true
      }
      vm.updateItem(itemBad);
      const itemInCol = vm.allItems().find(i => i.id === item.id);
      expect(item).toEqual(itemInCol);
      expect(vm.allItems().length).toBe(1);
    });
  });

  describe('deleteItem', () => {
    it('deletes item in collection', () => {
      const item1 = vm.addItem('A');
      const item2 = vm.addItem('B');
      vm.deleteItem(item1.id);
      const item1InCol = vm.allItems().find(i => i.id === item1.id);
      const item2InCol = vm.allItems().find(i => i.id === item2.id);
      expect(item1InCol).toBeFalsy();
      expect(item2).toEqual(item2InCol);
      expect(vm.allItems().length).toBe(1);
    });
    it(`doesn't do anything with invalid id`, () => {
      const item = vm.addItem('A');
      vm.deleteItem(item.id + 1);
      const itemInCol = vm.allItems().find(i => i.id === item.id);
      expect(item).toEqual(itemInCol);
      expect(vm.allItems().length).toBe(1);
    });
  });

  describe('toggleItems', () => {
    it('sets all to true if has pending items', () => {
      vm.allItems([
        { completed: true },
        { completed: false },
        { completed: true }
      ]);
      vm.toggleItems();
      expect(vm.allItems()[0].completed).toBe(true);
      expect(vm.allItems()[1].completed).toBe(true);
      expect(vm.allItems()[2].completed).toBe(true);
    });
    it('sets all to false if all items are completed', () => {
      vm.allItems([
        { completed: true },
        { completed: true },
        { completed: true }
      ]);
      vm.toggleItems();
      expect(vm.allItems()[0].completed).toBe(false);
      expect(vm.allItems()[1].completed).toBe(false);
      expect(vm.allItems()[2].completed).toBe(false);
    });
  });

  describe('deleteCompleted', () => {
    it('deletes completed items', () => {
      vm.allItems([
        { id: 1, completed: true },
        { id: 2, completed: false },
        { id: 3, completed: true }
      ]);
      vm.deleteCompleted();
      expect(vm.allItems().length).toBe(1);
      expect(vm.allItems()[0].id).toBe(2);
      expect(vm.allItems()[0].completed).toBe(false);
    });
    
  });

});