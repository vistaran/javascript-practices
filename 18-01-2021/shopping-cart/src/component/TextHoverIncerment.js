import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextHoverIncerment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { count , incrementCount } = this.props;
        return (
            <div>
                <h2 onMouseMove={incrementCount}>
                    Clicked {count} times
                </h2>
            </div>
        );
    }
}

TextHoverIncerment.propTypes = {

};

export default TextHoverIncerment;