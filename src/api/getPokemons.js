import axios from '../services/axios';

export const getPokemons = (limit = 151) =>
  axios
    .get(`/pokemon?limit=${limit}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));

export const getPokemonWithDetails = () => {
  return getPokemons()
    .then((res) => {
      const pokemonList = res.results;
      return Promise.all(pokemonList.map((pokemon) => axios.get(pokemon.url)));
    })
    .then((pokemonsReponse) => {
      const pokemonData = pokemonsReponse.map((response) => response.data);
      return pokemonData;
    });
};