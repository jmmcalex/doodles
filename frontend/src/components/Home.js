import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { BACKEND } from '../config';


class Home extends Component {
    state = {
        redirect: false,
        selected: null,
    }

    setSelected = (target) => {
        this.setState({ selected: target, redirect: true });
    }

    render() {

        const slideImages = this.props.publicDoodles.doodles.map(doodle => {
            return `${BACKEND.ADDRESS}${doodle.filePath}`
        })

        if (this.state.redirect){
            return(
                <Redirect push to={{
                    pathname: `/comic/${this.state.selected}`,
                }}/>
            ) 
        }
        return(
            <Layout>
                <H1>Welcome To Danielley's Doodles!</H1>
                <H3>A collection of comics and art by Danielle</H3>
                <Carousel 
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={true}
                    useKeyboardArrows
                    autoPlay interval={6500} infiniteLoop
                    onClickItem={(e) => this.setSelected(e)}
                >
                    <Image src={slideImages[0]} />               
                    <Image src={slideImages[1]} />               
                    <Image src={slideImages[2]} />                           
                </Carousel>
                <H4>Recent comics</H4>
            </Layout>
        )
    }
}

const H1 = styled.h1`
    font-family: 'Indie Flower', cursive;
    text-align: center;
    /* font-size: 2.3em; */
`

const H3 = styled.h3`
    font-family: 'Indie Flower', cursive;
    text-align: center;
    /* font-size: 2.3em; */
`
const H4 = styled.h3`
    font-family: 'Indie Flower', cursive;
    text-align: center;
    /* font-size: 2.3em; */
`

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    padding: 15px;
    max-width: 550px;
`

const Image = styled.img`
    /* background: #f6dace;  */
    background: white;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    
`

export default connect(
    ({ publicDoodles }) => ({ publicDoodles }),
    null
)(Home);