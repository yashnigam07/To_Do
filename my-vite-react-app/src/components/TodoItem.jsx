import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import './TodoItem.css'; // Ensure you have this CSS file for animations

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`todo-item flex items-center border rounded-lg px-4 py-3 gap-3 shadow-lg transition-transform duration-300 ease-in-out ${
        todo.completed ? 'completed' : 'active'
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer transition-transform duration-300 ease-in-out"
        checked={todo.completed}
        onChange={toggleCompleted}
        aria-label="Mark as completed"
      />
      <input
        type="text"
        className={`todo-input flex-1 border rounded-lg p-3 bg-transparent transition-all duration-300 ease-in-out ${
          isTodoEditable ? 'editable' : 'readonly'
        } ${todo.completed ? 'line-through completed-text' : 'active-text'}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
        aria-label="Todo description"
      />
      <button
        className="todo-button edit-button"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable(true);
          }
        }}
        disabled={todo.completed}
        aria-label={isTodoEditable ? 'Save' : 'Edit'}
      >
        {isTodoEditable ? '📁' : '✏️'}
      </button>
      <button
        className="todo-button delete-button"
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete"
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
