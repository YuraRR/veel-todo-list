import React from "react";
import { motion } from "framer-motion";
import Todo from "../../types/todo";

interface TodoItemProps {
  todo: Todo;
  onDelete: { mutate: (id: number) => void };
}

const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
  console.log(todo);
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 15 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-4 px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700"
    >
      <span>{todo.title}</span>

      {todo.completed ? (
        <span className="ml-auto text-green-400 ">Completed</span>
      ) : (
        <span className="ml-auto text-yellow-400">In progress</span>
      )}
      <button
        onClick={() => onDelete.mutate(todo.id)}
        className="px-3 py-1 text-white bg-red-500 rounded cursor-pointer select-none hover:bg-red-600"
      >
        х
      </button>
    </motion.li>
  );
};

export default TodoItem;
