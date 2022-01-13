import React from 'react'
import { View, Text } from 'react-native'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

export default function PokemonCard(pokemon: SimplePokemon) {
    return (
        <View>
            <Text>{pokemon.name}</Text>
        </View>
    )
}
