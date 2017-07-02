import React from 'react';
import { shallow } from 'enzyme';
import { Main } from './Main';
import { ListItem } from './ListItem/ListItem';

describe('Main', () => {

  describe('view model', () => {
    let main;
    beforeEach(() => {
      main = new Main();
    });

    it("has share todoList", () => {
      expect(main.hasShare('todoList')).toBe(true);
    });

  });

  describe('bindings', () => {
    const rendered = shallow(<Main items={[{id: 1}]} />);

    it('binds input', () => {
      const elements = rendered.find('input[data-bind="check: !hasPending"]');
      expect(elements.length).toBe(1);
    });
    
    it('binds label', () => {
      const elements = rendered.find('label[data-bind="click: toggleItems"]');
      expect(elements.length).toBe(1);
    });

    describe('ListItem', () => {
      const element = rendered.find(ListItem).first();
      it('is bound', () => {
        expect(element.prop('data-bind')).toBe("repeat: items, key: id");
      });
    });
  })

});