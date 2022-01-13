import React from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';

import { styles } from '../theme/Theme';
import { FadeInImage } from '../components/FadeInImage';

export default function HomeScreen() {
    const { top } = useSafeAreaInsets();
    const {loadPokemons, pokemonList} = usePokemonPaginated();

    // console.log(pokemonList);

    return (
        <>
            <Image 
                source={ require('../assets/pokebola.png') }
                style={styles.pokebolaBG}
            />

            <FlatList
                showsVerticalScrollIndicator={false}
                data={pokemonList}
                keyExtractor={( pokemon ) => pokemon.id}
                renderItem={( {item} ) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 10,
                            
                        }}
                    >
                        <FadeInImage
                            uri={item.picture}
                            style={{
                                height: 100,
                                width: 100,
                            }}
                        />
                        <View
                            style={{
                                flex:1,
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize:30,
                                    fontWeight: 'bold',
                                    color: 'blue',
                                    margin:10,
                                }}
                            >
                                {item.name}
                            </Text>

                        </View>
                    </View>
                )}
                onEndReached={loadPokemons}
                onEndReachedThreshold={0.4}

                ListFooterComponent={(
                    <ActivityIndicator
                        style={{
                            height: 200
                        }}
                        size={50}
                    />
                )}

            />

            {/* <Text
                style={[
                    styles.title, 
                    styles.globalMargin,
                    {top: top + 20},
                ]}
            >
                Pokedex
            </Text> */}

        </>
    )
}
