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
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import moment from "moment";

import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import {
  nameUpdate,
  genderUpdate,
  sportsUpdate,
  activitiesUpdate,
  ageUpdate,
  cityUpdate,
  descUpdate,
  photoUpdate,
  emailUpdate,
} from "../reducers/user";

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});
  const usernameLogged = useSelector((state) => state.user.user.username);
  const dispatch = useDispatch();
  const userRedux = useSelector((state) => state.user.user);

  //MODAL HANDLING
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [favoriteSports, setFavoriteSports] = useState([]);
  const [favoriteActivities, setFavoriteActivities] = useState([]);
  const [profilePic, setProfilePic] = useState(null);

  const data = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Don't want to say" },
  ];
  const [sportsList, setSportsList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);

  const ageCalc = () => {
    const now = moment();
    const birthdateFormatted = moment(userInfo.birthdate).format("YYYY-MM-DD");
    const userAge = now.diff(birthdateFormatted, "years");
    return userAge;
  };

  useEffect(() => {
    console.log("Logged user:", usernameLogged);
    fetch(`https://hang-out-back-end.vercel.app/users/search/${usernameLogged}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("USER INFO AT LOAD", data);
        setUserInfo(data.userSearched);
        // updateReduxState(data.userSearched);

        console.log(
          "Fetched Activities:",
          data.userSearched.favoriteActivities
        );
        console.log("Fetched Sports:", data.userSearched.favoriteSports);
      });
    console.log("fav", userInfo.favoriteActivities, userInfo.favoriteSports);

    fetch("https://hang-out-back-end.vercel.app/activities")
      .then((res) => res.json())
      .then((data) => {
        let activityArray = data.activities.map((activity, i) => ({
          key: i,
          value: activity.name,
        }));
        setActivitiesList(activityArray);

        fetch("https://hang-out-back-end.vercel.app/sports")
          .then((res) => res.json())
          .then((data) => {
            let sportArray = data.sports.map((sport, i) => ({
              key: i,
              value: sport.name,
            }));
            setSportsList(sportArray);
          });
      });
  }, [usernameLogged]);

  const updateReduxState = (user) => {
    dispatch(emailUpdate(user.email));
    dispatch(nameUpdate(user.name));
    dispatch(genderUpdate(user.gender));
    dispatch(ageUpdate(user.birthdate));
    dispatch(cityUpdate(user.city));
    dispatch(descUpdate(user.desc));
    dispatch(sportsUpdate(user.favoriteSports));
    dispatch(activitiesUpdate(user.favoriteActivities));
    dispatch(photoUpdate(user.profilePic));
  };

  const userFavSportsProfile = userInfo.favoriteSports
    ? userInfo.favoriteSports.map((data, i) => (
        <View key={i} style={styles.roundedS}>
          <Text style={styles.roundedText}>{data.name}</Text>
        </View>
      ))
    : null;

  const userFavActivitiesProfile = userInfo.favoriteActivities
    ? userInfo.favoriteActivities.map((data, i) => (
        <View key={i} style={styles.roundedA}>
          <Text style={styles.roundedText}>{data.name}</Text>
        </View>
      ))
    : null;

  const handleReview = () => {};

  // update user info
  const onSubmit = () => {
    const updateUser = {
      name: name,
      dateofbirth: birthdate,
      gender: gender,
      description: description,
      activities: favoriteActivities,
      sports: favoriteSports,
      city: city,
      profilePic: profilePic,
    };
    console.log("Update info user:", updateUser);

    fetch(
      `https://hang-out-back-end.vercel.app/users/update/${usernameLogged}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUser),
      }
    )
      .then((response) => {
        response.json();
        // refreshUserInfo(usernameLogged);
        // console.log("REDUX CHECK:", userRedux.name);

        // return response.json().then((data) => ({
        //   status: response.status,
        //   data,
        // }));
      })
      .then((data) => {
        refreshUserInfo(usernameLogged);
        console.log("REDUX CHECK:", userRedux.name);
      });
  };

  const refreshUserInfo = (username) => {
    fetch(`http://localhost:3000/users/search/${usernameLogged}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("REFRESHED USER INFO", data);
        setUserInfo(data.userSearched);
        updateReduxState(data.userSearched);
      });
    console.log("REDUX REFRESHED CONSOLE LOG:", userRedux.name);
  };

  const handleDate = (input) => {
    let slashedDate;

    if (input.length === 8) {
      slashedDate = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(
        -4
      )}`;
    }
    setBirthdate(slashedDate);
    console.log(birthdate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        transparent
        visible={showModal}
        animationType="slide"
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: 90,
            paddingHorizontal: 30,
            backgroundColor: "#fff",
          }}
        >
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.inputContainer}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
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
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 25,
                    color: "#8F5CD1",
                    fontFamily: "ManropeBold",
                    paddingTop: 5,
                  }}
                >
                  Update my profile
                </Text>
              </View>

              <Text
                style={{
                  fontWeight: "600",
                  color: "#09051F",
                  paddingLeft: 4,
                  marginBottom: 5,
                  fontFamily: "Lato",
                }}
              >
                Your name
              </Text>
              <TextInput
                placeholder={userInfo.name ? userInfo.name : "Name"}
                returnKeyType="next"
                // value={name}
                placeholderTextColor={userInfo.name ? "grey" : "#C8C8C8"}
                style={styles.inputProfile}
                onChangeText={(text) => setName(text)}
              ></TextInput>

              <View style={{ flexDirection: "row", gap: "90%", paddingTop: 5 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "#09051F",
                    paddingLeft: 4,
                    marginBottom: 5,
                    fontFamily: "Lato",
                  }}
                >
                  Date of birth
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "#09051F",
                    paddingLeft: 4,
                    marginBottom: 5,
                    fontFamily: "Lato",
                  }}
                >
                  Gender
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TextInput
                  type={"datetime"}
                  options={{
                    format: "DD/MM/YYYY",
                  }}
                  value={birthdate}
                  onChangeText={(text) => handleDate(text)}
                  placeholder={
                    userInfo.birthdate
                      ? moment(userInfo.birthdate).format("DD/MM/YYYY")
                      : "DD/MM/YYYY"
                  }
                  placeholderTextColor={userInfo.birthdate ? "grey" : "#C8C8C8"}
                  keyboardType="numeric"
                  maxLength={10}
                  style={{
                    borderWidth: 1,
                    borderColor: "#C8C8C8",
                    borderRadius: 8,
                    padding: 5,
                    margin: 5,
                    height: 45,
                    width: "50%",
                  }}
                />

                <SelectList
                  setSelected={(value) => setGender(value)}
                  data={data}
                  save="value"
                  value={userInfo.gender ? userInfo.gender : null}
                  placeholder="Gender"
                  placeholderTextColor="#C8C8C8"
                  searchPlaceholder="Gender"
                  search={false}
                  dropdownStyles={{
                    height: 120,
                    marginTop: 50,
                    borderWidth: "none",
                    backgroundColor: "#fff",
                    // position: "absolute",
                    width: 300,
                  }}
                  boxStyles={{
                    borderWidth: 1,
                    borderColor: "#C8C8C8",
                    borderRadius: 8,
                    padding: 5,
                    margin: 5,
                    height: 45,
                    width: "65%",
                  }}
                  inputStyles={{ color: "grey" }}
                />
              </View>
              <Text
                style={{
                  fontWeight: "600",
                  color: "#09051F",
                  paddingLeft: 4,
                  marginBottom: 5,
                  paddingTop: 5,
                  fontFamily: "Lato",
                }}
              >
                Where are you from?
              </Text>
              <TextInput
                placeholder={userInfo.city ? userInfo.city : "City"}
                placeholderTextColor={userInfo.city ? "grey" : "#C8C8C8"}
                value={city}
                style={styles.inputProfile}
                onChangeText={(text) => setCity(text)}
              ></TextInput>
            </View>

            {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          ></View> */}

            <View style={styles.interest}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#8F5CD1",
                  fontFamily: "Manrope",
                  marginVertical: 20,
                }}
              >
                Description
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  color: "#09051F",
                  paddingLeft: 4,
                  marginBottom: 5,
                  fontFamily: "Lato",
                }}
              >
                Tell us more about yourself
              </Text>
              <TextInput
                placeholder={
                  userInfo.description
                    ? userInfo.description
                    : "Describe yourself..."
                }
                placeholderTextColor={userInfo.desc ? "grey" : "#C8C8C8"}
                returnKeyType="next"
                multiline={true}
                style={styles.inputProfile}
                onChangeText={(text) => setDescription(text)}
              ></TextInput>
            </View>
            <View style={styles.interest}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#8F5CD1",
                  fontFamily: "Manrope",
                  marginVertical: 20,
                }}
              >
                Sports & Hobbies
              </Text>

              <Text
                style={{
                  fontWeight: "600",
                  color: "#09051F",
                  paddingLeft: 4,
                  marginBottom: 5,
                  fontFamily: "Lato",
                }}
              >
                Pick your favorite activities and sports !
              </Text>
              <MultipleSelectList
                setSelected={(activ) => setFavoriteActivities(activ)}
                data={activitiesList}
                placeholder="Select your favorite activities"
                searchPlaceholder="Search an activity"
                save="value"
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
                label="Activities"
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

              <MultipleSelectList
                setSelected={(spt) => setFavoriteSports(spt)}
                placeholder="Select your favorite sports"
                searchPlaceholder="Search a sport"
                data={sportsList}
                save="value"
                boxStyles={{
                  borderWidth: 1,
                  borderColor: "#C8C8C8",
                  borderRadius: 8,
                  padding: 5,
                  margin: 5,
                  // height: 45,
                }}
                label="Sports"
                dropdownStyles={{
                  height: 120,
                  borderWidth: "none",
                  backgroundColor: "#fff",
                  width: 300,
                }}
                badgeStyles={{ backgroundColor: "#B090D9", fontSize: 15 }}
                badgeTextStyles={{ fontSize: 15 }}
                checkBoxStyles={{
                  borderColor: "#8F5CD1",
                  borderWidth: 1.5,
                }}
                inputStyles={{ color: "grey" }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "20%",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <TouchableOpacity
                style={styles.previousButton}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  onSubmit();
                  setShowModal(false);
                }}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#4B3196" }}>
          My profile
        </Text>
      </View>

      <View style={styles.profilContainair}>
        <View style={{ width: "100%", height: "35%" }}>
          <Image
            style={styles.img}
            source={
              userInfo.profilePic
                ? { uri: userInfo.profilePic }
                : require("../assets/blank-profile.png")
            }
          ></Image>
        </View>

        <View style={styles.infoPerso}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  marginRight: 5,
                  fontFamily: "ManropeBold",
                }}
              >
                {userInfo.name}
              </Text>
              <View style={{ backgroundColor: "#4B3196", borderRadius: "50%" }}>
                <FontAwesome style={styles.check} name="check" />
              </View>
            </View>
            <Text style={{ fontSize: 18, fontFamily: "Lato", fontSize: 17 }}>
              {ageCalc()} years
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingTop: 5,
            }}
          >
            <Text
              style={{
                color: "#9480BC",
                fontSize: 18,
                marginRight: 5,
                fontFamily: "LatoBold",
              }}
            >
              {userInfo.city}
            </Text>
            <TouchableOpacity>
              <FontAwesome
                style={{ fontSize: 25, color: "#9480BC" }}
                name="pencil-square-o"
                onPress={() => {
                  setShowModal(true);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 10,
                fontSize: 16,
                fontFamily: "Lato",
                paddingBottom: 15,
              }}
            >
              {userInfo.description}
            </Text>
            <View style={styles.interest}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  marginBottom: 20,
                  fontFamily: "ManropeBold",
                }}
              >
                Sports & activities
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                {userFavActivitiesProfile}
                {userFavSportsProfile}
              </View>
            </View>

            {/* <View style={styles.pref}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  marginTop: 15,
                  marginBottom: 5,
                }}
              >
                Préferences
              </Text>
              <Text style={{ color: "grey" }}>Athée</Text>
            </View> */}

            <View style={styles.review}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  marginTop: 20,
                  marginBottom: 20,
                  fontFamily: "ManropeBold",
                }}
              >
                Ce que les autres pensent
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                  marginVertical: 10,
                  // justifyContent: "center",
                }}
              >
                <View style={{ flexDirection: "row", marginRight: 10 }}>
                  <View style={styles.reviewText}>
                    <Text>Cool</Text>
                  </View>
                  <View style={styles.reviewCount}>
                    <Text>8</Text>
                  </View>
                </View>
                <View style={styles.reviewBox}>
                  <View style={styles.reviewText}>
                    <Text>Bienveillant</Text>
                  </View>
                  <View style={styles.reviewCount}>
                    <Text>3</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.reviewText}>
                    <Text>Zen</Text>
                  </View>
                  <View style={styles.reviewCount}>
                    <Text>2</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.reviewText}>
                    <Text>Passionné</Text>
                  </View>
                  <View style={styles.reviewCount}>
                    <Text>2</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.reviewText}>
                    <Text>Drôle</Text>
                  </View>
                  <View style={styles.reviewCount}>
                    <Text>1</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginVertical: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontStyle: "italic",
                    textAlign: "center",
                    color: "grey",
                    marginBottom: 25,
                    fontFamily: "Lato",
                    fontSize: 16,
                    paddingHorizontal: 35,
                  }}
                >
                  Engage in new events to get reviews from other members !
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 50,
            }}
          >
            <TouchableOpacity style={styles.logOutBtn}>
              <Text style={{ fontWeight: "700", color: "white" }}>Log out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
    backgroundColor: "#fff",
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
  profilContainair: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 28,
    paddingRight: 28,
    paddingLeft: 28,
  },
  img: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
    borderWidth: 2.5,
    borderColor: "#8F5CD1",
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
  roundedS: {
    backgroundColor: "#9660DA",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  roundedA: {
    backgroundColor: "#E46986",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  roundedText: {
    color: "#fff",
    fontFamily: "Lato",
    fontSize: 15.5,
  },
  pref: {
    width: "100%",
    marginBottom: 15,
  },
  review: {
    width: "100%",
    marginBottom: 22,
  },
  reviewBox: {
    flexDirection: "row",
  },
  reviewText: {
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    fontFamily: "Lato",
  },
  reviewCount: {
    backgroundColor: "#BD9BE4",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  previousButton: {
    justifyContent: "center",
    height: 45,
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    width: "45%",
    backgroundColor: "darkgrey",
    fontFamily: "Lato",
  },
  nextButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    fontFamily: "Lato",

    width: "45%",
    backgroundColor: "#9660DA",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Lato",
  },
  inputProfile: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#C8C8C8",
    borderRadius: 8,
    padding: 5,
    margin: 5,
    height: 45,
    fontFamily: "Lato",
  },
  logOutBtn: {
    backgroundColor: "#EE6262",
    borderRadius: 15,
    height: 35,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    opacity: 0.5,
  },
});
