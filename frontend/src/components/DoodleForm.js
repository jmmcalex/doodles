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
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { uploadDoodle } from '../actions/doodle';
import { fetchPublicDoodles } from '../actions/publicDoodles';

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
        console.log('submitting doodle');
        this.setState({ submitted: true })
        const { title, doodleFile } = this.state;
        this.props.uploadDoodle({ title, doodleFile });
    }

    get Status() {
        if(this.state.submitted && !this.props.doodle.uploading){
            return <h6>Upload Successful</h6>
        } else if (this.state.submitted && this.props.doodle.uploading){
            return <h6>Upload Error</h6>
        } else {
            return <Fragment></Fragment>
        }
    }

    render() {
        return(
            <Fragment>
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
                {this.Status}
            </Fragment>
        );
    }
}


export default connect(
    ({ doodle }) => ({ doodle }),
    { uploadDoodle, fetchPublicDoodles }
)(DoodleForm);