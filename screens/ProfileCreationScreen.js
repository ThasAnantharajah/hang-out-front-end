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
} from "react-native";
import { Camera, CameraType } from "expo-camera/legacy";
import { useEffect, useState, useRef } from "react";

import * as ImagePicker from "expo-image-picker";

import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";

import FontAwesome from "@expo/vector-icons/FontAwesome";

const ProfileCreationScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);

  const [image, setImage] = useState(null);

  const [selected, setSelected] = useState("");
  const [sportsList, setSportsList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const data = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Don't want to say" },
  ];

  // const list = () => {
  //   fetch("http://localhost:3000/sports")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("test", data.sports);
  //       setSportsList(data.sports);
  //     });
  // };

  let cameraRef = useRef(null);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    console.log("Photo:", photo);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      // console.log("Result picker:", result.assets[0].uri);
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
      console.log(image);
    };
    /// upload
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: photo,
      name: "profilePicture.jpg",
      type: "image/jpeg",
    });

    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        data.result && console.log(uploaded);
      });
  };

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      if (result) {
        setHasPermission(result.status === "granted");
      }

      fetch("http://localhost:3000/activities")
        .then((res) => res.json())
        .then((data) => {
          console.log("activities test", data);
          let activityArray = data.activities.map((activity, i) => ({
            key: i,
            value: activity.name,
          }));
          console.log("activityArray:", activityArray);
          setActivitiesList(activityArray);

          fetch("http://localhost:3000/sports")
            .then((res) => res.json())
            .then((data) => {
              let sportArray = data.sports.map((sport) => sport.name);
              console.log("SportArray:", sportArray);
              setSportsList(sportArray);
            });
        });
    })();

    // others
    // list();
    // console.log("Liste des sports:", sportsList);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
          Profile Creation (1/2)
        </Text>
      </View>

      <View style={styles.profilContainer}>
        <View style={{ width: "100%", height: "35%" }}>
          {hasPermission ? (
            <Camera
              style={styles.camera}
              ref={(ref) => (cameraRef = ref)}
              type={type}
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  marginBottom: 15,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    marginBottom: 15,
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 25,
                    height: 40,
                    width: 40,
                  }}
                >
                  <TouchableOpacity title="Flip" onPress={() => takePicture()}>
                    <FontAwesome name="camera" size={25} color="#8F5CD1" />
                  </TouchableOpacity>
                </View>
              </View>
            </Camera>
          ) : (
            <View>
              <Text>No camera permission.</Text>
            </View>
          )}
        </View>

        <View>
          <Button
            title="Pick an image from camera roll"
            onPress={() => takePicture()}
          />
          {image && <Image source={{ uri: image }} />}
          {/* <Image
                  style={{ height: 50, width: 50 }}
                  source={require("../assets/blank-profile.png")}
                ></Image> */}
        </View>
        <ScrollView style={{ width: "100%" }}>
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
              style={styles.inputProfile}
            ></TextInput>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="Date of birth"
                keyboardType="numeric"
                style={styles.inputProfile}
              ></TextInput>

              <SelectList
                setSelected={(value) => setSelected(value)}
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
              style={styles.inputProfile}
            ></TextInput>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          ></View>

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
              setSelected={(activ) => setSelected(activ)}
              data={activitiesList}
              save="value"
              onSelect={() => alert(selected)}
              label="Activities"
            />

            <MultipleSelectList
              setSelected={(spt) => setSelected(spt)}
              data={sportsList}
              save="value"
              boxStyles={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#9660DA",
                borderRadius: 8,
                padding: 5,
                margin: 5,
                height: 40,
              }}
              onSelect={() => alert(selected)}
              label="Sports"
            />
            {/* <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              <View
                style={{
                  flex: 1,
                  borderWidth: 2,
                  marginVertical: 20,
                  borderRadius: 8,
                  borderColor: "#8F5CD1",
                }}
              ></View>
              <View
                style={{
                  flex: 1,
                  borderWidth: 2,
                  marginVertical: 20,
                  borderRadius: 8,
                  borderColor: "#C8C8C8",
                }}
              ></View>
            </View> */}
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
                placeholder="Name"
                returnKeyType="next"
                multiline={true}
                style={styles.inputProfile}
              ></TextInput>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "20%",
                justifyContent: "center",
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
                }}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileCreationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
    backgroundColor: "#9660DA",
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
    fontWeight: "600",
  },
});
