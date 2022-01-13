import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
    const [pokemonList, setPokemonList] = useState<SimplePokemon[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const mapResult2SimplePokemonList = (resultList:Result[]) => {

        const newPokemonList: SimplePokemon[] = resultList.map(({name, url}) => {
            const urlParts:string[] = url.split('/');
            const id:string = urlParts[urlParts.length - 2];
            const picture:string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            return {id, name, picture};
        });
        setPokemonList([ ...pokemonList, ...newPokemonList ]);
        setIsLoading(false);
    }

    const loadPokemons = async() => {
        setIsLoading(true);
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current); 
        nextPageUrl.current = resp.data.next;
        mapResult2SimplePokemonList(resp.data.results);
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        isLoading,
        pokemonList,
        loadPokemons
    }
    
}