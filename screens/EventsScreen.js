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
  Modal,
} from "react-native";

import MapView, { Marker, Circle, Callout } from "react-native-maps";
import * as Location from "expo-location";

import EventCreationScreen from "./EventCreationScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import moment from "moment";

import { LinearGradient } from "expo-linear-gradient";

const EventsScreen = ({ navigation }) => {
  //  search inputs
  const [activityInput, setActivityInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [regionInput, setRegionInput] = useState("");
  const [dayInput, setDayInput] = useState();
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  const registeredUsers = 2;
  // data treated
  const [eventData, setEventData] = useState();
  const [modalEvent, setModalEvent] = useState();
  const [modalMap, setModalMap] = useState();
  const [searchResults, setSearchResults] = useState();

  const [eventID, setEventID] = useState("");
  const [singleEventData, setSingleEventData] = useState();

  // view event
  const [showModal, setShowModal] = useState(false);
  const [showRegisteredModal, setShowRegisteredModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [defaultLat, setDefaultLat] = useState();
  const [defaultLong, setDefaultLong] = useState();

  const usernameLogged = useSelector((state) => state.user.user.username);
  const userInfos = useSelector((state) => state.user.user);

  useEffect(() => {
    //ASK FOR LOC PERMISSION
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        console.log(location);
      }
    })();

    fetch(`https://api-adresse.data.gouv.fr/search/?q=${userInfos.city}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("USER COORDINATES:", data.features[0].geometry.coordinates);
        setDefaultLat(data.features[0].geometry.coordinates[1]);
        setDefaultLong(data.features[0].geometry.coordinates[0]);
      });

    fetch("https://hang-out-back-end.vercel.app/events/search")
      .then((res) => res.json())
      .then((data) => {
        console.log("MARKERS PRELOAD:", data.events);
        setSearchResults(data.events);
      });
  }, []);

  const loadMarkers = () => {
    console.log("Search results:", searchResults);
    return searchResults && searchResults.length > 0
      ? searchResults.map((event, i) =>
          event.place && event.place.coords ? (
            <Marker
              key={i}
              coordinate={{
                latitude: event.place.coords.lat,
                longitude: event.place.coords.long,
              }}
              title={event.name}
              description={
                moment(event.date).format("DD/MM/YY") ||
                "No description available"
              }
              pinColor="#9660DA"
              showsUserLocation={true}
            >
              <Callout>
                <View
                  style={{
                    maxwidth: 200,
                    padding: 10,
                    paddingTop: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {event.name}
                  </Text>
                  <Text>Date: {moment(event.date).format("DD/MM/YY")}</Text>
                  <Text>
                    Time: {event.startTime}-{event.endTime}
                  </Text>
                  <Text>City: {event.place.city}</Text>
                  <Text>Address: {event.place.address || "Ask organizer"}</Text>
                </View>
              </Callout>
            </Marker>
          ) : (
            console.log("No valid coordinates for event:", event.name, event)
          )
        )
      : null;
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (activityInput) queryParams.append("activityInput", activityInput);
    if (cityInput) queryParams.append("cityInput", cityInput);
    if (regionInput) queryParams.append("regionInput", regionInput);
    if (dayInput) queryParams.append("dayInput", dayInput);
    if (startInput) queryParams.append("startInput", startInput);
    if (endInput) queryParams.append("endInput", endInput);

    fetch(
      `https://hang-out-back-end.vercel.app/events/search?${queryParams.toString()}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("SEARCH RESULTS:", data);
        console.log("SEARCH RESULTS LENGTH:", data.events.length);
        setEventData(data.events);
        console.log("EVENT DATA:", eventData);
      });
  };

  const displayDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  const previewEvent = (id) => {
    fetch(`https://hang-out-back-end.vercel.app/events/search/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Specific event loaded:", data);
        setSingleEventData(data.singleEvent);
        console.log("CHECK DATA", data.singleEvent);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
      });
  };

  const registerUser = (username, eventID) => {
    fetch(
      `https://hang-out-back-end.vercel.app/events/register/${eventID}/${username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("User registered.");
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#fff" }} />

      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Image
              style={{
                height: "30%",
                width: "100%",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
              source={require("../assets/sports/Badminton-min.jpg")}
            ></Image>
            <View style={{ padding: 20, height: "70%" }}>
              {singleEventData ? (
                <>
                  <Text style={styles.modalTitle}>{singleEventData.name}</Text>
                  <ScrollView>
                    <View style={{ marginBottom: 15 }}>
                      <Text>{singleEventData.type}</Text>

                      <Text style={{ paddingVertical: 20 }}>
                        <Text style={styles.info}>More information:</Text>
                        {singleEventData.desc}
                      </Text>
                      <View style={styles.infoCont}>
                        <FontAwesome
                          name="map-pin"
                          size={20}
                          color="#E46986"
                          style={{ paddingRight: 5 }}
                        />

                        {/* <Text style={styles.info}>City:</Text> */}
                        <Text style={styles.filled}>
                          {singleEventData.place.city}
                        </Text>
                      </View>

                      <View style={styles.infoCont}>
                        <Text style={styles.info}>Participants: </Text>
                        <Text style={styles.filled}>
                          {singleEventData.participants.length}/
                          {singleEventData.slots}
                        </Text>
                      </View>
                      <View style={styles.infoCont}>
                        <Text style={styles.info}>When:</Text>
                        <Text style={styles.filled}>
                          {moment(singleEventData.date).format("DD-MM-YYYY")}
                        </Text>
                      </View>
                      <View style={styles.infoCont}>
                        <Text style={styles.info}>From: </Text>
                        <Text style={styles.filled}>
                          {singleEventData.startTime}-{singleEventData.endTime}
                        </Text>
                      </View>

                      <View style={styles.infoCont}>
                        <Text style={styles.info}>Specific:</Text>
                        <Text style={styles.filled}>
                          {singleEventData.expenses === true
                            ? "Expenses expected."
                            : null}

                          {singleEventData.femaleOnly === true
                            ? "Female-only event."
                            : null}
                          {singleEventData.expenses === false &&
                          singleEventData.femaleOnly === false
                            ? "no specifications"
                            : null}
                        </Text>
                      </View>

                      <View style={styles.infoCont}>
                        <Text style={styles.info}>Organizer:</Text>
                        <Text style={styles.filled}>
                          @{singleEventData.createdBy.username}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <TouchableOpacity
                        style={styles.regButton}
                        onPress={() => {
                          setShowRegisteredModal(true);
                          console.log("Modal should open now");
                          console.log(showRegisteredModal);
                        }}
                      >
                        <Text style={styles.closeText}>
                          Show Registered Users
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 20,
                      }}
                    >
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setShowModal(false)}
                      >
                        <Text style={styles.closeText}>Close</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.regButton}
                        onPress={() =>
                          registerUser(usernameLogged, eventID) &&
                          alert("You've been registered to this event.")
                        }
                      >
                        <Text style={styles.closeText}>Register</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </>
              ) : (
                <>
                  <Text>Loading event details...</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 20,
                      marginTop: 20,
                    }}
                  >
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setShowModal(false)}
                    >
                      <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>

        <Modal
          transparent={true}
          visible={showRegisteredModal}
          animationType="slide"
          style={{ zIndex: 10 }}
        >
          <View style={styles.modalRegBck}>
            <View style={styles.modalReg}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 20,
                  marginBottom: 20,
                  color: "#4B3196",
                }}
              >
                Participants
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  gap: 10,
                }}
              >
                <Image
                  style={styles.imgReg}
                  source={require("../assets/face.jpg")}
                ></Image>
                <Image
                  style={styles.imgReg}
                  source={require("../assets/blank-profile.png")}
                ></Image>
                <Image
                  style={styles.imgReg}
                  source={require("../assets/blank-profile.png")}
                ></Image>
                <Image
                  style={styles.imgReg}
                  source={require("../assets/face.jpg")}
                ></Image>
                <Image
                  style={styles.imgReg}
                  source={require("../assets/blank-profile.png")}
                ></Image>
                <Image
                  style={styles.imgReg}
                  source={require("../assets/blank-profile.png")}
                ></Image>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowRegisteredModal(false)}
                >
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Modal>

      <Modal transparent={true} visible={showMapModal} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.mapModal}>
            <View style={styles.mapTitle}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TabNavigator", { screen: "Home" });
                  setShowMapModal(false);
                }}
              >
                <Image
                  source={require("../assets/logo.png")}
                  style={{
                    width: 40,
                    height: 40,
                    // marginVertical: -100,
                    justifyContent: "center",
                    alignItems: "center",
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
                Map View
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                backgroundColor: "#4B3196",
                height: 5,
                borderTopRightRadius: 8,
              }}
            ></View>
            <MapView
              initialRegion={{
                latitude: defaultLat,
                longitude: defaultLong,

                latitudeDelta: 5, // Zoom level: smaller means more zoom
                longitudeDelta: 5, // Zoom level: smaller means more zoom
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "70%",
              }}
              showsUserLocation={true}
            >
              <Circle
                center={{ latitude: defaultLat, longitude: defaultLong }}
                radius={20000} // Radius in meters
                strokeWidth={3}
                strokeColor={"rgba(0,112,255,0.5)"}
                fillColor={"rgba(0,112,255,0.1)"}
              />

              {loadMarkers()}
            </MapView>
            <View
              style={{
                width: "100%",
                backgroundColor: "#4B3196",
                height: 5,
              }}
            ></View>
            <View
              style={{
                // borderWidth: 2,
                // borderColor: "red",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.closeButtonMap}
                onPress={() => setShowMapModal(false)}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
          Events
        </Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.eventTitle}>
          <Text
            style={{
              color: "#9660DA",
              fontSize: 20,
              fontWeight: "700",
              fontFamily: "Manrope",
            }}
          >
            Search
          </Text>
          <View
            style={{
              justifyContent: "flex-end",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Manrope",
                fontSize: "16",
                fontWeight: "700",
                color: "grey",
              }}
            >
              Map View
            </Text>
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
              <TouchableOpacity
                onPress={() => {
                  setShowMapModal(true);
                  loadMarkers();
                }}
              >
                <FontAwesome5
                  name="map-marked-alt"
                  size={20}
                  color="white"
                  style={{ paddingLeft: 0, paddingBottom: 4 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
            width: "100%",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#9660DA",
              borderRadius: 8,
              padding: 10,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
            onPress={() => handleSearch()}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: "600",
                fontFamily: "Lato",
              }}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.eventTitle}>
          <Text
            style={{
              color: "#9660DA",
              fontSize: 20,
              fontWeight: "700",
              fontFamily: "Manrope",
            }}
          >
            Events
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
              <FontAwesome
                name="calendar-plus-o"
                size={20}
                color="white"
                style={{ paddingLeft: 2 }}
              />
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
                      source={require("../assets/activities/Bowling-min.jpg")}
                    />
                  </View>
                  <View style={styles.card}>
                    <View>
                      <Text
                        style={{
                          flexWrap: "wrap",
                          width: "100%",
                          fontFamily: "LatoBold",
                          fontWeight: "700",
                        }}
                      >
                        {event.name}
                      </Text>
                      <Text style={{ fontFamily: "Lato" }}>
                        ({displayDate(new Date(event.date))})
                      </Text>
                      <Text style={{ fontFamily: "Lato" }}>
                        Time: {event.startTime}-{event.endTime}
                      </Text>
                      <Text style={{ fontFamily: "Lato" }}>
                        Participants: {event.participants.length}/{event.slots}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        setEventID(event._id);
                        previewEvent(event._id);
                        console.log("id logged:", eventID);
                        setShowModal(true);

                        console.log("Modal should open now");
                      }}
                    >
                      <Text style={{ fontFamily: "Lato" }}>VOIR</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 15,
                  justifyContent: "center",
                  height: "90%",
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
          {/* <View
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
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setShowModal(true);
                  console.log("Modal should open now");
                }}
              >
                <Text>VOIR</Text>
              </TouchableOpacity>
            </View>
          </View> */}
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
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 10,
    flexDirection: "row",
    padding: 20,
    gap: 15,
  },
  mapTitle: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 10,
    flexDirection: "row",
    padding: 20,
    marginTop: 50,
    marginBottom: 20,
    gap: 15,
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
    height: 45,
    borderWidth: 0.5,
    borderColor: "#9660DA",
    fontFamily: "Lato",
    fontSize: 14,

    shadowColor: "#4B3196",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
  },
  fontAwesome: {
    position: "absolute",
    fontSize: 15,
    color: "grey",
    marginLeft: 300,
    marginTop: 10,
    paddingTop: 4,
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
    height: 90,
    width: 90,
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
    backgroundColor: "#E46986",
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },

  modalContainer: {
    width: "85%",
    height: "70%",
    padding: 0,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  mapModal: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    flex: 1,
    marginTop: 15,
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    height: 45,
    justifyContent: "center",
  },
  closeButtonMap: {
    width: "55%",
    marginTop: 25,
    backgroundColor: "grey",
    borderRadius: 8,
    alignItems: "center",
    height: 40,
    justifyContent: "center",
  },
  regButton: {
    flex: 1,
    marginTop: 15,
    backgroundColor: "#E46986",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    height: 45,
    justifyContent: "center",
  },
  imgReg: {
    marginVertical: 0,
    height: 55,
    width: 55,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#8F5CD1",
  },
  modalReg: {
    width: "85%",
    height: "70%",
    padding: 30,
    // justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  modalRegBck: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  info: {
    fontSize: 15,
    fontWeight: "700",
    marginRight: 4,
  },
  infoCont: {
    flexDirection: "row",
    marginVertical: 5,
  },
  filled: {
    fontSize: 15,
  },
  closeText: {
    fontWeight: "700",
    color: "#fff",
  },
});
