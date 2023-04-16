import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as FilterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = (
) => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const handleSelectChange = (value: Status) => {
    switch (value) {
      case Status.ALL:
        dispatch(FilterActions.filterAll(value, query));
        break;
      case Status.COMPLETED:
        dispatch(FilterActions.filterCompleted(value, query));
        break;
      case Status.ACTIVE:
        dispatch(FilterActions.filterActive(value, query));
        break;
      default:
        dispatch(FilterActions.filterAll(value, query));
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            name="filter"
            onChange={(e) => handleSelectChange(e.target.value as Status)}
            value={status}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          name="query"
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(e) => dispatch(
            FilterActions.filterAll(status, e.target.value),
          )}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length !== 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(FilterActions.filterAll(Status.ALL, ''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
