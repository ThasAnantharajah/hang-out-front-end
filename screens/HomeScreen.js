import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GradientText from "react-native-gradient-texts";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userInfos = useSelector((state) => state.user.user);

  useEffect(() => {
    (async () => {
      console.log(
        "User infos stored in redux:",
        "USERNAME:",
        userInfos.username,
        "GENDER:",
        userInfos.gender,
        "SPORTS:",
        userInfos.sports,
        "ACTIVITIES:",
        userInfos.activities,
        "EMAIL:",
        userInfos.email
      );
    })();
  }, []);

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <View style={styles.container}>
        {/* <LinearGradient>
          <Text
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.title}
          >
            Suggestions
          </Text>
        </LinearGradient> */}
        <GradientText
          text={"Suggestions"}
          fontSize={30}
          isGradientFill
          // isGradientStroke
          // strokeWidth={2}
          // style={{ backgroundColor: "black" }}
          width={420}
          locations={{ x: 95, y: 65 }}
          // borderColors={["#adfda2", "#11d3f3"]}
          gradientColors={["#9660DA", "#B090D9"]}
          fontFamily="Atos"
        />

        <View style={{ paddingTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#4B3196" }}>
            Events happening {""}
            <Text style={{ fontSize: 20, fontWeight: "600", color: "#9660DA" }}>
              today
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          <View>
            <Image
              style={styles.img}
              source={require("../assets/activities/Bowling-min.jpg")}
            ></Image>
          </View>
          <View style={styles.card}>
            <View>
              <Text>Bowling (03/12/2024) </Text>
              <Text>Heur : 20h30 - 22h30</Text>
              <Text>Participants: 6/10</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text>VOIR</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginBottom: 10,
            marginTop: 0,
          }}
        >
          <View>
            <Image
              style={styles.img}
              source={require("../assets/activities/Bowling-min.jpg")}
            ></Image>
          </View>
          <View style={styles.card}>
            <View>
              <Text>Bowling (03/12/2024) </Text>
              <Text>Heur : 20h30 - 22h30</Text>
              <Text>Participants: 6/10</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text>VOIR</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#4B3196" }}>
            Events happening {""}
            <Text style={{ fontSize: 20, fontWeight: "600", color: "#9660DA" }}>
              near you
            </Text>
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginBottom: 10,
            marginTop: 15,
          }}
        >
          <View>
            <Image
              style={styles.img}
              source={require("../assets/activities/Bowling-min.jpg")}
            ></Image>
          </View>
          <View style={styles.card}>
            <View>
              <Text>Bowling (03/12/2024) </Text>
              <Text>Heur : 20h30 - 22h30</Text>
              <Text>Participants: 6/10</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text>VOIR</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginBottom: 10,
            marginTop: 0,
          }}
        >
          <View>
            <Image
              style={styles.img}
              source={require("../assets/activities/Bowling-min.jpg")}
            ></Image>
          </View>
          <View style={styles.card}>
            <View>
              <Text>Bowling (03/12/2024) </Text>
              <Text>Heur : 20h30 - 22h30</Text>
              <Text>Participants: 6/10</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text>VOIR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "100%",
    // borderWidth: 2,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    color: "#9660DA",
  },

  searchSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  boxRadius: {
    backgroundColor: "#D8D8D8",
    borderRadius: 50,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 14,
    paddingLeft: 14,
  },
  fontAwesome: {
    position: "absolute",
    fontSize: 15,
    color: "grey",
    marginLeft: 315,
    marginTop: 10,
  },
  eventTitle: {
    marginVertical: 20,
    height: "5%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    height: 75,
    width: 69,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#D8D8D8",
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 14,
    paddingLeft: 14,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  btn: {
    backgroundColor: "#D990A1",
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 14,
    paddingLeft: 14,
    borderRadius: 25,
  },
  gradient: {
    padding: 10, // Add some padding if needed
    borderRadius: 5, // Optional: To make the gradient corners rounded
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
  },
  title: {
    fontSize: 18,
    color: "white", // Ensure the text color is visible against the gradient background
  },
});
