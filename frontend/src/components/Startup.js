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
        : <p>Loading...</p>
    }
}


export default connect(
    ({ publicDoodles }) => ({ publicDoodles }),
    { fetchPublicDoodles }
)(Startup);