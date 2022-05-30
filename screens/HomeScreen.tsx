import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  Animated,
  Easing,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [text, setText] = useState<string>("");
  const navigation: any = useNavigation();
  let spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.container}>
      {text === "Ready!" && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PokemonListsScreen");
          }}
        >
          <Animated.Image
            style={{ transform: [{ rotate: spin }] }}
            source={require("../images/file-pokeball-png-0.png")}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>Are you ready to be a pokemon master?</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Type Ready! to get started"
        placeholderTextColor={"gray"}
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      {text !== "Ready!" && (
        <Text style={styles.warning}>I am not ready yet!</Text>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    marginBottom: 20,
  },
  inputText: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: "white",
    borderColor: "rgba(232, 232, 232, 1)",
  },
  warning: {
    color: "red",
    fontSize: 30,
  },
  logo: {
    transform: [{ rotate: "10 deg" }],
  },
});
