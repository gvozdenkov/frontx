import { h, hFrag } from 'https://unpkg.com/frontage@0.0.1';
// import { h, hFrag } from '../../packages/runtime/src/h.js';

var state = ['Walk the dog', 'Write good code', 'Make Yoga', 'Gym 100 times'];

var AddTodoForm = () =>
  h('form', { props: { className: 'add-todo-form' } }, [
    h('div', { props: { className: 'input-wrapper' } }, [
      h('label', { props: { for: 'todo-input' } }, ['New todo']),
      h('input', { props: { id: 'todo-input', name: 'todo', type: 'text', autocomplete: 'off' } }),
      h('span', { props: { className: 'input-wrapper__error' } }),
    ]),
    h('button', { props: { type: 'submit', id: 'add-todo-btn', disabled: 'true' } }, ['Add']),
  ]);

var TodoInReadMode = (todo) =>
  h('li', { props: { className: 'todo-list__item' } }, [
    h('span', { on: { dblclick: () => console.log('render edit mode') } }, [todo]),
    h(
      'button',
      {
        on: {
          click: () => console.log('finish todo'),
        },
      },
      ['Done']
    ),
    h('button', {
      props: { className: 'button_remove', ariaLabel: 'remove todo' },
      on: {
        click: () => console.log('remove todo'),
      },
    }),
  ]);

var TodoItem = (todo) => {
  return TodoInReadMode(todo);
};

var TodoList = (state) =>
  h('section', { props: { className: 'todo-section' } }, [
    h(
      'ul',
      { props: { className: 'todo-list', id: 'todo-list' } },
      state.map((todo) => TodoItem(todo))
    ),
  ]);

var Header = () =>
  h('header', { props: { className: 'header' } }, [h('h1', {}, ['My todo']), AddTodoForm()]);

var App = (state) => hFrag([Header(), TodoList(state)]);

console.log('-> App:', App(state));
