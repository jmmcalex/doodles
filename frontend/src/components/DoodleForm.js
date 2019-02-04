/**
 * frontend/src/components/DoodleForm.js
 * Overview:
 * -- This component contains the form to upload new
 *    doodles to the server.
 * 
 * TODO: 
 * -- Form validation needs to occur both here and serverside  
 */

import React, { Component, Fragment } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { uploadDoodle } from '../actions/doodle';

class DoodleForm extends Component {
    state = { 
        title: '', 
        doodleFile: null,
        submitted: false 
    }

    updateTitle = (event) => {
        const title = event.target.value;
        this.setState({ title })
    }

    updateDoodleFile = (event) => {
        const doodleFile = event.target.files[0];
        this.setState({ doodleFile });
    }

    submitDoodle = () => {
        this.setState({ submitted: true })
        const { title, doodleFile } = this.state;
        this.props.uploadDoodle({ title, doodleFile });
        this.setState({ title: '', doodleFile: null })
    }

    render() {
        return(
            <Fragment>
                <Link to="/">
                    <Button>Home</Button>
                </Link>
                <h1>Upload Doodle</h1>
                <FormGroup>
                    <FormControl
                        type='text'
                        value={this.state.title}
                        placeholder='Enter title of doodle'
                        onChange={this.updateTitle}
                    />
                    <FormControl
                        type='file'
                        label='Doodle Image'
                        help='Select the doodle image to upload'
                        onChange={this.updateDoodleFile}
                    />
                </FormGroup>
                <Button onClick={this.submitDoodle}>Submit</Button>
            </Fragment>
        );
    }
}


export default connect(
    ({ doodle }) => ({ doodle }),
    { uploadDoodle }
)(DoodleForm);