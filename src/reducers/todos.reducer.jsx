export const actions = {
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  setLoadError: 'setLoadError',
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  revertTodo: 'revertTodo',
  clearError: 'clearError',
  deleteTodo: 'deleteTodo'
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
      return {
        ...state,
        todoList: action.records.map(record => ({
          id: record.id,
          title: record.fields.title,
          isCompleted: record.fields.isCompleted || false,
        })),
        isLoading: false,
      };
    
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

    case actions.addTodo: {
        const record = action.record;
        const savedTodo = {
            id: record.id,
            title: record.fields.title,
                isCompleted: record.fields.isCompleted || false,
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

      case actions.updateTodo: {
        const updatedTodos = state.todoList.map(todo =>
            todo.id === action.editedTodo.id ? action.editedTodo : todo
        );
return {
  ...state,
  todoList: updatedTodos,
};
      }

      case actions.revertTodo: {
        const updatedTodos = state.todoList.map(todo =>
          todo.id === action.editedTodo.id ? action.editedTodo : todo
        );
        return {
          ...state,
          todoList: updatedTodos,
          errorMessage: action.editedTodo.error || 'Update failed',
        };
      }

    case actions.completeTodo: {
        const updatedTodos = state.todoList.map(todo => 
            todo.id === action.id ? { ...todo, isCompleted: true } : todo       
          );
      return {
        ...state,
        todoList: updatedTodos,
      };
  
    }

    case actions.deleteTodo: {
      const filteredTodos = state.todoList.filter(todo => todo.id !== action.id);
      return {
        ...state,
        todoList: filteredTodos,
      };
    }

    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };

    default:
      return state;
  }
}

export default todosReducer;