import React from 'react';
import Animated, { SlideInDown, BounceOutDown } from 'react-native-reanimated';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

import { styles } from './styles';
import { theme } from '@/theme';
import { Button } from '../Button';

type Props = {
    quantity: number;
    onClear: () => void;
    onSearch: () => void;
}

export function Selected({ onClear, onSearch, quantity }: Props) {
    return (
        <Animated.View
            style={styles.container}
            entering={SlideInDown.duration(500)}
            exiting={BounceOutDown} >
            <View style={styles.header}>
                <Text style={styles.label}>{quantity} ingredientes selecionados</Text>
                <MaterialIcons name='close' size={24} onPress={onClear} color={theme.colors.gray_400} />
            </View>
            <Button title='Encontrar' onPress={onSearch} />
        </Animated.View>
    );
}