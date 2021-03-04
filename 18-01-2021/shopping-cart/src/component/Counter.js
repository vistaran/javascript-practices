import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    increment = () => {
        this.setState(prevState => {
            return { count: prevState.count + 1 }
        })
    }

    render() {
        return (
            <div>
                {this.props.render(this.state.count, this.increment)}
            </div>
        );
    }
}

Counter.propTypes = {

};

export default Counter;