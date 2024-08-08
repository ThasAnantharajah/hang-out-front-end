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
} from "react-native";

import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";

const CalendarScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
          Calendrier
        </Text>
      </View>

      <View style={styles.mainContainer}>
        <View
          style={{
            width: "100%",
            borderWidth: 2,
            borderColor: "#9660DA",
            borderRadius: 5,
          }}
        >
          <Calendar></Calendar>
        </View>
        <View style={styles.eventTitle}>
          <Text style={{ color: "white" }}>Événements</Text>
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

              <View style={{ flexDirection: "row", width: "100%" }}>
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
                  source={require("../assets/bowling.jpg")}
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
    backgroundColor: "#9660DA",
  },

  title: {
    width: "100%",
    backgroundColor: "#9660DA",
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
