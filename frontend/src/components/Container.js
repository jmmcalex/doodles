import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
          width: 1100,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      }
});

const Container = (props) => (
    <div className={props.classes.layout}>
        {props.children}
    </div>
);

export default withStyles(styles)(Container);