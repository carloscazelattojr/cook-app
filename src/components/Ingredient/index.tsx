import React from 'react';
import { Image, Pressable, PressableProps, Text } from 'react-native';

import { styles } from './styles';

export type IngredientsProps = {
    name: string;
    image: string;
    selected?: boolean;
}

export function Ingredient({ image, name, selected = false, ...rest }: IngredientsProps & PressableProps) {
    return (
        <Pressable style={[styles.container, selected && styles.selected]} {...rest}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{name}</Text>
        </Pressable>
    );
}