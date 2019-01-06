import React from 'react'
import { connect } from 'react-redux';

const WithStore = ({ children, state, dispatch }) => children(state, dispatch);

export default connect(
    state => ({ state }),
    dispatch => ({ dispatch }),
)(WithStore);