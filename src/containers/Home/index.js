import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Searcher from '../../components/Searcher';
import PokemonList from '../../components/PokemonList';
import { getPokemons } from '../../api/getPokemons';
import { setPokemons, setError } from '../../actions';
import './styles.css';
import axios from 'axios';

function Home() {
  const pokemons = useSelector((state) => state.list);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, []);

  return (
    <div className='Home'>
      <Searcher />
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

export default Home;
