import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";
import Modal from "../components/Modal";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { selectModalOpen, setIsModalOpen } from "../slices/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "react-native-elements";

const PokemonListsScreen = () => {
  interface Pokemons {
    name: string;
    url: string;
  }
  interface PokemonDetail {
    types: [
      {
        slot: number;
        type: {
          name: string;
          url: string;
        };
      }
    ];
    sprites: {
      front_default: string;
    };
    name: string;
    stats: [
      {
        base_stat: number;
      }
    ];
  }

  // Const
  const isModalOpen = useSelector(selectModalOpen);
  const dispatch = useDispatch();

  // States
  const [pokemons, setPokemons] = useState<Pokemons[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<PokemonDetail>();
  const [text, setText] = useState<string>();
  const [arrayHolder, setArrayHolder] = useState<Pokemons[]>();

  // Functions
  const fetchData = async () => {
    setIsLoading(true);
    await axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        setPokemons(res.data.results);
        setArrayHolder(res.data.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPokemon = async (url: any) => {
    setIsLoading(true);
    await axios
      .get(url)
      .then((res: any) => {
        setDetails(res.data);
        dispatch(setIsModalOpen(true));
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  if (isLoading) {
    return (
      <Image
        style={{
          width: 250,
          height: 250,
          marginLeft: 10,
          flex: 1,
        }}
        source={{
          uri: "../assets/1_9EBHIOzhE1XfMYoKz1JcsQ.gif",
        }}
      />
    );
  }

  const searchFilterFunction = (text: any) => {
    const newData = arrayHolder?.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setPokemons(newData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome To Pokedex!</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Search..."
          placeholderTextColor={"gray"}
          onChangeText={(text) => searchFilterFunction(text)}
          defaultValue={text}
          autoCorrect={false}
        />
        <FlatList
          data={pokemons}
          renderItem={(item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  fetchPokemon(item.item.url);
                }}
              >
                <View style={{ marginVertical: 20 }}>
                  <Text style={styles.pokemonList}>{item.item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {isModalOpen && <Modal values={details} />}
    </SafeAreaView>
  );
};

export default PokemonListsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingVertical: 60,
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    color: "white",
    marginBottom: 40,
  },
  loadingIcon: {
    textAlign: "center",
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
  // listContainer: {
  //   backgroundColor: "red",
  //   flex: 1,
  //   marginHorizontal: 0,
  //   paddingHorizontal: 0,
  // },
  pokemonList: {
    color: "gray",
    fontSize: 40,
    textAlign: "center",
  },
});
