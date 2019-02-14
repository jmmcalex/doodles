import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { fetchPublicDoodles } from '../actions/publicDoodles';
import { BreakpointProvider } from 'react-socks';

class Startup extends Component {
    componentDidMount() {
        this.props.fetchPublicDoodles();
    }
    render() {
        return this.props.publicDoodles.loaded
        ? <BreakpointProvider> 
            {this.props.children}
          </BreakpointProvider>
        : <Loader></Loader>
    }
}


const Loader = styled.div`
    margin: auto;
    border: 16px solid #bdc3c7;
    width: 120px;
    height: 120px;
    border-bottom-color: #3498db;
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;
`;


const spin = keyframes`
    0% { 
        transform: rotate(0deg); 
    }
    100% { 
        transform: rotate(360deg); 
    }
`;
  


export default connect(
    ({ publicDoodles }) => ({ publicDoodles }),
    { fetchPublicDoodles }
)(Startup);