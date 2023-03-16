
import { useState } from 'react'
import Counter from '../components/Counter'

export default function Home() {
    const [counters, setCounter] = useState([
        {
            title: 'Pushup Counter',
            intialCount: 10
        },
        {
            title: 'Situp Counter',
            intialCount: 100
        },
        {
            title: 'Squat Counter',
            intialCount: 504
        },
        {
            title: 'Laps Counter',
            intialCount: 26
        }

    ])



    return (
        <div className="App">

            {
                counters.map((counter) => <Counter title={counter.title} initialCount={counter.intialCount} />)
            }


        </div>
    );
}