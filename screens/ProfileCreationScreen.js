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

const ProfileCreationScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [showCamera, setShowCamera] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [selected, setSelected] = useState("");
  const [sportsList, setSportsList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [imgGallery, setImgGallery] = useState("");
  const data = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Don't want to say" },
  ];

  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileDateOfBirth, setProfileDateOfBirth] = useState("");
  const [profileGender, setProfileGender] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profileHobbies, setProfileHobbies] = useState([]);
  const [profileSports, setProfileSports] = useState([]);
  const [profileDescription, setProfileDescription] = useState("");


  console.log(profilePhoto)
  console.log(profileName)
  console.log(profileDateOfBirth)
  console.log(profileGender)
  console.log(profileCity)

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
            setImage(data.url)
            setProfilePhoto(data.url)
            
          } 
        });
    }
  };

  const handleCamera = () => {
    setShowCamera(!showCamera);
    setShowModal(true);
  };

  const handleDate = (date) => {
    // Supprimer tous les caractères sauf les chiffres
    const onlyNumber = date.replace(/[^0-9]/g, "");

    if (onlyNumber.length <= 2) {
      setDate(onlyNumber);
    } else if (onlyNumber.length <= 4) {
      setDate(`${onlyNumber.slice(0, 2)}/${onlyNumber.slice(2, 4)}`);
    } else {
      setDate(
        `${onlyNumber.slice(0, 2)}/${onlyNumber.slice(2, 4)}/${onlyNumber.slice(
          4,
          8
        )}`
      );
    }
    setProfileDateOfBirth(date)

  };

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      if (result) {
        setHasPermission(result.status === "granted");
      }
    })();

    // FETCH ACCTIVITIES
    fetch(BACK_END_URL + `/activities`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        const listActivities = data.activities.map(
          (activities) => activities.name
        );
        setActivitiesList(listActivities);
      });

    // FETCH SPORTS
    fetch(BACK_END_URL + `/sports`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        const listSports = data.sports.map((sports) => sports.name);
        setSportsList(listSports);
      });
  }, []);


const handleSave = () =>{

}


  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#9660DA" }} />
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
      <View style={styles.title}>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
          Profile Creation
        </Text>
      </View>
      <ScrollView
        style={{ width: "100%" }}
        automaticallyAdjustContentInsets={true}
        alwaysBounceVertical={true}
        bounces={true}
        contentInsetAdjustmentBehavior={"scrollableAxes"}
      >
        <View style={styles.profilContainer}>
          <View style={{ width: "100%", height: "35%" }}>
            <Image
              style={styles.camera}
              source={{ uri: image }}
            ></Image>
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
          <View style={styles.inputContainer}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 15,
                color: "#8F5CD1",
              }}
            >
              My profile
            </Text>

            <TextInput
              placeholder="Name"
              returnKeyType="next"
              value={profileName}
              onChangeText={(name) =>setProfileName(name)}
              style={styles.inputProfile}
            ></TextInput>



            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="Date of birth"
                keyboardType="numeric"
                value={date}
                maxLength={10}
                onChangeText={handleDate}
                style={styles.inputProfile}
              ></TextInput>

              <SelectList
                setSelected={setProfileGender}
                
                data={data}
                save="value"
                placeholder="Gender"
                searchPlaceholder="Gender"
                search={true}
                dropdownStyles={{
                  height: 120,
                  borderWidth: "none",
                  backgroundColor: "#C8C8C8",
                  marginTop: 0,
                }}
                boxStyles={styles.inputProfile}
                color="#"
              />


            </View>
            <TextInput
              placeholder="City"
              value={profileCity}
              onChangeText={(city) =>setProfileCity(city)}
              style={styles.inputProfile}
            ></TextInput>
          </View>

          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          ></View> */}

          {/* <TextInput
            style={{
              marginTop: 10,
              marginBottom: 10,
              padding: 10,
              height: 30,
              width: "90%",
              backgroundColor: "white",
              borderRadius: 8,
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
          ></TextInput> */}
          {/****************************************************************SPORT & HOBBIES ************************************************************************/}
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

            <MultipleSelectList
              label="Activities"
              setSelected={setProfileHobbies}
              data={activitiesList}
              save="value"
              labelStyles={{ fontWeight: "700", color: "#9660DA" }}
              badgeStyles={{ backgroundColor: "#9660DA" }}
              boxStyles={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                borderWidth: 1,
                borderColor: "#9660DA",
                borderRadius: 8,
              }}
 
            />

            <MultipleSelectList
              label="Sports"
              setSelected={(spt) => setSelected(spt)}
              data={sportsList}
              save="value"
              labelStyles={{ fontWeight: "700", color: "#9660DA" }}
              badgeStyles={{ backgroundColor: "#9660DA" }}
              boxStyles={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                borderWidth: 1,
                borderColor: "#9660DA",
                borderRadius: 8,
              }}
            />

            {/********************************************************************DESCRIPTION************************************************************************/}
            <View style={styles.interest}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 15,
                  color: "#8F5CD1",
                }}
              >
                Description
              </Text>

              <TextInput
                placeholder="Description"
                returnKeyType="next"
                multiline={true}
                style={styles.inputProfile}
              ></TextInput>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                navigation.navigate("TabNavigator");
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView style={{ backgroundColor: "white" }} />
    </View>
  );
};

export default ProfileCreationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  profilContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 500,
    paddingRight: 28,
    paddingLeft: 28,
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
    height: 40,
  },
  title: {
    width: "100%",
    backgroundColor: "#9660DA",
    alignItems: "center",
    paddingBottom: 10,
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
    padding: 10,
    width: "40%",
    backgroundColor: "#C8C8C8",
  },
  nextButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    width: "40%",
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
