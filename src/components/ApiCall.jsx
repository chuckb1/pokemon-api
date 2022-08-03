// import './App.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useEffect, useState } from 'react';

const ApiCall = props => {
    const [pokemon, setPokemon] = useState(null);
    const [inputPokemon, setInputPokemon] = useState("");
    const [apiPokemon, setApiPokemon] = useState("charmander");
    const [error, setError] = useState(null);
    const [getAllPokemon, setGetAllPokemon] = useState([]);
    const [pokeVisibility, setPokeVisibility] = useState(false);
    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon/" + apiPokemon)
            .then(res=>setPokemon(res.data))
            .catch(err => setError(err))
    }, [pokemon])
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000000")
            .then(response => response.json())
            .then(response => setGetAllPokemon(response.results))
    }, [])
    //^ This is called a dependency array, any time something in that array changes it triggers useEffect, if you forget this it will call infinitely which is very bad
    
    const fetchPokemon = e => {
        e.preventDefault();
        setApiPokemon(inputPokemon);
    }

    const showPokemonList = () => {
        setPokeVisibility(true)
    }
    
    return(
        <div>
            <div>
                <h2>My API Call</h2>
                <input type="text" name="newPokemon" onChange={(e) => setInputPokemon(e.target.value)}/>
                <input type="submit" value="Fetch Pokemon" onClick={fetchPokemon} />
                <br />
                {
                    error ? <h3>Error, Please try again</h3> : pokemon ? <> 
                    <img src={pokemon.sprites.front_default} alt="sprite"/>
                    <h2>My Pokemon: {pokemon.name} </h2>
                    </> : ""
                }
            </div>
            <div>
                <button onClick={showPokemonList}>Get all the Pokemon</button>
            </div>
            <div>
                {
                    pokeVisibility ? <>{getAllPokemon.length > 0 && getAllPokemon.map((poke, index)=>{
                    return (<div key={index}>{poke.name}</div>) 
                })} </> : ""
                }
            </div>
        </div>
    )
}

export default ApiCall;