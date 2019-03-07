import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styled from 'styled-components';
import Breakpoint from 'react-socks';
import old_image from './old_image.png';
import new_image from './new_image.png'

class ComicNav extends Component {  

    get fwdButtons() {
        const currentIndex  = this.props.index;
        const newestIndex = 0;

        if ( currentIndex > newestIndex ){
            return (
                <Fragment>
                    <StyledLink to={`/comic/${parseInt(currentIndex) - 1}`}>
                        <Image src={new_image} alt="next baby" />
                    </StyledLink>
                    <StyledLink to={`/comic/${newestIndex}`}>
                        <NewestArrow />
                    </StyledLink>
                </Fragment>
            )
        } else {
             return (
                <Fragment>
                    <div> </div>
                    <div> </div>
                </Fragment>
            )
        }
    }
    
    get backButtons() {
        const currentIndex  = this.props.index;
        const oldestIndex = this.props.publicDoodles.endIndex;

        if ( currentIndex < oldestIndex ){
            return (
                <Fragment>
                    <StyledLink to={`/comic/${oldestIndex}`}>
                        <OldestArrow />
                    </StyledLink>
                    <StyledLink to={`/comic/${parseInt(currentIndex) + 1}`}>
                        <Image src={old_image} alt="old man" />
                    </StyledLink>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div> </div>
                    <div> </div>
                </Fragment>
            )
        }
    }

    render() {
        return (
            <Fragment>
                <Breakpoint small down>
                    <SmallLayout>
                        {this.backButtons}
                        <Title>{this.props.title}</Title>
                        {this.fwdButtons}
                    </SmallLayout>
                </Breakpoint>
                <Breakpoint medium up>
                    <MediumLayout>
                        {this.backButtons}
                        <Title>{this.props.title}</Title>
                        {this.fwdButtons}
                    </MediumLayout>
                </Breakpoint>
            </Fragment>
        )
    }
}

const SmallLayout = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
    background: white;
    border-top: 2px solid black;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    justify-content: center;
`;

const MediumLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    justify-content: center;
`;

const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
    text-align: center;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const NextArrow = styled(FaAngleRight)`
    font-size: 2em;
`;


const NewestArrow = styled(FaAngleDoubleRight)`
    font-size: 2em;
`;

const PrevArrow = styled(FaAngleLeft)`
    font-size: 2em;
`;

const OldestArrow = styled(FaAngleDoubleLeft)`
    font-size: 2em;
`;

const Title = styled.p`
    font-size: 2em;
    font-family: 'Indie Flower', cursive;
`;

const Image = styled.img`
    max-height: 60px;
`;



export default connect(
    ({ publicDoodles }) => ({ publicDoodles }),
    null
)(ComicNav);
