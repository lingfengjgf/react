import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { connect } from './myReactRedux';
// import { bindActionCreators } from 'redux';
import { bindActionCreators } from './myRedux';

@connect(
  // mapStateToProps
  // state => ({ count: state.count })
  ({ count }) => ({count}), //简写

  // mapDispatchToProps object | function
  // {
  //   add: () => ({
  //     type: "ADD"
  //   })
  // },

  dispatch => {
    // const add = () => dispatch({ type: "ADD" })

    let creators = {
      add: () => ({ type: "ADD" })
    }
    creators = bindActionCreators(creators, dispatch);
    return { dispatch, ...creators };
  },

  // mergeProps
  (stateProps, dispatchProps, ownProps) => {
    return { ...stateProps, ...dispatchProps, ...ownProps, other: 'other' }
  }
)
export default class ReactReduxPage extends Component {

  change = (type) => {
    this.props.dispatch({ type, payload: 10 })
  }

  render() {
    console.log('props:', this.props);
    const { count, add } = this.props;
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <div>{count}</div>
        <button onClick={() => this.change('ADD')}>add 10</button>
        <button onClick={() => this.change('MINUS')}>minus 10</button>
        <button onClick={() => add()}>connect add</button>
      </div>
    )
  }
}