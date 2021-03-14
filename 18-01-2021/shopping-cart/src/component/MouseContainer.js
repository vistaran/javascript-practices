import React, { useState } from 'react';
import HookMouseOver from './HookMouseOver';

function MouseContainer(props) {
    const [display, setDisplay] = useState(true);
    return (
        <div>
            <button onClick={() => setDisplay(!display)}>Toggle Display</button>        

            {display && <HookMouseOver />}
        </div>
    );
}

export default MouseContainer;