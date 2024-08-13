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

import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";

import FontAwesome from "@expo/vector-icons/FontAwesome";

const ProfileCreationScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);

  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Don't want to say" },
  ];

  let cameraRef = useRef(null);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    console.log(photo);
  };

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      if (result) {
        setHasPermission(result.status === "granted");
      }
    })();
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
                search={false}
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
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              onSelect={() => alert(selected)}
              label="Activities"
            />

            <MultipleSelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              onSelect={() => alert(selected)}
              label="Sports"
            />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              <View style={styles.rounded}>
                <Text>Activités manuelles</Text>
              </View>
              <View style={styles.rounded}>
                <Text>Tenis</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
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
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "20%",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity style={styles.previousButton}>
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton}>
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
