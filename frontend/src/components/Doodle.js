import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardMedia,
    Hidden,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { BACKEND } from '../config';

const styles = theme => ({
    card: {
        height: 415,
        width: 320,
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        height: 'auto',
        maxHeight: 250,
        width: 'auto',
        maxWidth: 250,
        paddingTop: '56.25%',
        overflow: 'hidden',
    },
    cardContent: {
        flexGrow: 1,
    }
});

class Doodle extends Component {
    state = { 
    };

    render() {
        return(
            <Fragment>
                <Card className={this.props.classes.card}>
                    <CardHeader 
                        title={this.props.title}
                        subheader={this.props.postDate}
                    />
                    <CardMedia 
                        className={this.props.classes.cardContent}
                        style={{ width: 300 }}
                        title='sample doodle'
                        component="img"
                        image={`${BACKEND.ADDRESS}${this.props.filePath}`}
                    />
                </Card>
            </Fragment>
        )
    }
}

export default withStyles(styles)(Doodle);