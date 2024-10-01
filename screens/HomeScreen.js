import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GradientText from "react-native-gradient-texts";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
moment.locale("en");

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { retrieveImage } from "../assets/src/mappingPic";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfos = useSelector((state) => state.user.user);
  const usernameLogged = useSelector((state) => state.user.user.username);

  const [todayEvents, setTodayEvents] = useState();

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

  const [registeredUsers, setRegisteredUsers] = useState();
  const [isRegistered, setIsRegistered] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log(
        "User infos stored in redux:",
        usernameLogged,
        "USERNAME:",
        userInfos.username,
        "GENDER:",
        userInfos.gender,
        "SPORTS:",
        userInfos.favoriteSports,
        "ACTIVITIES:",
        userInfos.favoriteActivities,
        "EMAIL:",
        userInfos.email
      );

      const today = moment(new Date()).format("YYYY-MM-DD");
      console.log(today);
      eventsOfToday(today);
    }
  }, [isFocused]);

  const eventsOfToday = (date) => {
    fetch(`https://hang-out-back-end.vercel.app/events/search/date/${date}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("TODAYS EVENTS:", data);
        setTodayEvents(data.EventsOnDate);
      });
  };

  const loadRegistered = () => {
    console.log("EVENTID", eventID);
    fetch(
      `https://hang-out-back-end.vercel.app/events/${eventID}/registered-users`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Registered users:", data);
        setRegisteredUsers(data.registeredUsers);

        checkRegistrationStatus(data.registeredUsers);
      });
  };

  const checkRegistrationStatus = (registeredUsers) => {
    const registeredUserIds = registeredUsers.map((user) => user.userId);
    setIsRegistered(registeredUserIds.includes(userInfos.userId));
  };

  const displayRegistered = () => {
    return registeredUsers && registeredUsers.length > 0 ? (
      registeredUsers.map((user, i) => {
        console.log("REG USER", user);
        console.log("Profile Pic URL:", user.profilePic);
        const defaultImage = require("../assets/blank-profile.png");

        return (
          <View
            key={i}
            style={{
              padding: 10,
              marginVertical: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.imgReg}
              source={
                user.profilePic && user.profilePic !== "No Profile Pic"
                  ? { uri: user.profilePic }
                  : defaultImage
              }
              resizeMode="center"
            />
            <View style={styles.regText}>
              <Text style={styles.regTextName}>{user.name}</Text>
              <Text style={styles.regTextInfos}>
                {user.city} ,
                {user.gender === "Don't want to say"
                  ? "Ø"
                  : ` ${user.gender.charAt(0)}.`}
              </Text>
            </View>
          </View>
        );
      })
    ) : (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>No registered users yet.</Text>
        <Text>Join the event now!</Text>
      </View>
    );
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

  const registerUser = (userId, eventID) => {
    fetch(
      `https://hang-out-back-end.vercel.app/events/register/${eventID}/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          alert("You are now registered.");
          console.log("User registered.");
        } else {
          if (data.message === "No available slots.") {
            alert("Event is full. Registration failed");
          } else if (data.message === "User is already registered.") {
            alert("You are already registered.");
          } else if (
            data.message === "Registration not allowed: Event is female-only."
          ) {
            alert("This event is for women only.");
          } else {
            alert("Registration failed: " + data.message);
          }
        }
      });
  };

  const unregisterUser = (userId, eventID) => {
    fetch(
      `https://hang-out-back-end.vercel.app/events/unregister/${eventID}/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          alert("You've been unregistered from this event.");
          loadRegistered();
        } else if (data.message === "User is not registered yet.") {
          alert("You are not registered yet.");
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <SafeAreaView style={{ alignItems: "center", backgroundColor: "#fff" }}>
      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {singleEventData && singleEventData.event ? (
              <Image
                style={{
                  height: "30%",
                  width: "100%",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
                source={retrieveImage[singleEventData.event]}
              />
            ) : (
              <Text>Loading image...</Text>
            )}
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
                        style={styles.showRegButton}
                        onPress={() => {
                          setShowRegisteredModal(true);
                          loadRegistered();
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
                          registerUser(userInfos.userId, eventID) &&
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
                {displayRegistered(eventID)}
              </View>
              <View style={{ flexDirection: "row", gap: 20 }}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowRegisteredModal(false)}
                >
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
                {isRegistered && (
                  <TouchableOpacity
                    style={styles.regButton}
                    onPress={() => {
                      unregisterUser(userInfos.userId, eventID);
                      setShowRegisteredModal(false);
                    }}
                  >
                    <Text style={styles.closeText}>Unregister</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </Modal>

      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            // borderWidth: 2,
          }}
        >
          <Image
            source={require("../assets/HangOut.png")}
            style={{
              width: 300,
              height: 100,
              margin: 0,
              // marginVertical: -100,
              justifyContent: "center",
              alignItems: "center",
            }} // Adjust size as needed
            resizeMode="contain"
          />

          <Text
            style={{
              fontSize: 16,
              fontFamily: "MPO",
              marginBottom: 20,
              color: "#B090D9",
            }}
          >
            Come hang out, {userInfos.name} !
          </Text>
        </View>

        {/* <Text
          style={{
            fontSize: 16,
            color: "grey",
            fontFamily: "LatoItalic",
            fontStyle: "italic",
            marginBottom: 10,
          }}
        >
          Here are some suggestions for you.
        </Text> */}
        <View style={{ paddingTop: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Manrope",
              fontWeight: "600",
              color: "#4B3196",
            }}
          >
            Events happening {""}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                fontFamily: "Manrope",
                color: "#9660DA",
              }}
            >
              today
            </Text>
          </Text>
        </View>

        {todayEvents && todayEvents.length > 0 ? (
          todayEvents.map((event, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                width: "100%",
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              <View style={styles.img}>
                <Image
                  style={styles.img}
                  source={retrieveImage[event.event]}
                ></Image>
              </View>
              <View style={styles.card}>
                <View>
                  <Text style={{ fontFamily: "LatoBold", fontWeight: "700" }}>
                    {event.name}
                  </Text>
                  <Text>{moment(event.date).format("ddd, DD. MMM YYYY")}</Text>
                  <Text>
                    {event.startTime}-{event.endTime}
                  </Text>
                  <Text>
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
                    console.log("event id unique:", eventID);
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "700" }}>VOIR</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text
            style={{
              color: "gray",
              fontSize: 15,
              textAlign: "center",
              fontStyle: "italic",
              margin: 20,
              marginBottom: 20,
            }}
          >
            {" "}
            No events happening today.
          </Text>
        )}

        <View style={{ paddingTop: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 20,
              color: "#4B3196",
              fontFamily: "ManropeBold",
            }}
          >
            Events happening {""}
            <Text
              style={{
                fontSize: 20,
                color: "#9660DA",
                fontFamily: "ManropeBold",
              }}
            >
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
              <Text>Time : 20h30 - 22h30</Text>
              <Text>Participants: 6/10</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>VOIR</Text>
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
    width: 100,
    height: 90,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    shadowColor: "#D8D8D8",
    shadowOffset: { width: -1, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f1f1f1",
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 14,
    paddingLeft: 14,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 10,
    height: 90,

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
    height: 40,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    color: "white",
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
    width: 100,
    height: 90,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    shadowColor: "#D8D8D8",
    shadowOffset: { width: -1, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 4,

    color: "#D8D8D8",
    shadowOffset: { width: -1, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f1f1f1",
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 14,
    paddingLeft: 14,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    paddingVertical: 10,
    height: 90,

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
    height: 40,
    justifyContent: "center",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContainer: {
    width: "85%",
    height: "80%",
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
  showRegButton: {
    flex: 1,
    marginTop: 15,
    backgroundColor: "#B090D9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    height: 45,
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
    height: 40,
    width: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#8F5CD1",
    overflow: "hidden",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
  },
  regText: {
    justifyContent: "center",
    alignItems: "center",
  },
  regTextName: {
    fontWeight: "700",
    fontFamily: "MPO",
  },
  regTextInfos: {
    fontFamily: "Lato",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
