import React, { Fragment } from 'react';
import styled from 'styled-components';

const Layout = (props) => (
    <Main>
        {props.children}
    </Main>
);

const Main = styled.div`
    margin-top: 60px;
`;

export default Layout;