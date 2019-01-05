import React from 'react';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

    render() {
        return (
            <section>
                    {this.props.children}
            </section>
        );
    }
}

export { App };
