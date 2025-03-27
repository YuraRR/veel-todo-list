import TodoList from "../components/TodoList/TodoList";
import QueryProvider from "./providers";

export default function MainPage() {
  return (
    <QueryProvider>
      <TodoList />
    </QueryProvider>
  );
}
