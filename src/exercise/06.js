// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
  PokemonForm
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [ state, setState ] = React.useState({
    pokemon: null,
    status: null,
    error: null
  }) 

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: null})
    fetchPokemon(pokemonName)
      .then(pokemonData => setState({pokemon: pokemonData}))
      .catch(errorData => setState({error: errorData}))
  },[pokemonName])  

  if (state.error) {
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    )
  }

  if (!pokemonName) {
    return 'Enter a name'
  } else if (!state.pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={state.pokemon} />
  }

}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
