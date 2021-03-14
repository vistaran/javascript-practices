import React, {useState , useEffect} from 'react';


function HookCounter() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')

    useEffect(() => {
        console.log("Rendered..");
        document.title = `You clicked ${count} times`
    }, []);

    return (
        <div>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button onClick={() => setCount(count + 1)}>Click {count} times</button>
        </div>
    );
}

export default HookCounter;