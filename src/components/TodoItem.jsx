import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

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
      className={`flex border border-gray-300 rounded-lg px-4 py-3 gap-4 shadow-sm duration-300 text-gray-800 ${
        todo.completed ? "bg-green-100" : "bg-purple-100"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none flex-1 bg-transparent rounded-lg ${
          isTodoEditable ? "border-gray-500 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""} text-base`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className={`inline-flex p-1 rounded-lg text-base border border-gray-300 justify-center items-center bg-blue-200 hover:bg-blue-300 shrink-0 ${
          todo.completed ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        <span className="  text-bold text-xl"> {isTodoEditable ? "Save" : "Edit"}</span>
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-base border border-gray-300 justify-center items-center bg-red-200 hover:bg-red-300 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
