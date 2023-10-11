import React from 'react';
import { Container } from 'reactstrap';


function Layout(props) {
    return (
        <div className="root-layout">
            <Container tag="main">
                {props.children}
            </Container>
        </div>
    );
}

export default Layout;
