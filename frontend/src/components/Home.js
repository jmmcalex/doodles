import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Paragraph = styled.p`
    font-family: 'Indie Flower', cursive;
    font-size: 3em;
    
`

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 3em;
    margin-right: 3em;
`

class Home extends Component {
    render() {
        return(
            <Layout>
                <Paragraph>Welcome To Danielleys Doodles! Just a collection of comics and art pieces by Danielle Abraham.</Paragraph>
                <Link to='/gallery'>Check out my Gallery!</Link>
            </Layout>
        )
    }
}

export default Home;