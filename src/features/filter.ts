import { Status } from '../types/Status';

type SetAllAction = {
  type: 'todos/ALL',
  payload: {
    status: Status,
    query: string,
  }
};

type SetActiveAction = {
  type: 'todos/ACTIVE',
  payload: {
    status: Status,
    query: string,
  }
};

type SetCompletedAction = {
  type: 'todos/COMPLETED',
  payload: {
    status: Status,
    query: string,
  }
};

type Action =
  | SetAllAction
  | SetActiveAction
  | SetCompletedAction;

const filterAll = (
  status: Status,
  query: string,
): SetAllAction => ({
  type: 'todos/ALL',
  payload: {
    status,
    query,
  },
});

const filterActive = (
  status: Status,
  query: string,
): SetActiveAction => ({
  type: 'todos/ACTIVE',
  payload: {
    status,
    query,
  },
});

const filterCompleted = (
  status: Status,
  query: string,
): SetCompletedAction => ({
  type: 'todos/COMPLETED',
  payload: {
    status,
    query,
  },
});

export const actions = {
  filterAll,
  filterActive,
  filterCompleted,
};

type State = {
  query: string,
  status: Status,
};

const initialState: State = {
  query: '',
  status: Status.ALL,
};

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'todos/ALL':
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    case 'todos/ACTIVE':
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    case 'todos/COMPLETED':
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default filterReducer;
