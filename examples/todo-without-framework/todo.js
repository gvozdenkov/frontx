var main = () => {
  var todoList = ['Walk the dog', 'Write good code', 'Make Yoga', 'Gym 100 times'];

  var addTodoInputEl = document.querySelector('#todo-input');
  var addTodoInputErrorEl = document.querySelector('.input-wrapper__error');
  var addTodoButtonEl = document.querySelector('#add-todo-btn');
  var todoListEl = document.querySelector('#todo-list');
  var addTodoFormEl = document.querySelector('.add-todo-form');

  var isUniqTodo = (description) => !!!todoList.find((desc) => desc === description);

  var removeTodo = (index) => {
    todoList.splice(index, 1);
    todoListEl.childNodes[index].remove();
  };

  var finishTodo = (index) => {
    todoListEl.childNodes[index].classList.toggle('done');
  };

  var addTodo = (description) => {
    todoList.push(description);
    todoListEl.append(renderTodoInReadMode(description));
    addTodoInputEl.value = '';
    addTodoButtonEl.disabled = true;
  };

  var updateTodo = (index, description) => {
    todoList[index] = description;
    const todo = renderTodoInReadMode(description);
    todoListEl.childNodes[index].replaceWith(todo);
  };

  var renderTodoInEditMode = (todo) => {
    var li = document.createElement('li');
    li.classList.add('todo-list__item');

    var input = document.createElement('input');
    input.value = todo;
    input.type = 'text';
    input.addEventListener('input', () => {
      saveButton.disabled = input.value.length < 3;
    });

    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
      var idx = todoList.indexOf(todo);
      updateTodo(idx, input.value);
    });

    var cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
      var idx = todoList.indexOf(todo);
      todoListEl.childNodes[idx].replaceWith(renderTodoInReadMode(todo));
    });

    li.append(input, saveButton, cancelButton);

    return li;
  };

  var renderTodoInReadMode = (todo) => {
    var li = document.createElement('li');
    li.classList.add('todo-list__item');

    var span = document.createElement('span');
    span.textContent = todo;
    span.addEventListener('dblclick', (e) => {
      var idx = todoList.indexOf(todo);
      todoListEl.childNodes[idx].replaceWith(renderTodoInEditMode(todo));
    });

    var doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.addEventListener('click', () => {
      var idx = todoList.indexOf(todo);
      finishTodo(idx);
    });

    var removeButton = document.createElement('button');
    removeButton.classList.add('button_remove');
    removeButton.setAttribute('aria-label', 'remove todo');
    removeButton.addEventListener('click', () => {
      var idx = todoList.indexOf(todo);
      removeTodo(idx);
    });

    li.append(span, doneButton, removeButton);

    return li;
  };

  var handleAddTodo = (e) => {
    e.preventDefault();
    var todo = addTodoInputEl.value;
    if (isUniqTodo(todo)) {
      addTodo(todo);
    } else {
      addTodoInputErrorEl.textContent = 'This todo already exists';
      addTodoInputEl.focus();
    }
  };

  var initialTodos = todoList.map((todo) => renderTodoInReadMode(todo));
  todoListEl.append(...initialTodos);

  addTodoInputEl.addEventListener('input', () => {
    addTodoButtonEl.disabled = addTodoInputEl.value.length < 3;
  });

  addTodoFormEl.addEventListener('submit', handleAddTodo);
};

main();
