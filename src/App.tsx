/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Todo } from './types/Todo';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Status } from './types/Status';

const filterTodos = (todos: Todo[], query: string, filter: Status) => {
  let filteredTodos = [...todos];
  const lowerCasedQuery = query.toLowerCase();

  if (query) {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.title.toLowerCase().includes(lowerCasedQuery),
    );
  }

  switch (filter) {
    case 'all':
      return filteredTodos;
    case 'active':
      return filteredTodos.filter((todo) => !todo.completed);
    case 'completed':
      return filteredTodos.filter((todo) => todo.completed);
    default:
      return filteredTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Status>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const visibleTodos = filterTodos(todos, query, filter);

  useEffect(() => {
    getTodos()
      .then((data) => setTodos(data));
  }, []);

  const findSelectedTodo = (id: number): void => {
    const foundTodo = visibleTodos.find(todo => id === todo.id);

    setSelectedTodoId(id);
    setSelectedTodo(foundTodo);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={findSelectedTodo}
                  selectedTodoId={selectedTodoId}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && selectedTodoId !== 0 && (
        <TodoModal
          selectedTodo={selectedTodo}
          closeModal={() => setSelectedTodoId(0)}
        />
      ) }
    </>
  );
};
