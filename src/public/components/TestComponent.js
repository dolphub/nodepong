import React, {Component} from 'react';
import io from 'socket.io-client';

// TODO: Find a better way to get the appropriate port
const PORT = 3001;

class TestComponent extends Component {
    componentWillMount() {
        const { protocol, hostname } = window.location;
        var testSocket = io(`${protocol}//${hostname}:${PORT}`);
    }
    render() {
        return (
            <div>
                <h1 className="jumbotron test-class">Dolph's NodePong</h1>
                <p>React, Redux and React Router in ES6 for ultra-responsive web apps!</p>
            </div>
        );
    }
}
export default TestComponent;
