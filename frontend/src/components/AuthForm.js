import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { signup, login } from '../actions/account';
import fetchStates from '../reducers/fetchstates';
import styled from 'styled-components';


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
        if(this.props.account.loggedIn) {
            return(
                <Redirect push to={{ pathname: `/` }}/>
            )
        }

        return(
            <Layout>
                <h1>Login Here! This is for Danielle only :)</h1>
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
                    {/* <span> or </span>
                   <Button onClick={this.signup}>Sign Up</Button> */}
                </div>
                <br />
                { this.Error }
            </Layout>
        )
    }
};

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 3em;
    margin-right: 3em;
`;



export default connect(
    ({ account }) => ({ account }),
    { login, signup }
)(AuthForm);