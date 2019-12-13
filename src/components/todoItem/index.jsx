import React from "react";

import "../../index.scss";

const TodoItem = ({ text, completed, deleteTodo, checkTodo }) => (
  <li className={completed ? "completed" : ""}>
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        onClick={checkTodo}
        checked={completed}
        defaultChecked
      />
      <label>{text}</label>
      <button className="destroy" onClick={deleteTodo}></button>
    </div>
    <input className="edit" value="adad" />
  </li>
);

export default TodoItem;
