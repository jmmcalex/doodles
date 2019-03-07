import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { BACKEND } from '../../config';
import { setCurrentIndex } from '../../actions/publicDoodles';
import ComicNav from './ComicNav';

const Main = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(30px, 1fr) minmax(200px, 500px) minmax(30px, 1fr);
    grid-template-areas: ". main ." ;
`;

const ComicDisplay = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: main;
`;

const Image = styled.img`
    width: 100%;
    background: white;
    border: 3px solid black;
    box-shadow: 2px 2px 2px #fbc2a9; 
    border-radius: 2%;
`;



class Comic extends Component{ 
    render() {
        const { index } = this.props.match.params;
        console.log('index', index);
        if (index < 0 || index > this.props.publicDoodles.endIndex){
            return(
                <Redirect to="/"/>
            )
        }
        const { title, filePath } = this.props.publicDoodles.doodles[index];
        return (
            <Main>
            {
                <ComicDisplay>
                    <Image src={`${BACKEND.ADDRESS}${filePath}`}/>
                    <ComicNav index={index} title={title}/>
                </ComicDisplay>
            }
            </Main>
        )
    }
}

export default connect(
    ({ publicDoodles }) => ({ publicDoodles }),
    { setCurrentIndex }
)(Comic);