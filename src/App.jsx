import { useEffect, useState } from 'react';
import { fetchPokemons } from './index.js';
import Header from './components/Header/Header.jsx';
import Cards from './components/Cards/Cards.jsx';
import './index.css';
import PokemonLogo from '/Images/PokemonLogo.png';
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
      <img src={PokemonLogo} alt="PokemonLogo" className='logo' />
      <Cards pokemons={pokemonsFiltrados} toggleShiny={toggleShiny} />
    </>
  );
}

export default App;