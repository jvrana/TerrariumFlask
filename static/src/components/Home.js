import React from 'react'
import {Button, Jumbotron} from "react-bootstrap";

const Home = () => (
    <Jumbotron>
        <h1>Welcome!</h1>
        <p>This is a jumbo welcome message</p>
        <Button variant="primary">Learn more</Button>
    </Jumbotron>
);

export default Home