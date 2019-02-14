import React, { Component } from 'react';
import styled from 'styled-components';
import { FaCaretSquareUp } from 'react-icons/fa';

class ScrollButton extends Component {
  constructor() {
    super();

    this.state = {
        intervalId: 0
    };
  }
  
  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }
  
  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }
  
  render () {
      return (
        <Button title='Back to top' className='scroll' 
                onClick={ () => { this.scrollToTop(); }}>
          <UpArrow/>
        </Button>
      )
    }
} 


const Button = styled.button`
  opacity: 1.0;
  background-color: black;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 30px;
  right: 10px;
  border-radius: 5px;
  border: none;

  &:hover {
    opacity: 1;
  }
`;

const UpArrow = styled(FaCaretSquareUp)`
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -13px;
  font-size: 2em;
`;

// <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
export default ScrollButton;