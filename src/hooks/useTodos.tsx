"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/config/api";
import toast from "react-hot-toast";
import { useEffect } from "react";

const handleError = (error: any, context: any, queryClient: any, message: string) => {
  toast.error(`${message} ${error}`);
  if (context?.previousTodos) {
    queryClient.setQueryData(["todos"], context.previousTodos);
  }
};

export const useTodosData = () => {
  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}?_limit=10`);
      return response.data;
    },
  });
  useEffect(() => {
    !isLoading && toast.success("Todos loaded");
  }, [isLoading]);

  return { todos, isLoading, error };
};

export const useTodosMutations = () => {
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation({
    mutationFn: (newTodo: { title: string; completed: boolean }) => axios.post(API_URL, newTodo),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      const optimisticTodo = { ...newTodo, id: Date.now() };
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => [optimisticTodo, ...old]);
      return { previousTodos, optimisticId: optimisticTodo.id };
    },
    onSuccess: () => {
      toast.success("Todo added successfully");
    },
    onError: (error, _, context) => {
      handleError(error, context, queryClient, "Add failed");
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => axios.delete(`${API_URL}/${id}`),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => old.filter((todo) => todo.id !== id));
      return { previousTodos };
    },
    onSuccess: () => {
      toast.success("Todo deleted successfully");
    },
    onError: (error, id, context) => {
      handleError(error, context, queryClient, "Delete failed");
    },
  });

  return { addTodo: addTodoMutation, deleteTodo: deleteTodoMutation };
};

export const useTodos = () => {
  const { todos, isLoading, error } = useTodosData();
  const { addTodo, deleteTodo } = useTodosMutations();

  return {
    todos,
    isLoading,
    error,
    addTodo,
    deleteTodo,
  };
};
