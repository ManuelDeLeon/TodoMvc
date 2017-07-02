import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe('Header', () => {

  describe('view model', () => {
    let header;
    beforeEach(() => {
      header = new Header();
    });

    it("has share todoList", () => {
      expect(header.hasShare('todoList')).toBe(true);
    });

    describe('newItem', () => {
      it('defaults to empty', () => {
        expect(header.newItem()).toBe('');
      });
    });

  });

  describe('bindings', () => {
    const rendered = shallow(<Header />);

    it('binds input', () => {
      const elements = rendered.find('input[data-bind="value: newItem, enter: addItem(newItem) && newItem.reset"]');
      expect(elements.length).toBe(1);
    });
    
  })

});