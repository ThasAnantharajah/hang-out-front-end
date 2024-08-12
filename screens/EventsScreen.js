import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Platform,
} from "react-native";



import FontAwesome from "@expo/vector-icons/FontAwesome";

const EventsScreen = () => {
  
  return (

    <View  style={styles.container}>
      <SafeAreaView style={{backgroundColor:'#9660DA'}} />
      <View style={styles.title}>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
          Événements
        </Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.searchSection}>
          <View
            style={{
              width: "100%",
              alignContent: "center",
            }}
          >
            <TextInput
              style={styles.boxRadius}
              placeholder="Type d'activité..."
              //   value={type}
              // onChangeText={(text) => setType(text)}
            />
            <FontAwesome style={styles.fontAwesome} name="search" />
          </View>

          <View style={{ width: "30%" }}>
            <TextInput
              style={styles.boxRadius}
              placeholder="Ville..."
              //   value={city}
              // onChangeText={(text) => setCity(text)}
            />
          </View>

          <View style={{ width: "20%" }}>
            <TextInput
              style={styles.boxRadius}
              placeholder="Km..."
              //   value={milles}
              // onChangeText={(text) => setMilles(text)}
            />
          </View>

          <View style={{ width: "40%" }}>
            <TextInput
              style={styles.boxRadius}
              placeholder="Département..."
              //   value={departement}
              // onChangeText={(text) => setDepartement(text)}
            />
          </View>

          <View style={{ width: "30%" }}>
            <TextInput
              style={styles.boxRadius}
              placeholder="Jour..."
              //   value={day}
              // onChangeText={(text) => setDay(text)}
            />
          </View>

          <View style={{ width: "30%" }}>
            <TextInput
              style={styles.boxRadius}
              placeholder="Du..."
              //   value={start}
              // onChangeText={(text) => setStart(text)}
            />
          </View>

          <View style={{ width: "30%" }}>
            <TextInput
              style={styles.boxRadius}
              placeholder="Au.."
              //   value={end}
              // onChangeText={(text) => setEnd(text)}
            />
          </View>
        </View>

        <View style={styles.eventTitle}>
          <Text style={{ color: "white" }}>Événements</Text>
        </View>
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.eventSection}>
            <View
              style={{ flexDirection: "row", width: "100%", marginBottom: 20 }}
            >
              <View>
                <Image
                  style={styles.img}
                  source={require("../assets/bowling.jpg")}
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
              style={{ flexDirection: "row", width: "100%", marginBottom: 20 }}
            >
              <View>
                <Image
                  style={styles.img}
                  source={require("../assets/bowling.jpg")}
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
              style={{ flexDirection: "row", width: "100%", marginBottom: 20 }}
            >
              <View>
                <Image
                  style={styles.img}
                  source={require("../assets/bowling.jpg")}
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
              style={{ flexDirection: "row", width: "100%", marginBottom: 20 }}
            >
              <View>
                <Image
                  style={styles.img}
                  source={require("../assets/bowling.jpg")}
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
              style={{ flexDirection: "row", width: "100%", marginBottom: 20 }}
            >
              <View>
                <Image
                  style={styles.img}
                  source={require("../assets/bowling.jpg")}
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
        </ScrollView>
      </View>

      <SafeAreaView style={{backgroundColor:'white'}}/>
    </View>
    
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
    backgroundColor: "green",
  },
  title: {
    width: "100%",
    backgroundColor: "#9660DA",
    alignItems: "center",
    height: "5%",
    
   
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 28,
    paddingRight: 28,
    paddingLeft: 28,
    
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
    backgroundColor: "#4B3196",
    borderRadius: 50,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 14,
    paddingLeft: 14,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center",
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
});
