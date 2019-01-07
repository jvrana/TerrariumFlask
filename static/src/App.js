import React, { Component } from 'react'
import Navigation from "./components/Navigation";

class App extends Component { // eslint-disable-line react/prefer-stateless-function


    render() {
        return (
                <section>
                  <Navigation />
                        {this.props.children}
                </section>
        );
    }
}

export default App;