export async function fetchPokemons() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();

  const detalles = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();

      return {
        id: details.id,
        name: details.name,
        image: details.sprites.front_default,
        shinySprite: details.sprites.front_shiny,
        sprites: details.sprites,
        types: details.types.map(t => t.type.name),
      };
    })
  );

  return detalles;
}