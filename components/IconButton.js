import { Pressable, StyleSheet } from "react-native";
import Ionicans from "@expo/vector-icons/Ionicons";

const IconButton = ({ icon, color, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicans name={icon} size={24} color={color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
