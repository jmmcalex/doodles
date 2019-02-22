import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from "react-icons/fa";
import { logout } from '../../actions/account';

class Appbar extends Component {

    get NavContent() {
        if(this.props.account.loggedIn){
            return(
                <NavItemsRight>
                    <NavLink to="/home" onClick={this.props.logout}>Logout</NavLink>
                    <NavLink to="/form">Upload</NavLink>
                    <NavLink to="/gallery">Gallery</NavLink>
                    <NavLink to="/home">About</NavLink>
                </NavItemsRight>
            )
        } else {
            return(
                <NavItemsRight>
                    <NavLink to="/home"> Home</NavLink>
                    <NavLink to="/gallery"> Gallery </NavLink>
                </NavItemsRight>
            )
        }
    }

    render() {
        return(
            <Navbar>
                <NavbarBrand>
                    Danielley's Doodles
                </NavbarBrand>
                {this.NavContent}
            </Navbar>
        )
    }
}


const Navbar = styled.div`
    display: flex;  
    background-color: #46ACC2;
    padding: 16px;
    font-family: 'Indie Flower', cursive;
    color: white;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
`;

const NavbarBrand = styled.div`
    padding-right: 8px;
`;

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;
    padding-right: 8px;
`;

const NavItems = styled.nav`

`;

const NavItemsRight = styled(NavItems)`
    display: flex;
    justify-content: space-around;
    margin-left: auto;
`;

const NavToggle = styled(FaBars)`
    display: none;
    @media screen and (max-width: 700px){
        align-self: flex-end;
        display: initial;
        position: absolute;
        cursor: pointer;
    }
`;

export default connect(
    ({ account }) => ({ account }),
    {logout},
)(Appbar);