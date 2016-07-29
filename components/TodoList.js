//TodoList is a list showing visible todos.
import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo, index) =>
          <Todo {...todo}
                key={index}
                onClick={() => this.props.onTodoClick(index)} />
        )}
      </ul>
    );
  }
}

//NOTE warning.js?85a7:45 Warning: Failed propType: Required prop `todos` was not specified in `TodoList`. Check the render method of `App`.
TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,

  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
};

/*
NOTE Ex.
propTypes: {
  //Id can be a number, or a string, but it needs to be defined!
  id: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]).isRequired,

 //Messages should be an object with a title and text property of type string
  message: React.PropTypes.shape({
    title: React.PropTypes.string,
    text: React.PropTypes.string
  }).isRequired,

  //The comments property needs to be an array of objects.
  comments: React.PropTypes.arrayOf(React.PropTypes.object),

  //The date needs to be an instance of type Date.
  date: React.PropTypes.instanceOf(Date)
}
*/
