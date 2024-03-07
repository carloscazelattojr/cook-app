import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import { services } from '@/service';

import { styles } from './styles';
import { Ingredient } from '@/components/Ingredient';
import { Selected } from '@/components/Selected';
import { router } from 'expo-router';

export default function Index() {

    const [selected, setSelected] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

    function handleToggleSelected(value: string) {
        if (selected.includes(value)) {
            return setSelected((state) => state.filter((item) => item !== value));
        }
        setSelected((state) => [...state, value]);
    }

    function handleClearSelected() {
        Alert.alert("Limpar", "Deseja limpar tudo ?", [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: () => setSelected([]) }
        ])
    }

    function handleSearch() {
        router.navigate("/reciples/" + selected);
    }

    useEffect(() => {
        services.ingredients.findAll().then(setIngredients);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Escolha {"\n"}
                <Text style={styles.subtitle}>os produtos</Text>
            </Text>

            <Text style={styles.message}>Descubra receitas basaeada nos produtos que você escolheu</Text>

            <ScrollView
                contentContainerStyle={styles.ingredients}
                showsVerticalScrollIndicator={false}
            >
                {
                    ingredients.map((item, index) => (
                        <Ingredient
                            key={item.id}
                            name={item.name}
                            image={`${services.storage.imagePath}/${item.image}`}
                            selected={selected.includes(item.id)}
                            onPress={() => handleToggleSelected(item.id)}
                        />
                    ))
                }
            </ScrollView>

            {selected.length > 0 && (
                <Selected
                    quantity={selected.length}
                    onClear={handleClearSelected}
                    onSearch={handleSearch}
                />)
            }
        </View>
    );
}