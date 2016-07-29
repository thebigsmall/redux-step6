//Below is Smart Container Components.

import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions';

import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

class App extends Component {
  render() {
    // NOTE connect() 호출을 통해 todos 데이터( visibleTodos )가 주입됨. dispatch 함수와, visibilityFilter 필터타입도 주입됨.

    // selectTodos(state.todos, state.visibilityFilter(= VisibilityFilters.SHOW_ALL)
      // ---> const { dispatch, visibleTodos, visibilityFilter } = this.props;
    const { dispatch, visibleTodos, visibilityFilter } = this.props;
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))
          } />
        <TodoList
          todos={visibleTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
      </div>
    );
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })),

  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
};

//visibleTodos <--- todos
function selectTodos(todos, filter) {
  switch (filter) {
  case VisibilityFilters.SHOW_ALL:
    return todos;

  case VisibilityFilters.SHOW_COMPLETED:
    return todos.filter(todo => todo.completed);

  case VisibilityFilters.SHOW_ACTIVE:
    return todos.filter(todo => !todo.completed);
  }
}

// NOTE connect() 호출을 통해 todos 데이터( visibleTodos )가 주입됨. dispatch 함수와, visibilityFilter 필터타입도 주입됨.

// selectTodos(state.todos, state.visibilityFilter(= VisibilityFilters.SHOW_ALL)
  // ---> const { dispatch, visibleTodos, visibilityFilter } = this.props;

// 더 나은 성능을 위해서는 https://github.com/faassen/reselect 를 사용
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
}
// NOTE warning.js?85a7:45 Warning: Failed propType: Required prop `todos` was not specified in `TodoList`. Check the render method of `App`.
export default connect(select)(App);

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
