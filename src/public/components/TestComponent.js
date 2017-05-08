import React, {Component} from 'react';
import io from 'socket.io-client';

class TestComponent extends Component {
    componentWillMount() {
        var testSocket = io();
    }
    render() {
        return (
            <div>
                <h1 className="jumbotron test-class">Dolph's NodePong</h1>
                <p>React, Redux and React Router in ES6 for ultra-responsive web apps.</p>
            </div>
        );
    }
}
export default TestComponent;
