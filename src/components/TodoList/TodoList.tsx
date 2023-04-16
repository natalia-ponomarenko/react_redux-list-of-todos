import classnames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { actions as todoAction } from '../../features/currentTodo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo: Todo) => {
          const {
            id,
            title,
            completed,
          } = todo;

          const isTodoSelected = currentTodo?.id === id;

          return (
            <tr
              data-cy="todo"
              className={classnames({
                'has-background-info-light': isTodoSelected,
              })}
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classnames({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(todoAction.setTodo(todo))}
                >
                  <span className="icon">
                    <i
                      className={classnames(
                        'far',
                        {
                          'fa-eye-slash': isTodoSelected,
                          'fa-eye': !isTodoSelected,
                        },
                      )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
