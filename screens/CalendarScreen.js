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
} from "react-native";

import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
  ExpandableCalendar,
} from "react-native-calendars";

const CalendarScreen = () => {
  const [clickedDate, setClickedDate] = useState();
  const [selected, setSelected] = useState("");
  const [eventDates, setEventDates] = useState("");

  const retrieveDayEvents = () => {
    fetch("http://localhost:3000/events/search")
      .then((response) => response.json())
      .then((data) => {
        console.log("SEARCH RESULTS:", data);
        console.log("SEARCH RESULTS LENGTH:", data.events.length);
        setEventData(data.events);
        console.log("EVENT DATA:", eventData);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Calendrier
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
              textMonthFontSize: 16,
              textDayHeaderFontSize: 13,
            }}
            style={{
              paddingBottom: 15,
            }}
            onDayPress={(day) => {
              console.log("selected day", day);
              setSelected(day.dateString);
              console.log(selected);
              retrieveDayEvents();
            }}
            markedDates={{
              [selected]: {
                selected: true,
                selectedDotColor: "#9660DA",
                backgroundColor: "#9660DA",
              },
              [eventDates]: {
                marked: true,
              },
            }}
          ></Calendar>
        </View>
        <View
          style={{
            width: "120%",
            borderBottomWidth: 0.5,
            borderColor: "#4B3196",
          }}
        ></View>
        <View style={styles.eventTitle}>
          <Text style={{ color: "white", fontSize: 18 }}>Événements</Text>
        </View>
        <ScrollView style={{ width: "100%" }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textDecorationLine: "underline",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              À venir
            </Text>
            <View style={styles.soonContainer}>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginBottom: 20,
                }}
              >
                <View>
                  <Image
                    style={styles.img}
                    source={require("../assets/activities/Camping-min.jpg")}
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

              <View style={{ flexDirection: "row", width: "100%" }}>
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

            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textDecorationLine: "underline",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              Passés
            </Text>

            <View style={{ flexDirection: "row", width: "100%", opacity: 0.5 }}>
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
              </View>
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
    backgroundColor: "#4B3196",
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
    height: 70,
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
    paddingTop: 4,
    paddingBottom: 4,
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
  soonContainer: {},
});
