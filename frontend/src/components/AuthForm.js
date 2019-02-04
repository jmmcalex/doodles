import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { signup, login } from '../actions/account';
import fetchStates from '../reducers/fetchStates';


class AuthForm extends Component {
    state = {
        username: '',
        password: '',
        buttonClicked: false,
    };

    updateUsername = event => {
        const username = event.target.value;
        this.setState({ username });
    }

    updatePassword = event => {
        const password = event.target.value;
        this.setState({ password });
    }

    signup = () => {
        this.setState({ buttonClicked: true });
        const { username, password } = this.state;
        this.props.signup({ username, password });
    }

    login = () => {
        this.setState({ buttonClicked: true })
        const { username, password } = this.state;
        this.props.login({ username, password });
    }

    get Error() {
        if (
            this.state.buttonClicked &&
            this.props.account.status === fetchStates.error
        ) {
            return (
                <Fragment>
                    { this.props.account.message }
                </Fragment>
            )
        }
    }

    render() { 
        return(
            <Fragment>
                <h1>AuthForm</h1>
                <FormGroup>
                    <FormControl 
                        type='text'
                        value={ this.state.username }
                        placeholder='username'
                        onChange={ this.updateUsername }
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl 
                         type='password'
                         value={ this.state.password }
                         placeholder='password'
                         onChange={ this.updatePassword }
                    />
                </FormGroup>
                <div>
                   <Button onClick={this.login}>Login</Button>
                   <span> or </span>
                   <Button onClick={this.signup}>Sign Up</Button>
                </div>
                <br />
                { this.Error }
                {/* <Signin /> */}
                {/* <Album /> */}
            </Fragment>
        )
    }
};


export default connect(
    ({ account }) => ({ account }),
    { login, signup }
)(AuthForm);