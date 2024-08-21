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

import EventCreationScreen from "./EventCreationScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const EventsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#9660DA" }} />
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
          <Text
            style={{ color: "#9660DA", fontSize: 25, fontWeight: "700" }}
            onPress={() => navigation.navigate("EventCreationScreen")}
          >
            Événements
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("EventCreationScreen")}
          >
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: "#9660DA",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="calendar-plus-o" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ width: "100%" }}>
          <View style={styles.eventSection}>
            {/* <View
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
            </View> */}

            {/* <View
              style={{ flexDirection: "row", width: "100%", marginBottom: 20 }}
            >
              <View>
                <Image
                  style={styles.img}
                  source={require("../assets/sports/Running-min.jpg")}
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
            </View> */}

            {/* <View
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
            </View> */}

            {/* <View
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
            </View> */}

            <View
              style={{ flexDirection: "row", width: "100%", justifyContent:'space-between', alignContent:'space-between',marginBottom: 20, borderWidth:2, borderColor:'#9660DA', borderRadius: 15, padding:10
          }}
            >
              <View>
                <Image
                  style={styles.imgtest}
                  source={require("../assets/sports/Golf-min.jpg")}
                ></Image>
              </View>
              <View style={styles.cardtest}>
                <View>
                  <Text>Bowling (03/12/2024) </Text>
                  <Text>Heur : 20h30 - 22h30</Text>
                  <Text>Participants: 6/10</Text>
                </View>
                <TouchableOpacity style={styles.btntest}>
                  <Text style={{color:'white'}}>VOIR</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", width: "100%", justifyContent:'space-between', alignContent:'space-between',marginBottom: 20, borderWidth:2, borderColor:'#9660DA', borderRadius: 15, padding:10
          }}
            >
              <View>
                <Image
                  style={styles.imgtest}
                  source={require("../assets/sports/Golf-min.jpg")}
                ></Image>
              </View>
              <View style={styles.cardtest}>
                <View>
                  <Text>Bowling (03/12/2024) </Text>
                  <Text>Heur : 20h30 - 22h30</Text>
                  <Text>Participants: 6/10</Text>
                </View>
                <TouchableOpacity style={styles.btntest}>
                  <Text style={{color:'white'}}>VOIR</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", width: "100%", justifyContent:'space-between', alignContent:'space-between',marginBottom: 20, borderWidth:2, borderColor:'#9660DA', borderRadius: 15, padding:10
          }}
            >
              <View>
                <Image
                  style={styles.imgtest}
                  source={require("../assets/sports/Golf-min.jpg")}
                ></Image>
              </View>
              <View style={styles.cardtest}>
                <View>
                  <Text>Bowling (03/12/2024) </Text>
                  <Text>Heur : 20h30 - 22h30</Text>
                  <Text>Participants: 6/10</Text>
                </View>
                <TouchableOpacity style={styles.btntest}>
                  <Text style={{color:'white'}}>VOIR</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", width: "100%", justifyContent:'space-between', backgroundColor: "#E5E4E2",alignContent:'space-between',marginBottom: 20, borderWidth:2, borderColor:'#9660DA', borderRadius: 15, padding:10
          }}
            >
              <View>
                <Image
                  style={styles.imgtest}
                  source={require("../assets/sports/Golf-min.jpg")}
                ></Image>
              </View>
              <View style={styles.cardtest}>
                <View>
                  <Text>Bowling (03/12/2024) </Text>
                  <Text>Heur : 20h30 - 22h30</Text>
                  <Text>Participants: 6/10</Text>
                </View>
                <TouchableOpacity style={styles.btntest}>
                  <Text style={{color:'white'}}>VOIR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <SafeAreaView style={{ backgroundColor: "white" }} />
    </View>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  imgtest:{
    borderRadius: 50,
    height: 90,
    width: 90,
    borderWidth:1, 
    borderColor:'#9660DA'
  },
  cardtest:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",  
    paddingTop: 2,
    paddingBottom: 2,
   
    paddingLeft: 14,
  },
  btntest : {
    backgroundColor: "#9660DA",
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 14,
    paddingLeft: 14,
    borderRadius: 25,
  }
});
