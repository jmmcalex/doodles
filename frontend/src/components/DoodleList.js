/**
 * frontend/src/components/Gallery.js
 * 
 * Overview: 
 * -- This component displays the a gallery of doodles
 * 
 * TODO: 
 * -- Connect this component to the store
 * -- Show loading bar upon every request
 * -- Implement infinite scrolling
 */

import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Doodle from './Doodle';
import { BACKEND } from '../config';
import {  
    Button,
    Grid,
    withStyles
} from '@material-ui/core';

const styles = theme => ({

});

class DoodleList extends Component {
    state = {
        doodles: [],
        per: 12,
        page: 1,
        outOfDoodles: false,
    };

    componentWillMount() {        
        this.loadDoodles();
    }

    loadDoodles = () => {
        const { per, page } = this.state;
        const url = `${BACKEND.ADDRESS}/doodle/?per=${per}&page=${page}`;
        axios(url)
            .then(({ data }) => {
                const outOfDoodles = data.doodles.length < per; 
                this.setState((prevState) => {
                    return ({
                        doodles: [...prevState.doodles, ...data.doodles],
                        page: prevState.page + 1,
                        outOfDoodles
                    })
                });
            })
            .catch(error => console.error(error));
    }

    loadMore = () => {
        this.loadDoodles();
    }

    render() {
        return(
            <Fragment>
                <Grid container spacing={40}>
                    {
                        this.state.doodles.map((doodle, index) => {
                            return (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                                    <Doodle
                                        title={doodle.title}
                                        postDate={doodle.postDate}
                                        filePath={doodle.filePath}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Button 
                    color="primary" 
                    variant="outlined"
                    onClick={this.loadMore}
                >
                    Load more doodles
                </Button>
            </Fragment>
        )
    }
};

export default withStyles(styles)(DoodleList);
