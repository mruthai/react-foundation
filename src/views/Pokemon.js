import { useState, useEffect, useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'

export default function Pokemon() {
    const [pokemonData, setPokemonData] = useState({})
    const [loadingState, setLoadingState] = useState("LOADING")
    const [pokemonId, setPokemonId] = useState(1)
    const [currSearch, setCurrSearch] = useState(1)
    const { getPokemonData } = useContext(DataContext)
    
    useEffect(() => {
        async function handleLoad () {
            const data = await getPokemonData(pokemonId)
            setPokemonData(data)
            setLoadingState("LOADED")
        }
        handleLoad()
       
    }, [pokemonId])

    
    function incrementPokemonId (incrementor) {
        setPokemonId(pokemonId + incrementor)
        setCurrSearch(pokemonId + incrementor)
        
    }
    function handleSearch(e) {
        e.preventDefault()
        setPokemonId(currSearch)
    }


  
   
    return (
        <div className="App">
            <h1>Pokemon</h1>
            <form onSubmit={(e) => handleSearch(e) }>
                <input type="number" name="id" id="id" min={1} max={1010} value={currSearch} onChange={(e) => setCurrSearch(parseInt(e.target.value)) }/>
                <button>Search</button>
            </form>
            {
                (loadingState === "LOADING") ?
                <p>Loading...</p> :
                <div className="pokemon">
                    <img src={pokemonData.sprites.front_default} alt="" />
                    <h2>{pokemonData.name}</h2>
                    {
                        (pokemonId > 1) ?
                        <button onClick={ () => incrementPokemonId(-1)}>Previous</button> :
                        <></>

                    }
                    <button onClick={ () => incrementPokemonId(1)}>Next</button>
                </div>
            }
            
        </div>
    )

}
