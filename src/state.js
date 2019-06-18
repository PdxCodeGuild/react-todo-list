import React from 'react';

const todoListInitialState = {
  items: [],
  text: '',
};

const todoListReducer = (state, action) => {
  switch(action.type) {
    case 'setText':
      return {
        ...state,
        text: action.payload
      }
    case 'addItem':
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    case 'removeItem':
      return {
        ...state,
        items: state.items.filter((item, i) => i !== action.payload)
      }
    case 'toggleItem': 
      const newItems = state.items.slice();
      newItems[action.payload].completed = !newItems[action.payload].completed;
      return {
        ...state,
        items: newItems,
      }
    default:
      return state;
  }
}

export const TodoListContext = React.createContext([null, () => {}]);

export const TodoListProvider = (props) => {
  const todoListStore = React.useReducer(todoListReducer, todoListInitialState);

  return (
    <TodoListContext.Provider value={todoListStore}>
      {props.children}
    </TodoListContext.Provider>
  )
}
