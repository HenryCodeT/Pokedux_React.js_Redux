import react from "react";
import { Grid } from "semantic-ui-react";
import PokemonCard from './PokemonCard.js';
import './style.css';

const PokemonList = ({pokemons}) =>{
    return(
        <div className="wrapper">
            <Grid className="PokemonList">
                {pokemons.map((pokemon,index)=>(
                    <PokemonCard pokemon={pokemon} key={index}/>
                ))}
            </Grid>
        </div>
    );
}
PokemonList.defaultProps = {
    pokemons:[]
}
export default PokemonList;