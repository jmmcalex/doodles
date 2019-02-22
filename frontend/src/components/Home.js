import React, { Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    render() {
        return(
            <Fragment>
                <Redirect to="/comic/0"></Redirect>
            </Fragment>
        )
    }
}

export default Home;