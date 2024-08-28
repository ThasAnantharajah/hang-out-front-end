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
import DateTimePicker from "@react-native-community/datetimepicker";

const EventsScreen = ({ navigation }) => {
  //  search inputs
  const [activityInput, setActivityInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [regionInput, setRegionInput] = useState("");
  const [dayInput, setDayInput] = useState("");
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState([]);

  const registeredUsers = 5;
  // data treated
  const [eventData, setEventData] = useState();

  const handleSearch = () => {
    // MAE WORKING ON
    // const queryParams = new URLSearchParams();

    // if (activityInput) queryParams.append("activityInput", activityInput);
    // if (cityInput) queryParams.append("cityInput", cityInput);
    // if (regionInput) queryParams.append("regionInput", regionInput);
    // if (dayInput) queryParams.append("dayInput", dayInput);
    // if (startInput) queryParams.append("startInput", startInput);
    // if (endInput) queryParams.append("endInput", endInput);

    fetch(`https://hang-out-back-end.vercel.app/events/search`)
      .then((response) => response.json())
      .then((data) => {
        console.log("SEARCH RESULTS:", data);
        console.log("SEARCH RESULTS LENGTH:", data.events.length);
        setEventData(data.events);
        console.log("EVENT DATA:", eventData);
      });
  };

  const displayDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0"); // Day of the month (1-31)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript, so add 1
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

    return `${day}/${month}/${year}`;
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#4B3196" }} />
      <View style={styles.title}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Events
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
              placeholder="Activity..."
              placeholderTextColor={"#767577"}
              value={activityInput}
              onChangeText={(text) => setActivityInput(text)}
            />
            <FontAwesome style={styles.fontAwesome} name="search" />
          </View>

          <View style={{ width: "30%" }}>
            <TextInput
              style={styles.boxRadius}
              placeholder="City..."
              placeholderTextColor={"#767577"}
              value={cityInput}
              onChangeText={(text) => setCityInput(text)}
            />
          </View>

          <View style={{ width: "20%" }}>
            <TextInput
              style={styles.boxRadius}
              placeholder="Km..."
              // placeholderTextColor={"#767577"}

              //   value={milles}
              // onChangeText={(text) => setMilles(text)}
            />
          </View>

          <View style={{ width: "40%" }}>
            <TextInput
              style={styles.boxRadius}
              placeholder="Region..."
              placeholderTextColor={"#767577"}
              value={regionInput}
              onChangeText={(text) => setRegionInput(text)}
            />
          </View>

          <View style={{ width: "30%" }}>
            <TextInput
              style={styles.boxRadius}
              placeholder="Day..."
              placeholderTextColor={"#767577"}
              value={dayInput}
              onChangeText={(text) => setDayInput(text)}
            />
          </View>

          <View style={{ width: "30%" }}>
            <TextInput
              style={styles.boxRadius}
              placeholder="From..."
              placeholderTextColor={"#767577"}
              value={startInput}
              onChangeText={(text) => setStartInput(text)}
            />
          </View>

          <View style={{ width: "30%" }}>
            <TextInput
              style={styles.boxRadius}
              placeholder="To..."
              placeholderTextColor={"#767577"}
              value={endInput}
              onChangeText={(text) => setEndInput(text)}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 15,
            justifyContent: "center",
            width: "40%",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#9660DA",
              borderRadius: 8,
              padding: 10,
              alignItems: "center",
            }}
            onPress={() => handleSearch()}
          >
            <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
              Search
            </Text>
          </TouchableOpacity>
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
            {eventData ? (
              eventData.map((event, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    marginBottom: 20,
                  }}
                >
                  <View>
                    <Image
                      style={styles.img}
                      source={require("../assets/activities/Bowling-min.jpg")} // Replace with event image URL
                    />
                  </View>
                  <View style={styles.card}>
                    <View>
                      <Text>
                        {event.name} ({displayDate(new Date(event.date))})
                      </Text>

                      <Text>
                        Time: {event.startTime}-{event.endTime}
                      </Text>
                      <Text>
                        Participants: {registeredUsers}/{event.slots}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.btn}>
                      <Text>VOIR</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: "grey",
                  }}
                >
                  No events found, make a new search !
                </Text>
              </View>
            )}
          </View>
          <View
            style={{ flexDirection: "row", width: "100%", marginBottom: 20 }}
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
  },
  title: {
    width: "100%",
    backgroundColor: "#4B3196",
    alignItems: "center",
    paddingBottom: 10,
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
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 8,
    paddingRight: 14,
    paddingLeft: 14,

    borderWidth: 0.5,
    borderColor: "#D8D8D8",

    shadowColor: "#D8D8D8",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  fontAwesome: {
    position: "absolute",
    fontSize: 15,
    color: "grey",
    marginLeft: 300,
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

    shadowColor: "#D8D8D8",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 14,
    paddingLeft: 14,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,

    shadowColor: "#D8D8D8",
    shadowOffset: { width: -1, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  btn: {
    backgroundColor: "#D990A1",
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 14,
    paddingLeft: 14,
    borderRadius: 25,
  },
  imgtest: {
    borderRadius: 50,
    height: 90,
    width: 90,
    borderWidth: 1,
    borderColor: "#9660DA",
  },
  cardtest: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 2,
    paddingBottom: 2,

    paddingLeft: 14,
  },
  btntest: {
    backgroundColor: "#9660DA",
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 14,
    paddingLeft: 14,
    borderRadius: 25,
  },
});
