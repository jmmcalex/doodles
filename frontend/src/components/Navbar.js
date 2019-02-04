import React from "react";
import { 
    AppBar, 
    Tab,
    Tabs,
    Toolbar, 
    Typography,
    withStyles,
} from "@material-ui/core";
import { ColorLens } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const styles = theme => ({
    header: {
        marginRight: '2em',
    },
    nav: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    navItems: {
        marginRight: '1em',
        marginLeft: '1em'
    },
});


const Navbar = (props) => (
    <AppBar position="static">
        <Toolbar variant="dense">
            <ColorLens />
            <Typography 
                variant="title" 
                color="inherit"
                className={props.classes.header}            
            >
                Danielley's Doodles
            </Typography>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                <Tab style={{ fontSize: ".75em", textTransform: 'none' }} label="Home" />
            </Link>
            <Link to='/gallery' style={{ textDecoration: 'none', color: 'white' }}>
                <Tab style={{ fontSize: ".75em", textTransform: 'none' }} label="Gallery" />
            </Link>
        </Toolbar>
    </AppBar>
)


export default withStyles(styles)(Navbar);