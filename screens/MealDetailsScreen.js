import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorite";

const MealDetailsScreen = ({ route, navigation }) => {
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const mealDetailsProp = {
    duration: selectedMeal.duration,
    complexity: selectedMeal.complexity,
    affordability: selectedMeal.affordability,
  };

  const mealIsFavorite = favoriteMealIds.includes(mealId);

  const changeFavoriteStatusHandler = () => {
    if (mealIsFavorite) {
      dispatch(removeFavorite({ id: mealId }));
    } else {
      dispatch(addFavorite({ id: mealId }));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, mealIsFavorite]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails {...mealDetailsProp} textStyle={styles.detailText} />
      <View style={styles.listOuterContainer}>
        <View style={styles.listConatiner}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },

  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    margin: 8,
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listConatiner: {
    width: "80%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
});
