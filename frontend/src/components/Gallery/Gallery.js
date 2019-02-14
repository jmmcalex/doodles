import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import GalleryThumbnail from './GalleryThumbnail';
import ScrollButton from '../ScrollButton';
import { fetchPublicDoodles, deleteDoodle } from '../../actions/publicDoodles';


class Gallery extends Component {
    state = {
        editEnabled: false
    }

    componentDidMount() {
        this.props.fetchPublicDoodles();
    }

    toggleEdit = () => {
        this.setState( prevState => ({ 
            editEnabled: !prevState.editEnabled
        }));
    }

    get EditButton() {
        if (this.props.account.loggedIn && !this.state.editEnabled){
            return (
                <Fragment>
                    <Button onClick={this.toggleEdit}>Delete Doodles</Button>
                    <br/>
                </Fragment>
            )
        } else if (this.props.account.loggedIn && this.state.editEnabled){
            return (
                <Fragment>
                    <Button onClick={this.toggleEdit}>Done Deleteing</Button>
                    <br/>
                </Fragment>
            )
        }
    }

    render() {
        const { doodles } = this.props.publicDoodles;
        return (
            <Layout>
                { this.EditButton }
                <Grid>
                { doodles.map((doodle, index) => {
                    return (                        
                        <GalleryThumbnail 
                            key={index}
                            index={index}
                            doodle={doodle}
                            editEnabled={this.state.editEnabled}
                        />
                    );
                })}
                </Grid>
                <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
            </Layout>
        )
    }
};

const Button = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    display: block;
    position: relative;
    background: #fcad26;
    font-size: 16px;
    font-weight: 300;
    color: white;
    text-transform: none;
    font-family: 'Indie Flower', cursive;
    letter-spacing: 2px;
    padding: 25px 80px;
    margin: 0 auto;
    box-shadow: 0 6px #efa424;
    border-radius: 20px;
    
    :hover {
        box-shadow: 0 4px #efa424;
        top: 2px;
    }

    :active {
        box-shadow: 0 0 #efa424;
        top: 6px;
    }
`;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    padding-right: 10px;
`;

const Grid = styled.main`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 200px;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
`;

export default connect(
    ({ account, publicDoodles }) => ({ account, publicDoodles }),
    { fetchPublicDoodles, deleteDoodle }
)(Gallery);


