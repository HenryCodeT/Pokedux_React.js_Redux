import axios from 'axios';
import { getPokemons } from '../api/getPokemons';


import { SET_POKEMONS, SET_ERROR, CLEAR_ERROR } from './types';

export const setPokemons = (payload) => ({
    type: SET_POKEMONS,
    payload,
});

export const setError = (payload) => ({
    type: SET_ERROR,
    payload,
});

export const clearError = (payload) => ({
    type: CLEAR_ERROR,
    payload,
});


export const getPokemonWithDetails = () => (dispatch) =>{
  getPokemons()
      .then((res) => {
        console.log(res);
        const pokemonList = res.results;
        return Promise.all(
        pokemonList.map((pokemon) => axios.get(pokemon.url))
        )
      })
      .then(pokemonsResponse => {
        console.log(pokemonsResponse);
        const pokemonData = pokemonsResponse.map(response => response.data);
        console.log(pokemonData);
        dispatch(setPokemons(pokemonData));
      })
      .catch((error) => {
        dispatch(setError({ message: 'Ocurrió un error' , error}));
      });
};