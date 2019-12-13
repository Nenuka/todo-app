import React, { useState } from "react";

import TodoItem from "../../../../components/todoItem";

const DUMMY_TODOS = [
  {
    id: 1,
    text: "Make the Bed",
    completed: false
  },
  {
    id: 0,
    text: "Drink Coffee",
    completed: true
  }
];

const STATES = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED"
};

function Home() {
  const [todos, setTodos] = useState(DUMMY_TODOS);
  const [selectedTab, setSelectedTab] = useState(STATES.ALL);

  const clearTodos = () => {
    setTodos([]);
  };

  const changeTab = state => setSelectedTab(state);

  const getFilteredTodos = state => {
    switch (state) {
      case STATES.ALL:
        return todos;
      case STATES.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case STATES.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
    }
  };

  const getTabClassName = state => selectedTab === state && "selected";

  const generateNewTodoID = () => {
    const lastElementID = todos.length !== 0 ? todos[0].id : null;
    return lastElementID + 1 || 0;
  };

  const addNewTodo = event => {
    event.preventDefault();

    const text = event.target.children[0].value.trim();
    if (text === "") return;

    const newTodo = {
      id: generateNewTodoID(),
      text: event.target.children[0].value,
      completed: false
    };

    setTodos([newTodo, ...todos]);

    event.target.children[0].value = "";
  };

  const deleteTodo = id => {
    const filteredTodos = todos.filter(function(todoToDelete) {
      return todoToDelete.id !== id;
    });

    setTodos(filteredTodos);
  };

  const checkTodo = completedTodos => {
    const newTodos = todos.map(function(todo) {
      if (todo.id === completedTodos) todo.completed = !todo.completed;
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <section className="todo-app">
      <div>
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={addNewTodo}>
            <input className="new-todo" placeholder="What needs to be done?" />
          </form>
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all"></label>
          <ul className="todo-list">
            {getFilteredTodos(selectedTab).map(function(todo, index) {
              return (
                <TodoItem
                  key={index}
                  text={todo.text}
                  completed={todo.completed}
                  checkTodo={() => checkTodo(todo.id)}
                  deleteTodo={() => deleteTodo(todo.id)}
                />
              );
            })}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{todos.filter(todo => !todo.completed).length}</strong>
            <span> </span>
            <span>items</span>
            <span> left</span>
          </span>
          <ul className="filters">
            <li>
              <a
                href="#/"
                className={getTabClassName(STATES.ALL)}
                onClick={() => changeTab(STATES.ALL)}
              >
                All
              </a>
            </li>
            <span> </span>
            <li>
              <a
                href="#/active"
                className={getTabClassName(STATES.ACTIVE)}
                onClick={() => changeTab(STATES.ACTIVE)}
              >
                Active
              </a>
            </li>
            <span> </span>
            <li>
              <a
                href="#/completed"
                className={getTabClassName(STATES.COMPLETED)}
                onClick={() => changeTab(STATES.COMPLETED)}
              >
                Completed
              </a>
            </li>
          </ul>
          <button className="clear-completed" onClick={clearTodos}>
            Clear completed
          </button>
        </footer>
      </div>
    </section>
  );
}

export default Home;
