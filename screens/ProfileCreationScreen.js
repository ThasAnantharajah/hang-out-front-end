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
  Modal,
  Button,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera/legacy";
import { useEffect, useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { BACK_END_URL } from "../config";

import * as ImagePicker from "expo-image-picker";

import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";

const ProfileCreationScreen = ({ navigation }) => {
  // camera
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [showCamera, setShowCamera] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  //profile inputs
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [favoriteSports, setFavoriteSports] = useState([]);
  const [favoriteActivities, setFavoriteActivities] = useState([]);

  // data fetch and camera
  const [sportsList, setSportsList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [imgGallery, setImgGallery] = useState("");
  const data = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Don't want to say" },
  ];

  let cameraRef = useRef(null);

  const handleImgPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  const takePicture = async () => {
    console.log("takepicture");
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });

    if (photo) {
      const formData = new FormData();

      formData.append("photoFromFront", {
        uri: photo.uri,
        name: "profilePicture.jpg",
        type: "image/jpeg",
      });

      fetch(BACK_END_URL + `/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            // dispatch(addPhoto(data.url));
            setImage(data.url);
            setProfilePhoto(data.url);
          }
        });
    }
  };

  const handleCamera = () => {
    setShowCamera(!showCamera);
    setShowModal(true);
  };

  // const handleDate = (date) => {
  //   // Supprimer tous les caractères sauf les chiffres
  //   const onlyNumber = date.replace(/[^0-9]/g, "");

  //   if (onlyNumber.length <= 2) {
  //     setDate(onlyNumber);
  //   } else if (onlyNumber.length <= 4) {
  //     setDate(`${onlyNumber.slice(0, 2)}/${onlyNumber.slice(2, 4)}`);
  //   } else {
  //     setDate(
  //       `${onlyNumber.slice(0, 2)}/${onlyNumber.slice(2, 4)}/${onlyNumber.slice(
  //         4,
  //         8
  //       )}`
  //     );
  //   }
  //   setBirthdate(date)

  // };

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      if (result) {
        setHasPermission(result.status === "granted");
      }

      fetch("https://hang-out-back-end.vercel.app/activities")
        .then((res) => res.json())
        .then((data) => {
          console.log("activities test", data);
          let activityArray = data.activities.map((activity, i) => ({
            key: i,
            value: activity.name,
          }));
          console.log("activityArray:", activityArray);
          setActivitiesList(activityArray);

          fetch("https://hang-out-back-end.vercel.app/sports")
            .then((res) => res.json())
            .then((data) => {
              let sportArray = data.sports.map((sport) => sport.name);
              console.log("SportArray:", sportArray);
              setSportsList(sportArray);
            });
        });
    })();
  }, []);

  const onChangeBirthdate = (event, selectedDate) => {
    console.log("BIRTHDATE RAW:", birthdate);

    setBirthdate(new Date(selectedDate));
  };

  const onSubmit = () => {
    const newUser = {
      name: name,
      dateofbirth: birthdate,
      gender: gender,
      description: description,
      activities: favoriteActivities,
      sports: favoriteSports,
      city: city,
      profilePictureUrl: "",
    };
    console.log("User to add:", newUser);

    fetch("http://localhost:3000/users/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
  };

  // const handleSave = () =>{
  // }

  return (
    <View style={styles.container}>
      {/* -------------------------------- CAMERA MODAL -------------------------------- */}
      {showCamera && (
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
              justifyContent: "center",
              backgroundColor: "#8F5CD1",
            }}
          >
            <Camera
              type={type}
              flashMode={flashMode}
              ref={(ref) => (cameraRef = ref)}
              style={{ width: "100%", height: "35%" }}
            ></Camera>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() =>
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  )
                }
                style={styles.button}
              >
                <FontAwesome name="refresh" size={25} color="#ffffff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  setFlashMode(
                    flashMode === FlashMode.off
                      ? FlashMode.torch
                      : FlashMode.off
                  )
                }
                style={styles.button}
              >
                <FontAwesome
                  name="flash"
                  size={25}
                  color={flashMode === FlashMode.off ? "#ffffff" : "#e8be4b"}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.snapContainer}>
              <TouchableOpacity onPress={() => cameraRef && takePicture()}>
                <FontAwesome name="circle-thin" size={95} color="#ffffff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cBtn}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Text style={{ color: "#8F5CD1", fontWeight: "bold" }}>
                  Annuler
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Create my profile
          </Text>
        </View>
        {/* ici test */}
        <View style={styles.profilContainer}>
          <View style={{ width: "100%", height: "35%" }}>
            <Image style={styles.camera} source={{ uri: image }}></Image>
          </View>
          {/**************************************************************************CAMERA************************************************************************/}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            <View>
              <View
                style={{
                  justifyContent: "center",
                  marginBottom: 15,
                  alignItems: "center",
                  backgroundColor: "#8F5CD1",
                  borderRadius: 25,
                  height: 50,
                  width: 50,
                }}
              >
                <TouchableOpacity title="Flip" onPress={() => handleCamera()}>
                  <FontAwesome name="camera" size={25} color="white" />
                </TouchableOpacity>
              </View>

              <Text style={{ color: "#8F5CD1", fontWeight: "700" }}>
                Camera
              </Text>
            </View>

            <View>
              <View
                style={{
                  justifyContent: "center",
                  marginBottom: 15,
                  alignItems: "center",
                  backgroundColor: "#8F5CD1",
                  borderRadius: 25,
                  height: 50,
                  width: 50,
                }}
              >
                <TouchableOpacity
                  title="Flip"
                  onPress={() => handleImgPicker()}
                >
                  <FontAwesome name="th-large" size={25} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={{ color: "#8F5CD1", fontWeight: "700" }}>
                Gallery
              </Text>
            </View>
          </View>

          {/********************************************************************MY PROFILE************************************************************************/}
          <ScrollView
            style={{ width: "100%" }}
            // automaticallyAdjustContentInsets={true}
            // alwaysBounceVertical={true}
            // bounces={true}
            // contentInsetAdjustmentBehavior={"scrollableAxes"}
          >
            <View style={styles.inputContainer}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 10,
                  color: "#8F5CD1",
                }}
              >
                My profile
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  color: "#09051F",
                  paddingLeft: 4,
                  marginBottom: 5,
                }}
              >
                Your name
              </Text>
              <TextInput
                placeholder="Name"
                returnKeyType="next"
                // value={name}
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
                  }}
                >
                  Gender
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                {/* <DateTimePicker
                placeholder="Birthdate"
                testID="dateTimePicker"
                value={date}
                mode="date"
                onChange={onChangeBirthdate}
                style={{
                  flex: 1,
                  borderWidth: 2,
                  height: 55,
                  backgroundColor: "white",
                  fontSize: 20,
                }}
                name="Birthdate"
                accentColor="#8F5CD1"
              /> */}
                <TextInput
                  type={"datetime"}
                  options={{
                    format: "DD/MM/YYYY",
                  }}
                  value={birthdate}
                  onChangeText={(text) => setBirthdate(text)}
                  placeholder="MM/DD/YYYY"
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
                  placeholder="Gender"
                  placeholderTextColor="#C8C8C8"
                  searchPlaceholder="Gender"
                  search={false}
                  dropdownStyles={{
                    height: 120,
                    marginTop: 50,
                    borderWidth: "none",
                    backgroundColor: "#fff",
                    position: "absolute",
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
                }}
              >
                Where are you from?
              </Text>
              <TextInput
                placeholder="City"
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
                  marginBottom: 10,
                  color: "#8F5CD1",
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
                }}
              >
                Tell us more about yourself
              </Text>
              <TextInput
                placeholder="Describe yourself..."
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
                  marginTop: 10,
                  marginBottom: 10,
                  color: "#8F5CD1",
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
                }}
              >
                Pick your favorite activities and sports !{" "}
              </Text>
              <MultipleSelectList
                setSelected={(activ) => setFavoriteActivities(activ)}
                data={activitiesList}
                placeholder="Select your favorite activities"
                searchPlaceholder="Search an activity"
                save="value"
                color="grey"
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
                labelStyles={{ fontWeight: "700", color: "#9660DA" }}
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
                inputStyles={{ color: "grey" }}
              />

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
                    navigation.navigate("LoginScreen");
                  }}
                >
                  <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => {
                    navigation.navigate("TabNavigator");
                    console.log(
                      "User data:",
                      name,
                      city,
                      description,
                      birthdate,
                      favoriteActivities,
                      favoriteSports,
                      gender
                    );
                  }}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ProfileCreationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
    backgroundColor: "#4B3196",
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
    borderColor: "#C8C8C8",
    borderRadius: 8,
    padding: 5,
    margin: 5,
    height: 45,
  },
  title: {
    width: "100%",
    backgroundColor: "#4B3196",
    alignItems: "center",
    paddingBottom: 10,
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
    height: 45,
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    width: "45%",
    backgroundColor: "darkgrey",
  },
  nextButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: "45%",
    backgroundColor: "#9660DA",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
  },
  snapContainer: {
    alignItems: "center",
  },
  cBtn: {
    alignItems: "center",
    width: "40%",
    borderRadius: 15,
    padding: 10,
    backgroundColor: "white",
    marginTop: 20,
  },

  saveButton: {
    backgroundColor: "#9660DA",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 14,
    paddingLeft: 14,
    borderRadius: 25,
    width: "40%",
    alignSelf: "center",
  },
});
