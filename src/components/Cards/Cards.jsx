// src/components/Cards/Cards.jsx
import './Cards.css';
import Types from '../Types/Types.jsx';
import shinySound from '/Audios/PokemonShiny.wav';

function Cards({ pokemons, toggleShiny }) {
  return (
    <div id="resultado">
      {pokemons.map(pokemon => {
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
  );
}

export default Cards;