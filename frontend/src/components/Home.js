import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { logout } from '../actions/account';



class Home extends Component {
    render() {
        return(
            <Fragment>
                <h1>Home Component</h1>
            </Fragment>
        )
    }
}

export default connect(
    null,
    { logout }
)(Home);