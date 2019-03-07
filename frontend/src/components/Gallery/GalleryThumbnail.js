import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

import { BACKEND } from '../../config';
import { deleteDoodle } from '../../actions/publicDoodles';

class GalleryThumbnail extends Component {
    state = {
        redirect: false,
    };

    redirect = () => {
        this.setState({ redirect: true })
    };

    
    get Thumbnail() {
        const { doodle } = this.props;
        if (!this.props.editEnabled){
            return (
                <Wrapper> 
                    <Thumbnail
                        src={`${BACKEND.ADDRESS}${doodle.filePath}`}
                        onClick={this.redirect}
                    />
                </Wrapper>
            )
        } else {
            return (
                <TrashWrapper>
                    <Thumbnail
                        src={`${BACKEND.ADDRESS}${doodle.filePath}`}
                        onClick={() => this.props.deleteDoodle(doodle.id)}
                    />
                    {/* <Trash /> */}
                </TrashWrapper>
            )
        }
    };
    

    render() {
        const { doodle, index } = this.props;
        if (this.state.redirect){
            return(
                <Redirect push to={{
                    pathname: `/comic/${index}/${doodle.title}`,
                }}/>
            ) 
        }

        return (
            <Fragment>
                { this.Thumbnail } 
            </Fragment>
        )
    };
}; 


const Wrapper = styled.div`
    border: 3px solid black;
    box-shadow: 4px 4px 4px #fbc2a9; 
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 2%;
    transition: transform .8s ease-in-out;

    :hover {
        transform: rotate(2deg);
    }
`;

const TrashWrapper = styled(Wrapper)`
    :hover {
        opacity: 0.3;
        filter: grayscale(100%);
    }
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
`;

const Trash = styled(FaTrash)`
    font-size: 2em;
`;

export default connect(
    null,
    { deleteDoodle },
)(GalleryThumbnail);