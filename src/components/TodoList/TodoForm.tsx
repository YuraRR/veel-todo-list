"use client";
import { useState } from "react";

interface TodoFormProps {
  onAddTodo: {
    mutate: (todo: { title: string; completed: boolean }) => void;
  };
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTodo.mutate({ title, completed: false });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={60}
        />
        <button
          type="submit"
          className="px-4 py-2 text-white transition-all duration-200 bg-blue-500 rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!title.trim()}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
