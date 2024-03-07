import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Recipe } from '@/components/Recipe';
import { services } from '@/service';
import { Ingredients } from '@/components/Ingredients';

export default function Reciples() {

    const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
    const [recipes, setRecipes] = useState<RecipeResponse[]>([]);

    const params = useLocalSearchParams<{ ingredientsIds: string }>();
    const ingredientsIds = params.ingredientsIds.split(',');

    useEffect(() => {
        services.ingredients.findByIds(ingredientsIds).then(setIngredients);
    }, []);

    useEffect(() => {
        services.recipes.findByIngredientsIds(ingredientsIds).then(setRecipes);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons
                    name="arrow-back"
                    size={32}
                    onPress={() => router.back()}
                />
                <Text style={styles.title}>Ingredientes</Text>

            </View>

            <Ingredients ingredients={ingredients} />

            <FlatList
                data={recipes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Recipe
                        recipe={item}
                        onPressOut={() => router.navigate("/recipe/" + item.id)}
                    />
                )}
                style={styles.recipes}
                contentContainerStyle={styles.recipesContent}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ gap: 16 }}
                numColumns={2}
            />
        </View>
    );
}