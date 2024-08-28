import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  TextInput,
  Button,
  Switch,
} from "react-native";
import { useEffect, useState } from "react";

import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";

// import EventsScreen from "./EventsScreen";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const EventCreationScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventSport, setEventSport] = useState("");

  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventDate, setEventDate] = useState(new Date());

  // START TIME
  const onChangeStartTime = (event, selectedDate) => {
    const startTimePreview = new Date(selectedDate);
    let startTimeHours = Number(startTimePreview.getHours().toString());
    let startTimeMinutes = Number(startTimePreview.getMinutes().toString());
    if (startTimeHours < 10) {
      startTimeHours = `0${startTimeHours}`;
    }
    if (startTimeMinutes < 10) {
      startTimeMinutes = `0${startTimeMinutes}`;
    }
    const resultStartTime = `${startTimeHours}:${startTimeMinutes}`;
    setEventStartTime(resultStartTime);
    console.log("StartTimeLogged:", eventStartTime);
  };

  // END TIME
  const onChangeEndTime = (event, selectedDate) => {
    const endTimePreview = new Date(selectedDate);
    let endTimeHours = Number(endTimePreview.getHours().toString());
    let endTimeMinutes = Number(endTimePreview.getMinutes().toString());
    if (endTimeHours < 10) {
      endTimeHours = `0${endTimeHours}`;
    }
    if (endTimeMinutes < 10) {
      endTimeMinutes = `0${endTimeMinutes}`;
    }
    const resultEndTime = `${endTimeHours}:${endTimeMinutes}`;
    setEventEndTime(resultEndTime);
    console.log("EndTimeLogged:", eventEndTime);
  };

  // DATE
  const onChangeDate = (event, selectedDate) => {
    setEventDate(new Date(selectedDate));
    console.log("EVENT DATE RAW:", eventDate);
  };

  const [eventActivity, setEventActivity] = useState("");
  const [eventSlots, setEventSlots] = useState(0);

  const [date, setDate] = useState(new Date());

  ///////////////////////

  const [sportsList, setSportsList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [eventList, setEventList] = useState([]);

  const [expensesIncluded, setExpensesIncluded] = useState(false);
  const [femaleOnly, setFemaleOnly] = useState(false);

  const activateExpenses = () =>
    setExpensesIncluded((previousState) => !previousState);
  const activateFemaleOnly = () =>
    setFemaleOnly((previousState) => !previousState);

  const type = [
    { key: "1", value: "Sport" },
    { key: "2", value: "Activity" },
  ];

  useEffect(() => {
    // (async () => {
    console.log("working fine");

    fetch("http://localhost:3000/activities")
      .then((res) => res.json())
      .then((data) => {
        console.log("activities test", data);
        let activityArray = data.activities.map((activity) => activity.name);
        console.log("activityArray:", activityArray);
        setActivitiesList(activityArray);
      });

    fetch("http://localhost:3000/sports")
      .then((res) => res.json())
      .then((data) => {
        let sportArray = data.sports.map((sport) => sport.name);
        console.log("SportArray:", sportArray);
        setSportsList(sportArray);
      });

    console.log("activityArray:", activitiesList);
    console.log("SportArray:", sportsList);
  }, []);

  // MODEL MISSING populate
  // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

  const handleSubmit = () => {
    console.log(eventStartTime, eventEndTime);
    console.log(eventDate);
    const newEvent = {
      name: eventName,
      type: eventType,
      event: eventSport,
      startTime: eventStartTime,
      endTime: eventEndTime,
      date: eventDate,
      city: eventCity,
      address: eventAddress,
      slots: eventSlots,
      expenses: expensesIncluded,
      femaleOnly: femaleOnly,
    };
    console.log("Event to add:", newEvent);

    fetch("http://localhost:3000/events/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
          Create an event
        </Text>
      </View>

      <View style={styles.profilContainer}>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <View>
            <View style={styles.inputContainer}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 15,
                  color: "#8F5CD1",
                }}
              >
                Activity details
              </Text>
              <TextInput
                placeholder="Name"
                returnKeyType="next"
                style={styles.inputProfile}
                onChangeText={(eventName) => setEventName(eventName)}
              ></TextInput>

              <SelectList
                setSelected={(eventType) => setEventType(eventType)}
                data={type}
                save="value"
                placeholder="Type"
                search={false}
                dropdownStyles={{
                  flex: 1,
                  height: 85,
                  borderWidth: "none",
                  backgroundColor: "#C8C8C8",
                  marginTop: 0,
                  margin: 5,
                }}
                boxStyles={styles.inputProfile}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeDate}
                  style={{
                    borderWidth: 1,
                  }}
                  accentColor="#9660DA"
                  minimumDate={new Date()}
                  maximumDate={new Date(2030, 12, 20)}
                />
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  onChange={onChangeStartTime}
                  style={{
                    borderWidth: 1,
                  }}
                />

                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  onChange={onChangeEndTime}
                  style={{
                    borderWidth: 1,
                  }}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  placeholder="Address"
                  style={styles.inputProfile}
                  onChangeText={(eventAddress) => setEventAddress(eventAddress)}
                ></TextInput>

                <TextInput
                  placeholder="City"
                  style={styles.inputProfile}
                  onChangeText={(eventCity) => setEventCity(eventCity)}
                ></TextInput>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            ></View>

            <View style={styles.interest}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 15,
                  color: "#8F5CD1",
                }}
              >
                Sports & Hobbies
              </Text>

              <SelectList
                setSelected={(eventSport) => setEventSport(eventSport)}
                data={activitiesList}
                save="value"
                label="Activities"
                boxStyles={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#9660DA",
                  borderRadius: 8,
                  padding: 5,
                  margin: 5,
                  height: 40,
                }}
              />

              <SelectList
                setSelected={(eventActivity) => setEventActivity(eventActivity)}
                data={sportsList}
                save="value"
                boxStyles={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#9660DA",
                  borderRadius: 8,
                  padding: 0,
                  margin: 5,
                  height: 40,
                }}
                label="Sports"
              />
              <TextInput
                placeholder="Slots"
                inputMode="numeric"
                keyboardType="numeric"
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#9660DA",
                  borderRadius: 8,
                  padding: 5,
                  margin: 5,
                  height: 20,
                }}
                onChangeText={(eventSlots) => setEventSlots(eventSlots)}
              ></TextInput>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#9660DA",
                  borderRadius: 8,
                  padding: 5,
                  margin: 5,
                  height: 20,
                }}
              >
                <Text>Involves expenses </Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#9660DA" }}
                  thumbColor={expensesIncluded ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={activateExpenses}
                  value={expensesIncluded}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#9660DA",
                  borderRadius: 8,
                  padding: 5,
                  margin: 5,
                  height: 20,
                }}
              >
                <Text>Female-only event </Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#9660DA" }}
                  thumbColor={femaleOnly ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={activateFemaleOnly}
                  value={femaleOnly}
                />
              </View>
              <View
                style={{
                  marginTop: 20,
                  justifyContent: "center",
                  gap: 15,
                  alignItems: "center",
                  height: "30%",
                }}
              >
                <TouchableOpacity
                  style={styles.previousButton}
                  onPress={() =>
                    navigation.navigate("TabNavigator", "EventsScreen")
                  }
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton}>
                  <Text
                    style={styles.buttonText}
                    onPress={() => handleSubmit()}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EventCreationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 35 : 0,
    backgroundColor: "#9660DA",
  },
  camera: {
    height: "100%",
    width: "100%",
    borderWidth: 2.5,
    borderColor: "#8F5CD1",
    overflow: "hidden",
    borderRadius: 8,
  },
  inputContainer: {
    marginVertical: 15,
    width: "100%",
  },
  inputProfile: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#9660DA",
    borderRadius: 8,
    padding: 5,
    margin: 5,
    height: 45,
  },
  title: {
    width: "100%",
    backgroundColor: "#9660DA",
    alignItems: "center",
    paddingBottom: 10,
  },
  profilContainer: {
    flex: 1,
    borderWidth: 3,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 28,
    paddingRight: 28,
    paddingLeft: 28,
  },
  infoPerso: {
    marginTop: 15,
  },
  check: {
    fontSize: 8,
    color: "white",
    padding: 5,
  },
  interest: {
    width: "100%",
  },
  rounded: {
    backgroundColor: "#C8C8C8",
    borderRadius: 50,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 14,
    paddingLeft: 14,
  },
  pref: {
    width: "100%",
    marginBottom: 15,
  },
  review: {
    width: "100%",
    marginBottom: 22,
  },
  reviewText: {
    backgroundColor: "#C8C8C8",
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 14,
    paddingLeft: 14,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  reviewCount: {
    backgroundColor: "#BD9BE4",
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 14,
    paddingLeft: 14,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  previousButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: "95%",
    height: "40%",
    backgroundColor: "#C8C8C8",
  },
  nextButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: "95%",
    backgroundColor: "#9660DA",
    height: "40%",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});
