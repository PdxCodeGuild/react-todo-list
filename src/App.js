import React from 'react';

import './App.css';
import { TodoListContext, TodoListProvider } from './state';

const Form = () => {
  const [state, dispatch] = React.useContext(TodoListContext);

  const onChange = (event) => {
    dispatch({type: 'setText', payload: event.target.value});
  }

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch({type: 'addItem', payload: {
      text: state.text,
      completed: false
    }});

    dispatch({type: 'setText', payload: ''});

    return false;
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={state.text} onChange={onChange} />
      <button>Add Item</button>
    </form>
  );
}

const Item = (props) => {
  const [state, dispatch] = React.useContext(TodoListContext);

  const removeItem = () => dispatch({type: 'removeItem', payload: props.index});
  const toggleItem = () => dispatch({type: 'toggleItem', payload: props.index});

  return (
    <div className="Item">
      <div>{props.item.text}</div>
      <input type="checkbox" value={props.item.completed} onChange={toggleItem} />
      <button onClick={removeItem}>X</button>
    </div>
  );
}

const List = () => {
  const [state] = React.useContext(TodoListContext);

  return (
    <div className="Items">
      {state.items.length === 0 && (
        <div>
          <em>Nothing to do...</em>
        </div>
      )}
      {state.items && state.items.map((item, i) => (
        <Item
          key={i}
          index={i}
          item={item}
        />
      ))}
    </div>
  );
};

const TodoList = () => {
  return (
    <div className="TodoList">
      <TodoListProvider>
        <Form />
        <List />
      </TodoListProvider>
    </div>
  );
}

export default TodoList;
