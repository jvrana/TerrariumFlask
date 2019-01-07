import React from 'react';
import {bindActionCreators} from 'redux';

import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import * as actionCreators from '../../actions/auth';
import PleaseLogin from './PleaseLogin';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


export default function requireAuthentication(ViewComponent) {
    class AuthenticatedComponent extends React.Component {

        render() {
            console.log("Checking auth");
            this.props.checkAuthentication();
            return <div>
                {this.props.isAuthenticated
                    ? <ViewComponent {...this.props} />
                    : <PleaseLogin/>
                }
            </div>
        }
    }

    return connect(mapStateToProps, mapDispatchToProps) (AuthenticatedComponent);
}