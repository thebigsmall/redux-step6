import React, { findDOMNode, Component, PropTypes } from 'react';

export default class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const { onAddClick } = this.props;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.onAddClick !== this.props.onAddClick) {
      const { onAddClick } = nextProps;
    }
  }
  render() {
    return (
      <div>
        <form onSubmit = {e => {
          e.preventDefault()
          if (!this.refs.input.value.trim()) {
            return;
          }
          this.props.onAddClick(this.refs.input.value.trim());
          this.refs.input.value = '';
        }}>
          <input ref="input" />
          <button type="submit" onClick={(e) => this.handleClick(e)}>
            할일 추가하기 Add Todo
          </button>
        </form>
      </div>
    );
  }

  handleClick(e) {
    e.preventDefault();

    //NOTE warning.js?85a7:45 Warning: React.findDOMNode is deprecated.
      //Please use ReactDOM.findDOMNode from require('react-dom') instead.

    /*const node = findDOMNode(this.refs.input);
    const text = node.value.trim();

    this.props.onAddClick(text);
    node.value = '';
    */
    console.log('this.refs.input.value', this.refs.input.value);
    if (!this.refs.input.value) {
      return
    }
    this.props.onAddClick(this.refs.input.value.trim());
    this.refs.input.value = '';
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
