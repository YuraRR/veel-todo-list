"use client";

import { useTodos } from "@/hooks/useTodos";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { AnimatePresence } from "framer-motion";

const TodoList = () => {
  const { todos, isLoading, error, addTodo, deleteTodo } = useTodos();

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen py-4 bg-slate-800">
      <div className="max-w-3xl min-h-[740px] p-4 mx-auto rounded-lg shadow-md bg-slate-900">
        <h1 className="mb-6 text-2xl font-bold text-center">Todo App for Veel</h1>

        <TodoForm onAddTodo={addTodo} />
        {todos.length === 0 && <div className="text-center">No todos :(</div>}
        <ul className="space-y-3">
          <AnimatePresence>
            {todos.map((todo: Todo) => (
              <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
