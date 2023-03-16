// function that renders HTML when we put into page || Only 1 <div> element as the parent!

import { useState } from "react"

export default function Counter(props) {
    console.log(props)
    const [ count, setCount ] = useState(props.initialCount || 0)
    // console.log('test')
    
    // const [title] = useState(props.title || 'My Counter')
    

    

    function increment (incrementor) {
        setCount(count + incrementor)
        console.log('test count')
    }
    
    // function decrement () {
    //     if (count > 0)
    //     setCount(count - 1)
    //     console.log('test decrement')
        
    // }

    function conditionalButton () {
        if (count > 0) {
            return (
                <button onClick={ () => increment(-1) }>Decrement</button>
            )
        } else {
            return (
                <p> you can't decrement</p>
            )
        }
    }
    // call function in the div { conditionButton()}

    return (
        <div>
            <h2> { props.title || 'My Counter' } </h2>
            Count: { count }
            <div>
                <button onClick={ () => increment(1) }>Increment</button>
                {
                (count > 0) ?
                <button onClick={ () => increment(-1) }>Decrement</button>
                :
                <></>
                }
            
                <button onClick={ () => increment(5) }>Add 5</button>
            </div>
        </div>
    )

}

