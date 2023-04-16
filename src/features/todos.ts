import { Todo } from '../types/Todo';

type AddTodosFromServer = {
  type: 'todos/add',
  payload: Todo[],
};

const addTodos = (todos: Todo[]): AddTodosFromServer => ({
  type: 'todos/add',
  payload: todos,
});

export const actions = { addTodos };

type State = Todo [] | [];

const todosReducer = (
  state: State = [],
  action: AddTodosFromServer,
): Todo[] => {
  switch (action.type) {
    case 'todos/add':
      return [...action.payload];
    default:
      return state;
  }
};

export default todosReducer;
