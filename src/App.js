import React from 'react';
import './App.css';

const Item = (props) => {
  const { item, index, toggleCompleted, removeItem } = props;
  return (
    <div className="Item">
      <div>
        {item.text}
      </div>
      <input 
        type="checkbox" 
        onChange={() => toggleCompleted(index)} 
        value={item.completed} 
      />
      <button onClick={() => removeItem(index)}>×</button>
    </div>
  )
}

const List = (props) => {
  const { items, removeItem, toggleCompleted } = props;

  return (
    <div className="Items">
    {items.length === 0 && <div><em>No items...</em></div>}
    {items.map((item, i) => (
      <Item 
        key={i} 
        item={item} 
        index={i}
        toggleCompleted={toggleCompleted}
        removeItem={removeItem}
      />
    ))}
    </div>
  )
}

class App extends React.Component {
  initialState = {
    items: [],
    text: '',
  }

  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  addItem = (event) => {
    event.preventDefault();

    const { items, text } = this.state;

    this.setState({
      items: [...items, {
        text,
        completed: false
      }],
      text: '',
    });

    // For laughs!
    return false;
  }

  removeItem = (index) => {
    const { items } = this.state;

    this.setState({
      items: items.filter((item, i) => i !== index),
    });
  }

  toggleCompleted = (index) => {
    const { items } = this.state;

    const newItems = items.slice();
    newItems[index].completed = !newItems[index].completed;

    this.setState({
      items: newItems,
    });
  }

  handleInputChange = (event) => {
    const text = event.target.value;

    this.setState({
      text
    });
  }

  

  render() {
    const { items, text } = this.state;

    return (
      <div className="TodoList">
        <form onSubmit={this.addItem}>
          <input
            type="text"
            onChange={this.handleInputChange}
            value={text} 
          />
          <button>Add</button>
        </form>
        <List 
          items={items} 
          removeItem={this.removeItem} 
          toggleCompleted={this.toggleCompleted} 
        />
      </div>
    )
  }
}

export default App;
