import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  Modal,
} from "react-native";

import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
  ExpandableCalendar,
} from "react-native-calendars";

import moment from "moment";
moment.locale("en");

import "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useEffect } from "react";

const CalendarScreen = ({ navigation }) => {
  const [clickedDate, setClickedDate] = useState();
  const [selected, setSelected] = useState("");
  const [eventDates, setEventDates] = useState([]);
  const [eventsOnDate, setEventsOnDate] = useState({
    upcoming: [],
    passed: [],
  });

  // data treated
  const [eventData, setEventData] = useState();
  const [modalEvent, setModalEvent] = useState();
  const [eventID, setEventID] = useState("");
  const [singleEventData, setSingleEventData] = useState();

  // view event
  const [showModal, setShowModal] = useState(false);
  const [showRegisteredModal, setShowRegisteredModal] = useState(false);

  const usernameLogged = useSelector((state) => state.user.user.username);

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

  const retrieveDayEvents = (selectedDate) => {
    console.log("selected date raw:", selectedDate);
    // setSelected(moment(selected).format("YYYY-MM-DD"));
    console.log("INFO", typeof selectedDate, selectedDate);

    fetch(
      `https://hang-out-back-end.vercel.app/events/search/date/${selectedDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        const currentTime = moment();
        const currentTimeParis = moment.tz("Europe/Paris");

        console.log("TIME CHECK:", currentTimeParis);
        console.log(data);

        const upcoming = data.EventsOnDate.filter((event) => {
          const eventEndDateTime = moment(
            `${event.date} ${event.endTime}`,
            "YYYY-MM-DD HH:mm"
          );
          return eventEndDateTime.isAfter(currentTimeParis);
        });

        const passed = data.EventsOnDate.filter((event) => {
          const eventEndDateTime = moment(
            `${event.date} ${event.endTime}`,
            "YYYY-MM-DD HH:mm"
          );
          return eventEndDateTime.isBefore(currentTimeParis);
        });

        setEventsOnDate({ upcoming, passed });
        console.log("EVENTS ON DATE:", eventsOnDate.upcoming);
        console.log("EVENTS ON DATE:", eventsOnDate.passed);

        // console.log("EVENTS ON DATE:", data);
        // console.log("SEARCH RESULTS LENGTH:", data.EventsOnDate.length);
        // setEventsOnDate(data.EventsOnDate);
      });
  };

  useEffect(() => {
    console.log("Updated EVENTS ON DATE:", eventsOnDate);

    //FOR MARKED DATES
    fetch(`https://hang-out-back-end.vercel.app/events/search`)
      .then((response) => response.json())
      .then((data, i) => {
        console.log("calendar result :", data.events);

        const result = data.events.map((event) => {
          const eventDate = new Date(event.date).toISOString().split("T")[0];
          return eventDate;
        });

        console.log("SEARCH RESULTS LENGTH:", data.events.length);
        setEventDates(result);
        console.log("EVENTDATES:", result);
      });
  }, [eventsOnDate]);

  return (
    <SafeAreaView style={styles.container}>
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
              source={require("../assets/sports/Badminton-min.jpg")} // image associöe ä l'event
            ></Image>
            <View style={{ padding: 20, height: "70%" }}>
              {singleEventData ? ( // Check if `singleEventData` has data
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
                          size={25}
                          color="#E46986"
                          style={{ paddingRight: 5 }}
                        />
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
                      marginTop: 20, // Add some margin for spacing
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
                style={{ fontWeight: "700", fontSize: 20, marginBottom: 20 }}
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
            fontFamily: "ManropeBold",
            fontWeight: "600",
            color: "#4B3196",
          }}
        >
          Calendar
        </Text>
      </View>

      <View style={styles.mainContainer}>
        <View
          style={{
            width: "110%",
          }}
        >
          <Calendar
            firstDay={1}
            markingType={"multi-dot"}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              textSectionTitleDisabledColor: "#d9e1e8",
              selectedDayBackgroundColor: "#9660DA",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#9660DA",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              dotColor: "#9660DA",
              selectedDotColor: "#ffffff",
              arrowColor: "#9660DA",
              disabledArrowColor: "#d9e1e8",
              monthTextColor: "#9660DA",
              indicatorColor: "blue",
              textDayFontFamily: "monospace",
              textMonthFontFamily: "monospace",
              textDayHeaderFontFamily: "monospace",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "300",
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 13,
              enableSwipeMonths: true,
            }}
            style={{
              paddingBottom: 15,
              fontFamily: "Roboto",
            }}
            onDayPress={(day) => {
              console.log("selected day", day);
              setSelected(day.dateString);

              console.log("SELECTED RAW", selected);
              retrieveDayEvents(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                backgroundColor: "#9660DA",
                dots: eventDates.includes(selected)
                  ? [{ key: "event", color: "#FFFFFF" }]
                  : [],
              },

              ...(eventDates.length > 0
                ? eventDates.reduce((markedEventDates, eventDate) => {
                    if (eventDate !== selected) {
                      markedEventDates[eventDate] = {
                        dots: [{ key: "event", color: "#9660DA" }],
                        marked: true,
                      };
                    }
                    return markedEventDates;
                  }, {})
                : {}),
            }}
          ></Calendar>
        </View>
        <View
          style={{
            width: "120%",
            borderBottomWidth: 0.5,
            borderColor: "#4B3196",
            opacity: 0.4,
          }}
        ></View>
        {/* <View style={styles.eventTitle}>
          <Text style={{ color: "white", fontSize: 18 }}>Events</Text>
        </View> */}
        <ScrollView style={{ width: "100%" }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#4B3196",
                // textDecorationLine: "underline",
                fontFamily: "Manrope",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              Upcoming
            </Text>
            <View style={styles.soonContainer}>
              {eventsOnDate.upcoming && eventsOnDate.upcoming.length > 0 ? (
                eventsOnDate.upcoming.map((event, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      height: 90,
                      width: "100%",
                      marginBottom: 20,
                    }}
                  >
                    <View>
                      <Image
                        style={styles.img}
                        source={require("../assets/activities/Camping-min.jpg")}
                      />
                    </View>
                    <View style={styles.card}>
                      <View style={{ flexWrap: "wrap" }}>
                        <Text>{event.name}</Text>
                        <Text>
                          {moment(event.date).format("ddd, DD. MMM YYYY")}
                        </Text>
                        <Text>
                          Time : {event.startTime} - {event.endTime}
                        </Text>
                        <Text>
                          Registered: {event.participants.length}/{event.slots}
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
                        <Text>VOIR</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <View>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 16,
                      textAlign: "center",
                      fontStyle: "italic",
                      margin: 20,
                      fontFamily: "Roboto",
                    }}
                  >
                    No upcoming events on this day.
                  </Text>
                </View>
              )}
            </View>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                // textDecorationLine: "underline",
                fontFamily: "Manrope",

                color: "#4B3196",
                marginTop: 5,
                marginBottom: 20,
              }}
            >
              Passed
            </Text>

            <View>
              {eventsOnDate.passed && eventsOnDate.passed.length > 0 ? (
                eventsOnDate.passed.map((event, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      marginVertical: 8,
                      opacity: 0.5,
                      marginBottom: 60,
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
                        <Text>{event.name}</Text>
                        <Text>
                          {moment(event.date).format("ddd, DD. MMM YYYY")}
                        </Text>
                        <Text>
                          Time : {event.startTime} - {event.endTime}
                        </Text>
                        <Text>
                          Registered: {event.participants.length}/{event.slots}
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
                        <Text>VOIR</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <View>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 15,
                      textAlign: "center",
                      fontStyle: "italic",
                      margin: 20,
                      marginBottom: 60,
                    }}
                  >
                    No passed events on this day..
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
    backgroundColor: "#fff",
    fontFamily: "Roboto",
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
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 28,
    paddingRight: 28,
    paddingLeft: 28,
  },
  eventTitle: {
    backgroundColor: "#9660DA",
    borderRadius: 50,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 14,
    paddingLeft: 14,
    marginTop: 25,
    marginBottom: 15,
    alignSelf: "center",
  },
  img: {
    height: 90,
    width: 80,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#D8D8D8",
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 14,
    paddingLeft: 14,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
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
  soonContainer: {},
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
