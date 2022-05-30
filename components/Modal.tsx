import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { setIsModalOpen } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import { PieChart } from "react-native-chart-kit";

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
let color;
const Modal = ({ ...values }) => {
  const dispatch = useDispatch();
  console.log(values);
  if (
    values.values.types[0].type.name === "bug" ||
    values.values.types[0].type.name === "grass"
  ) {
    color = "green";
  } else if (values.values.types[0].type.name === "fire") {
    color = "red";
  } else if (values.values.types[0].type.name === "water") {
    color = "blue";
  } else {
    color = "gray";
  }
  const data = [
    {
      name: "HP",
      population: values.values.stats[0].base_stat,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Attack",
      population: values.values.stats[1].base_stat,
      color: "#F60",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Defense",
      population: values.values.stats[2].base_stat,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Special Attack",
      population: values.values.stats[3].base_stat,
      color: "#F90",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Special Defense",
      population: values.values.stats[4].base_stat,
      color: "rgb(0, 255, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Speed",
      population: values.values.stats[5].base_stat,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <SafeAreaView style={styles.modalContainer}>
      <View style={[{ backgroundColor: color }, styles.modal]}>
        <View style={styles.innerModal}>
          <View style={styles.image}>
            <Image
              style={{
                width: 250,
                height: 250,
                marginLeft: 10,
              }}
              source={{
                uri: `${values.values.sprites.front_default}`,
              }}
            />
            <Icon
              name="close"
              type="font-awesome"
              color="#f50"
              onPress={() => dispatch(setIsModalOpen(false))}
              iconStyle={{
                marginBottom: 100,
              }}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 40, marginTop: 20 }}>
              {values.values.name}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: color }}>
              {values.values.types[0].type.name}
            </Text>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.stat}>
                HP: {values.values.stats[0].base_stat}
              </Text>
              <Text style={styles.stat}>
                Attack: {values.values.stats[1].base_stat}
              </Text>
              <Text style={styles.stat}>
                Defense: {values.values.stats[2].base_stat}
              </Text>
              <Text style={styles.stat}>
                Special Attack: {values.values.stats[3].base_stat}
              </Text>
              <Text style={styles.stat}>
                Special Defense: {values.values.stats[4].base_stat}
              </Text>
              <Text style={styles.stat}>
                Speed: {values.values.stats[5].base_stat}
              </Text>
            </View>
            <View>
              <PieChart
                data={data}
                width={Dimensions.get("window").width - 75}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"-5"}
                center={[5, 10]}
                absolute
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  modal: {
    borderRadius: 20,
    width: Dimensions.get("screen").width - 30,
    height: 700,
    marginBottom: 600,
  },

  innerModal: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    width: Dimensions.get("screen").width - 70,
    marginVertical: 20,
    padding: 20,
    height: 660,
  },
  image: {
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  stat: {
    fontSize: 20,
  },
});
