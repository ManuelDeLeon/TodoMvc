import React from 'react';
import { shallow } from 'enzyme';
import { ListItem } from './ListItem';

describe('ListItem', () => {

  describe('view model', () => {
    let listItem;
    beforeEach(() => {
      listItem = new ListItem();
    });

    it("has share todoList", () => {
      expect(listItem.hasShare('todoList')).toBe(true);
    });

    describe('id', () => {
      it('defaults to empty', () => {
        expect(listItem.id()).toBe('');
      });
    });
    describe('text', () => {
      it('defaults to empty', () => {
        expect(listItem.text()).toBe('');
      });
    });
    describe('completed', () => {
      it('defaults to false', () => {
        expect(listItem.completed()).toBe(false);
      });
    });
    describe('editing', () => {
      it('defaults to false', () => {
        expect(listItem.editing()).toBe(false);
      });
    });
    describe('editText', () => {
      it('defaults to empty', () => {
        expect(listItem.editText()).toBe('');
      });
    });

    describe('created', () => {
      it('updates editText', () => {
        listItem.text('A');
        listItem.created();
        expect(listItem.editText()).toBe('A');
      });
    });

    describe('save', () => {
      it('calls updateItem', () => {
        listItem.id('A');
        listItem.editText('B');
        listItem.completed(true);
        let obj;
        listItem.updateItem = o => {
          obj = o;
        };
        listItem.save();
        expect(obj.id).toBe('A');
        expect(obj.text).toBe('B');
        expect(obj.completed).toBe(true);
      });
    });

    describe('cancel', () => {
      it('updates editText and editing', () => {
        listItem.text('A');
        listItem.editText('B');
        listItem.editing(true);
        listItem.cancel();
        expect(listItem.editText()).toBe('A');
        expect(listItem.editing()).toBe(false);
      });
    });

    describe('completeItem', () => {
      it('updates completed and saves', () => {
        const completedInitial = listItem.completed();
        let saved = false;
        listItem.save = () => {
          saved = true;
        };
        listItem.completeItem();
        expect(listItem.completed()).toBe(!completedInitial);
        expect(saved).toBe(true);
      });
    });

  });

  describe('bindings', () => {
    const rendered = shallow(<ListItem />);

    it('binds li', () => {
      const elements = rendered.find('li[data-bind="class: { completed: completed, editing: editing }"]');
      expect(elements.length).toBe(1);
    });
    
    it('binds checkbox', () => {
      const elements = rendered.find('input[type="checkbox"][data-bind="check: completed, click: completeItem"]');
      expect(elements.length).toBe(1);
    });

    it('binds label', () => {
      const elements = rendered.find('label[data-bind="text: text, click: editing(true)"]');
      expect(elements.length).toBe(1);
    });

    it('binds button', () => {
      const elements = rendered.find('button[data-bind="click: deleteItem(id)"]');
      expect(elements.length).toBe(1);
    });

    it('binds text box', () => {
      const elements = rendered.find('input[type="text"][data-bind="value: editText, enter: save, esc: cancel, blur: editing && save, focus: editing"]');
      expect(elements.length).toBe(1);
    });
  })

});