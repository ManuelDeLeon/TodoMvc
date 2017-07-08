import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from './Footer';

describe('Footer', () => {

  describe('view model', () => {
    let footer;
    beforeEach(() => {
      footer = new Footer();
    });

    it("has share todoList", () => {
      expect(footer.hasShare('todoList')).toBe(true);
    });

    describe('pendingWord', () => {
      it("returns 'item' with 1", () => {
        footer.pendingCount = () => 1;
        expect(footer.pendingWord()).toBe("item");
      });
      it("returns 'items' with 2", () => {
        footer.pendingCount = () => 2;
        expect(footer.pendingWord()).toBe("items");
      });
      it("returns 'items' with 0", () => {
        footer.pendingCount = () => 0;
        expect(footer.pendingWord()).toBe("items");
      });
    });

  });

  describe('bindings', () => {
    const rendered = shallow(<Footer hasCompleted={true} />);

    it('binds pending count', () => {
      const elements = rendered.find('strong[data-bind="text: pendingCount"]');
      expect(elements.length).toBe(1);
    });
    it('binds pending word', () => {
      const elements = rendered.find('span[data-bind="text: pendingWord"]');
      expect(elements.length).toBe(1);
    });
    it('binds option All', () => {
      const elements = rendered.find(`a[data-bind="click: filter('All'), class: { selected: filter === 'All' }"]`);
      expect(elements.length).toBe(1);
    });
    it('binds option Pending', () => {
      const elements = rendered.find(`a[data-bind="click: filter('Pending'), class: { selected: filter === 'Pending' }"]`);
      expect(elements.length).toBe(1);
    });
    it('binds option Completed', () => {
      const elements = rendered.find(`a[data-bind="click: filter('Completed'), class: { selected: filter === 'Completed' }"]`);
      expect(elements.length).toBe(1);
    });
    it('binds button', () => {
      const elements = rendered.find(`button[data-bind="if: hasCompleted, click: deleteCompleted"]`);
      expect(elements.length).toBe(1);
    });
  })

});