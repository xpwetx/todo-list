export const actions = {
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  setLoadError: 'setLoadError',
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  reverTodo: 'reverTodo',
  clearError: 'clearError',
};

export const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

export function todosReducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };

    case actions.loadTodos:
        const todos = action.records.map(record => ({
            id: record.id,
            fields: {
                title: record.fields.title,
                isCompleted: record.fields.isComplete ?? false,
            },
        }));

      return {
        ...state,
        todoList: todos,
        isLoading: false,
      };
    }
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
        isSaving: false,
      };

    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };

    case actions.addTodo:
        const record = action.record;
        const savedTodo = {
            id: record.id,
            fields: {
                title: record.fields.title,
                isCompleted: record.fields.isCompleted ?? false,
            },
        };
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    }

    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };

      
    case actions.updateTodo:
      return {
        ...state,
      };
    case actions.completeTodo:
      return {
        ...state,
      };
    case actions.revertTodo:
      return {
        ...state,
      };
    case actions.clearError:
      return {
        ...state,
      };
    default:
      return state;
  }
}
