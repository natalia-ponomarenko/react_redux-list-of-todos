import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], query: string, status: string) => {
  let filteredTodos = [...todos];
  const lowerCasedQuery = query.toLowerCase();

  if (query) {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.title.toLowerCase().includes(lowerCasedQuery),
    );
  }

  switch (status) {
    case Status.ALL:
      return filteredTodos;
    case Status.ACTIVE:
      return filteredTodos.filter((todo) => !todo.completed);
    case Status.COMPLETED:
      return filteredTodos.filter((todo) => todo.completed);
    default:
      return filteredTodos;
  }
};
