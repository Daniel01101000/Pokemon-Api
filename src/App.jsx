import { useEffect, useState } from 'react';
import { fetchPokemons } from './index.js';
import Header from './components/Header/Header.jsx';
import Types from './components/Types/Types.jsx';
import './index.css';
import PokemonLogo from '/PokemonLogo.png';
import shinySound from '/Audios/PokemonShiny.wav';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState('all');

  useEffect(() => {
    async function cargarPokemons() {
      const datos = await fetchPokemons();
      const datosConEstado = datos.map(p => ({ ...p, isShiny: false }));
      setPokemons(datosConEstado);
    }
    cargarPokemons();
  }, []);

  function toggleShiny(id) {
    setPokemons(prev => {
      const nuevos = [...prev];
      const index = nuevos.findIndex(p => p.id === id);
      if (index === -1) return prev;

      nuevos[index] = {
        ...nuevos[index],
        isShiny: !nuevos[index].isShiny
      };

      if (nuevos[index].isShiny) {
        const audio = new Audio(shinySound);
        audio.play();
      }

      return nuevos;
    });
  }

  const pokemonsFiltrados = tipoFiltro === 'all'
    ? pokemons
    : pokemons.filter(pokemon =>
        pokemon.types.includes(tipoFiltro)
      );

  return (
    <>
      <Header onFilterChange={setTipoFiltro} />
      <img src={PokemonLogo} alt="PokemonLogo" className='logo'/>

      <div id="resultado">
        {pokemonsFiltrados.map(pokemon => {
          const paddedId = String(pokemon.id).padStart(3, '0');

          const image = pokemon.isShiny
            ? pokemon.shinySprite
            : (pokemon.image ?? pokemon.sprites?.other?.['official-artwork']?.front_default ?? pokemon.sprites?.front_default ?? '');

          return (
            <div key={pokemon.id} className="pokemon">
              <h3>{pokemon.name || 'Unknown'}</h3>
              <img 
                src={image} 
                alt={pokemon.name || 'pokemon'}
                onClick={() => toggleShiny(pokemon.id)}
                style={{ cursor: 'pointer' }}
                onError={(e) => { e.target.src = pokemon.image; }}
              />
              <p>#{paddedId}</p>
              <Types types={pokemon.types || []} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;