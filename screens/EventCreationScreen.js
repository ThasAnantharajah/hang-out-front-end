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
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";

import moment from "moment";

// import EventsScreen from "./EventsScreen";

// import FontAwesome from "@expo/vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";

const EventCreationScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventSport, setEventSport] = useState("");

  const [eventStartTime, setEventStartTime] = useState(new Date());
  const [eventEndTime, setEventEndTime] = useState(new Date());
  const [eventDate, setEventDate] = useState(new Date());

  const [eventLat, setEventLat] = useState(null);
  const [eventLong, setEventLong] = useState(null);

  const usernameLogged = useSelector((state) => state.user.user.username);

  useEffect(() => {
    console.log("Updated EVENT DATE:", eventDate);
    console.log("Updated START TIME:", eventStartTime);
    console.log("Updated END TIME:", eventEndTime);
  }, [eventDate, eventStartTime, eventEndTime]);

  // START TIME
  const onChangeStartTime = (event, selectedDate) => {
    if (selectedDate) {
      setEventStartTime(selectedDate);
    }
  };

  // END TIME
  const onChangeEndTime = (event, selectedDate) => {
    if (selectedDate) {
      setEventEndTime(selectedDate);
    }
  };

  // DATE
  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setEventDate(selectedDate);
    }
  };

  const [eventActivity, setEventActivity] = useState("");
  const [eventSlots, setEventSlots] = useState(0);

  // const [date, setDate] = useState(new Date());

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
    console.log("Loading infos (sports, activities).");

    fetch("https://hang-out-back-end.vercel.app/activities")
      .then((res) => res.json())
      .then((data) => {
        let activityArray = data.activities.map((activity, i) => ({
          key: i,
          value: activity.name,
        }));
        setActivitiesList(activityArray);
      });

    fetch("https://hang-out-back-end.vercel.app/sports")
      .then((res) => res.json())
      .then((data) => {
        let sportArray = data.sports.map((sport, i) => ({
          key: i,
          value: sport.name,
        }));
        setSportsList(sportArray);
      });

    console.log("Activity Array:", activitiesList);
    console.log("Sport Array:", sportsList);
  }, []);

  const handleSubmit = () => {
    // API DATA GOUV

    fetch(`https://hang-out-back-end.vercel.app/users/search/${usernameLogged}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("USER INFO", data);
        const userID = data.userSearched._id;

        if (!userID) {
          console.log("No user id");
        } else {
          console.log("userID:", userID);
        }

        fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${
            eventAddress + " " + eventCity
          }}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("COORDINATES:", data.features[0].geometry.coordinates);
            const eventLat = data.features[0].geometry.coordinates[1];
            const eventLong = data.features[0].geometry.coordinates[0];

            const formattedStartTime = moment(eventStartTime).format("HH:mm");
            const formattedEndTime = moment(eventEndTime).format("HH:mm");

            const newEvent = {
              name: eventName,
              desc: eventDesc,
              type: eventType,
              event: eventType === "Sport" ? eventSport : eventActivity,
              startTime: formattedStartTime,
              endTime: formattedEndTime,
              date: eventDate,
              place: {
                city: eventCity,
                address: eventAddress,
                coords: {
                  lat: eventLat,
                  long: eventLong,
                },
              },
              slots: eventSlots,
              expenses: expensesIncluded,
              femaleOnly: femaleOnly,
              createdBy: userID,
            };
            console.log("Event to add:", newEvent);

            // fetch("https://hang-out-back-end.vercel.app/events/add", {
            fetch("https://hang-out-back-end.vercel.app/events/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newEvent),
            });
          });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Home" })
          }
        >
          <Image
            source={require("../assets/logo.png")}
            style={{
              width: 40,
              height: 40,
              // marginVertical: -100,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "#4B3196",
            fontFamily: "ManropeBold",
          }}
        >
          Create an event
        </Text>
      </View>

      <View style={styles.profilContainer}>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <KeyboardAvoidingView>
            <View>
              <View style={styles.inputContainer}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 20,
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

                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <SelectList
                    setSelected={(eventType) => setEventType(eventType)}
                    data={type}
                    save="value"
                    placeholder="Type"
                    search={false}
                    dropdownStyles={{
                      flex: 1,
                      height: 85,
                      borderWidth: 1,
                      borderColor: "#C8C8C8",
                      backgroundColor: "#fff",
                      marginTop: 0,
                      margin: 5,
                    }}
                    boxStyles={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "#C8C8C8",
                      borderRadius: 8,
                      padding: 5,
                      margin: 5,
                      height: 45,
                      width: 200,
                    }}
                  />

                  <TextInput
                    placeholder="Slots"
                    inputMode="numeric"
                    keyboardType="numeric"
                    style={styles.inputProfile}
                    onChangeText={(eventSlots) => setEventSlots(eventSlots)}
                  ></TextInput>
                </View>
                <TextInput
                  placeholder="Description"
                  multiline={true}
                  returnKeyType="next"
                  style={styles.inputProfile}
                  onChangeText={(eventDesc) => setEventDesc(eventDesc)}
                ></TextInput>

                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "space-evenly",
                    height: 45,
                    gap: 25,
                  }}
                >
                  {/* <Text>When?</Text> */}
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      // backgroundColor: "lightblue",
                      justifyContent: "center",
                      // alignContent: "center",
                      width: "50%",
                    }}
                  >
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={eventDate}
                      mode="date"
                      is24Hour={true}
                      onChange={onChangeDate}
                      style={{
                        // borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                      }}
                      accentColor="#9660DA"
                      minimumDate={new Date()}
                      maximumDate={new Date(2030, 12, 20)}
                    />
                  </TouchableOpacity>

                  <DateTimePicker
                    testID="dateTimePicker"
                    value={eventStartTime}
                    mode="time"
                    is24Hour={true}
                    onChange={onChangeStartTime}
                    style={
                      {
                        // borderWidth: 1,
                      }
                    }
                  />

                  <DateTimePicker
                    testID="dateTimePicker"
                    value={eventEndTime}
                    mode="time"
                    is24Hour={true}
                    onChange={onChangeEndTime}
                    style={
                      {
                        // borderWidth: 1,
                      }
                    }
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    placeholder="Address"
                    style={styles.inputProfile}
                    onChangeText={(eventAddress) =>
                      setEventAddress(eventAddress)
                    }
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
                    marginBottom: 20,
                    color: "#8F5CD1",
                  }}
                >
                  Sports & Hobbies
                </Text>
                {eventType === "Sport" ? (
                  <SelectList
                    setSelected={(eventSport) => setEventSport(eventSport)}
                    data={sportsList}
                    save="value"
                    label="Sport"
                    placeholder="Select a sport"
                    searchPlaceholder="Searh a sport"
                    boxStyles={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "#C8C8C8",
                      borderRadius: 8,
                      padding: 5,
                      margin: 5,
                      // height: 45,
                      color: "#C8C8C8",
                    }}
                    dropdownStyles={{
                      height: 120,
                      borderWidth: "none",
                      backgroundColor: "#fff",
                      width: 300,
                    }}
                    dropdownShown={false}
                    badgeStyles={{ backgroundColor: "#B090D9", fontSize: 15 }}
                    badgeTextStyles={{ fontSize: 15 }}
                    checkBoxStyles={{
                      borderColor: "#8F5CD1",
                      borderWidth: 1.5,
                    }}
                    inputStyles={{ color: "grey" }}
                  />
                ) : null}

                {eventType === "Activity" ? (
                  <SelectList
                    setSelected={(eventActivity) =>
                      setEventActivity(eventActivity)
                    }
                    data={activitiesList}
                    save="value"
                    label="Activity"
                    placeholder="Select an activity"
                    searchPlaceholder="Searh an activity"
                    boxStyles={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "#C8C8C8",
                      borderRadius: 8,
                      padding: 5,
                      margin: 5,
                      // height: 45,
                      color: "#C8C8C8",
                    }}
                    dropdownStyles={{
                      height: 120,
                      borderWidth: "none",
                      backgroundColor: "#fff",
                      width: 300,
                    }}
                    dropdownShown={false}
                    badgeStyles={{ backgroundColor: "#B090D9", fontSize: 15 }}
                    badgeTextStyles={{ fontSize: 15 }}
                    checkBoxStyles={{
                      borderColor: "#8F5CD1",
                      borderWidth: 1.5,
                    }}
                    inputStyles={{ color: "grey" }}
                  />
                ) : null}

                <View style={styles.slider}>
                  <Text>Involves expenses </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#9660DA" }}
                    thumbColor={expensesIncluded ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={activateExpenses}
                    value={expensesIncluded}
                  />
                </View>
                <View style={styles.slider}>
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
                    flexDirection: "row",
                    flexWrap: "wrap",
                    // gap: "20%",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={styles.previousButton}
                    onPress={() => {
                      navigation.navigate("TabNavigator", "EventsScreen");
                      console.log("Canceled event creation.");
                    }}
                  >
                    <Text style={styles.buttonText}>Previous</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.nextButton}>
                    <Text
                      style={styles.buttonText}
                      onPress={() => {
                        handleSubmit();
                        navigation.navigate("TabNavigator", "EventsScreen");
                      }}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EventCreationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginVertical: 15,
    width: "100%",
  },
  inputProfile: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#C8C8C8",
    borderRadius: 8,
    padding: 5,
    margin: 5,
    height: 45,
  },
  title: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
    marginTop: 10,
  },
  profilContainer: {
    flex: 1,
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
    width: "45%",
    height: "55%",
    backgroundColor: "#C8C8C8",
  },
  nextButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: "45%",
    backgroundColor: "#9660DA",
    height: "55%",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  slider: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "#9660DA",
    borderRadius: 8,
    padding: 0,
    margin: 5,
    height: 10,
  },
});
