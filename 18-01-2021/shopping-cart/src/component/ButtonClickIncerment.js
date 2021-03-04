import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonClickIncerment extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const { count, incrementCount } = this.props;
        return (
            <div>
                <button type="button" class="btn btn-primary" onClick={incrementCount} >Clicked {count} times</button>
            </div>
        );
    }
}

ButtonClickIncerment.propTypes = {

};

export default ButtonClickIncerment;