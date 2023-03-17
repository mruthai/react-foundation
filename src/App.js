import logo from './logo.svg';
import './App.css';
// import Counter from './components/Counter'
import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home'
import About from './views/About'
import Contact from './views/Contact'
import Pokemon from './views/Pokemon'
import PostSingle from './views/PostSingle'
import { AuthContext } from './contexts/AuthProvider'

function App() {
  const { login, user, logout } = useContext(AuthContext)
  console.log(user)


  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link> </li>
          <li><Link to="/about">About</Link> </li>
          <li><Link to="/contact">Contact</Link> </li>
          <li><Link to="/pokemon">Pokemon</Link> </li>
        </ul>
      </nav>
      <div>
        {
          (user.loggedIn) ?
            <>
              <button onClick={logout}> Logout</button>
              <p>Current User: {user.displayName}</p>

            </> :
            <button onClick={login}> Login</button>
        }
        {/* user.displayName --> display name is found in metadata when you console.log(user) */}
      </div>
      <div>

      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/post/:uid/:id" element={<PostSingle />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App;

// const [counters, setCounter] = useState ([
  //   {
  //     title: 'Pushup Counter',
  //     intialCount: 10
  //   },
  //   {
  //     title: 'Situp Counter',
  //     intialCount: 100
  //   },
  //   {
  //     title: 'Squat Counter',
  //     intialCount: 504
  //   },
  //   {
  //     title: 'Laps Counter',
  //     intialCount: 26
  //   }

  // ])



  // return (
  //   <div className="App">
  //     {/* <Counter title={'Pushup Counter'} initialCount={10}/>
  //     <Counter title={'Situp Counter'}/>
  //     <Counter title={'Squat Counter'} initialCount={200}/>
  //     <Counter />
  //      Tied not tied with function above*/}

  //      {
  //         counters.map((counter) => <Counter title={counter.title} initialCount={counter.intialCount}/>)
  //      }


  //   </div>
  // );