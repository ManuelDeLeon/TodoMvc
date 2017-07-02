import React from 'react';
import { shallow } from 'enzyme';
import { TodoList } from './TodoList';
import { Main } from './Main/Main';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { ListItem } from './Main/ListItem/ListItem';


describe('TodoList', () => {

  describe('view model', () => {
    let todoList;
    beforeEach(() => {
      todoList = new TodoList();
    });

    it("has share todoList", () => {
      expect(todoList.hasShare('todoList')).toBe(true);
    });
  });

  describe('bindings', () => {
    const rendered = shallow(<TodoList hasItems={true} />);

    describe('Header', () => {
      const element = rendered.find(Header).first();
      it('is present', () => {
        expect(element.node).toBeTruthy();
      });
    });

    describe('Main', () => {
      const element = rendered.find(Main).first();
      it('is bound', () => {
        expect(element.prop('data-bind')).toBe("if: hasItems");
      });
    });

    describe('Footer', () => {
      const element = rendered.find(Footer).first();
      it('is bound', () => {
        expect(element.prop('data-bind')).toBe("if: hasItems");
      });
    });
  })

});