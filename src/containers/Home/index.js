import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Searcher from '../../components/Searcher';
import PokemonList from '../../components/PokemonList';
import { fetchPokemons, setError } from '../../actions';
import './styles.css';
import { getPokemons } from '../../api/getPokemons';

function Home() {
  const pokemons = useSelector((state) => state.list);
  const dispatch = useDispatch();

  useEffect(() => {
    getPokemons()
      .then((res) => {
        dispatch(fetchPokemons(res.results));
      })
      .catch((error) => {
        dispatch(setError({ message: 'Ocurrió un error', error }));
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
