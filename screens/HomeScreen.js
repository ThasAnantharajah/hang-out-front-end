import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GradientText from "react-native-gradient-texts";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfos = useSelector((state) => state.user.user);
  const usernameLogged = useSelector((state) => state.user.user.username);

  const [todayEvents, setTodayEvents] = useState();

  useEffect(() => {
    console.log(
      "User infos stored in redux:",
      usernameLogged,
      "USERNAME:",
      userInfos.username,
      "GENDER:",
      userInfos.gender,
      "SPORTS:",
      userInfos.sports,
      "ACTIVITIES:",
      userInfos.activities,
      "EMAIL:",
      userInfos.email
    );

    const today = moment(new Date()).format("YYYY-MM-DD");
    console.log(today);
    eventsOfToday(today);
  }, []);

  const eventsOfToday = (date) => {
    fetch(`https://hang-out-back-end.vercel.app/events/search/date/${date}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("TODAYS EVENTS:", data);
        setTodayEvents(data.EventsOnDate);
      });
  };

  return (
    <SafeAreaView style={{ alignItems: "center", backgroundColor: "#fff" }}>
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
            resizeMode="contain" // Maintain aspect ratio
          />

          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 20 }}>
            Come hang out, {userInfos.name} !
          </Text>
        </View>

        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "grey",
            fontStyle: "italic",
            marginBottom: 10,
          }}
        >
          Here are some suggestions for you
        </Text>
        <View style={{ paddingTop: 20, marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#4B3196" }}>
            Events happening {""}
            <Text style={{ fontSize: 20, fontWeight: "600", color: "#9660DA" }}>
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
                  source={require("../assets/activities/Bowling-min.jpg")}
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
                <TouchableOpacity style={styles.btn}>
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

        <View style={{ paddingTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "#4B3196" }}>
            Events happening {""}
            <Text style={{ fontSize: 20, fontWeight: "600", color: "#9660DA" }}>
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
              <Text>VOIR</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginBottom: 10,
            marginTop: 0,
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
              <Text>VOIR</Text>
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
  },
  gradient: {
    padding: 10, // Add some padding if needed
    borderRadius: 5, // Optional: To make the gradient corners rounded
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
  },
  title: {
    fontSize: 18,
    color: "white", // Ensure the text color is visible against the gradient background
  },
});
