import React, {useState, useEffect} from 'react';

function HookMouseOver() {

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const logMousePos = e => {
        setX(e.clientX);
        setY(e.clientY);
    }

    useEffect(() => {
        window.addEventListener('mousemove', logMousePos);

        return () => {
            // cleanup code
            window.removeEventListener('mousemove', logMousePos);
        }
    }, []);

    return (
        <div>
            Co-ords: X - {x}, Y - {y}
        </div>
    );
}

export default HookMouseOver;