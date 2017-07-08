import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { TodoList } from './TodoList/TodoList';
import { Footer } from './Footer/Footer';

describe('App', () => {

  describe('bindings', () => {
    const rendered = shallow(<App />);

    describe('TodoList', () => {
      const element = rendered.find(TodoList).first();
      it('is present', () => {
        expect(element.node).toBeTruthy();
      });
    });

    describe('Footer', () => {
      const element = rendered.find(Footer).first();
      it('is present', () => {
        expect(element.node).toBeTruthy();
      });
    });
  })

});