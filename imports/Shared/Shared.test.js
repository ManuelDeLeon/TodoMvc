import './Shared';
import ViewModel from 'viewmodel-react';

describe('todoList shared bucket', () => {

  let vm;
  beforeEach(() => {
    vm = ViewModel.loadComponent({
      share: 'todoList'
    });
  });

  describe('allItems', () => {
    it('defaults to empty', () => {
      expect(vm.allItems().length).toBe(0);
    });
  });

  describe('filter', () => {
    it('defaults to ALL', () => {
      expect(vm.filter()).toBe('ALL');
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
    it('returns 1 item for COMPLETED', () => {
      vm.filter("COMPLETED");
      expect(vm.filteredItems().length).toBe(1);
    });
    it('returns 2 items for PENDING', () => {
      vm.filter("PENDING");
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
    it('returns 2 items sorted for COMPLETED', () => {
      vm.filter("COMPLETED");
      expect(vm.items().length).toBe(2);
      expect(vm.items()[0].id).toBe(1);
      expect(vm.items()[1].id).toBe(3);
    });
    it('returns 1 item for PENDING', () => {
      vm.filter("PENDING");
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

});