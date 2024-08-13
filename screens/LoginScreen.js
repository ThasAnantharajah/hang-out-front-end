import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import EventsScreen from "./EventsScreen";
import ProfileCreationScreen from "./ProfileCreationScreen";

const RegExpMail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const googlePng = () => {};
const LoginScreen = ({ navigation }) => {
  const [log, setLog] = useState(2);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);

  const logIn = () => {
    console.log(username, password);
  };

  const signUp = () => {
    console.log(email, username, password);
    navigation.navigate("ProfileCreationScreen");
  };

  return (
    <>
      {log === 1 ? (
        <SafeAreaView style={styles.container}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text style={styles.logTitle}>Welcome to HangOut</Text>

            <View style={styles.inputContainer}>
              {/************************************Mail*************************************/}
              <View style={styles.inputSection}>
                {/* <Text style={styles.inputTitle}>Mail</Text> */}
                <View style={styles.boxContainer}>
                  <FontAwesome style={styles.fontAwesome} name="envelope-o" />
                  <TextInput
                    keyboardType="email-address"
                    style={styles.boxRadius}
                    placeholder="Email"
                    placeholderTextColor="#C0C0C0"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                </View>
              </View>

              {/****************************User-name****************************************/}
              <View style={styles.inputSection}>
                {/* <Text style={styles.inputTitle}>Username</Text> */}
                <View style={styles.boxContainer}>
                  <FontAwesome style={styles.fontAwesome} name="user" />
                  <TextInput
                    style={styles.boxRadius}
                    placeholder="Username"
                    placeholderTextColor="#C0C0C0"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                  />
                </View>
              </View>

              {/**********************************Password***********************************/}
              <View style={styles.inputSection}>
                {/* <Text style={styles.inputTitle}>Password</Text> */}
                <View style={styles.boxContainer}>
                  <FontAwesome style={styles.fontAwesome} name="lock" />
                  <TextInput
                    secureTextEntry={true}
                    style={styles.boxRadius}
                    placeholder="Password"
                    placeholderTextColor="#C0C0C0"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>
              </View>

              {/**********************************Sign-Up***********************************/}
              <TouchableOpacity style={styles.signup} onPress={signUp}>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLog(2)}>
                <Text
                  style={{ marginTop: 30, color: "#9660DA", fontWeight: "600" }}
                >
                  Already have a account? Log in
                </Text>
              </TouchableOpacity>

              <Text
                style={{ marginBottom: 20, marginTop: 20, color: "#9660DA" }}
              >
                OR
              </Text>

              {/**********************************Google***********************************/}

              <TouchableOpacity style={styles.googleBoxRadius} onPress={signUp}>
                <Image
                  style={styles.googleImg}
                  source={require("../assets/google.png")}
                />
                <Text style={styles.googleText}>Sign up with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
            <Text style={styles.logTitle}>Welcome to HangOut</Text>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                marginTop: 30,
                marginBottom: 20,
                color: "grey",
              }}
            >
              Connect to my account
            </Text>

            <View style={styles.inputContainer}>
              {/****************************User-name****************************************/}
              <View style={styles.inputSection}>
                {/* <Text style={styles.inputTitle}>Username</Text> */}
                <View style={styles.boxContainer}>
                  <FontAwesome style={styles.fontAwesome} name="user" />
                  <TextInput
                    style={styles.boxRadius}
                    placeholder="Username"
                    placeholderTextColor="#C0C0C0"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                  />
                </View>
              </View>
              {/**********************************Password***********************************/}
              <View style={styles.inputSection}>
                {/* <Text style={styles.inputTitle}>Password</Text> */}
                <View style={styles.boxContainer}>
                  <FontAwesome style={styles.fontAwesome} name="lock" />
                  <TextInput
                    secureTextEntry={true}
                    style={styles.boxRadius}
                    placeholder="Password"
                    placeholderTextColor="#C0C0C0"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>
              </View>
              <TouchableOpacity>
                <Text
                  style={{ marginBottom: 30, marginTop: -25, color: "#9660DA" }}
                >
                  Forgotten password?
                </Text>
              </TouchableOpacity>
              {/**********************************Login***********************************/}
              <TouchableOpacity
                style={styles.signup}
                onPress={() => navigation.navigate("TabNavigator")}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                >
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLog(1)}>
                <Text
                  style={{ color: "#9660DA", fontWeight: "600", marginTop: 15 }}
                >
                  Don't have an account ? Sign up here.
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  marginBottom: 20,
                  marginTop: 60,
                  color: "#9660DA",
                  fontWeight: "800",
                }}
              >
                OR
              </Text>
              <TouchableOpacity style={styles.googleBoxRadius} onPress={signUp}>
                <Image
                  style={styles.googleImg}
                  source={require("../assets/google.png")}
                />
                <Text style={styles.googleText}>Sign in with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  logTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#9660DA",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  boxContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },
  boxRadius: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    paddingHorizontal: 45,
    borderColor: "#9660DA",
    position: "relative",
  },
  fontAwesome: {
    position: "absolute",
    fontSize: 20,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 16,
    padding: 0,
    paddingLeft: 5,
    color: "#9660DA",
  },
  inputTitle: {
    position: "absolute",
    marginTop: -10,
    backgroundColor: "#9660DA",
    paddingRight: 4,
    paddingLeft: 4,
    zIndex: 5,
    fontWeight: "bolder",
    color: "#9660DA",
  },

  signup: {
    backgroundColor: "#9660DA",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 45,
    borderColor: "white",
    position: "relative",
  },
  googleImg: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  googleText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#9660DA",
  },
  googleBoxRadius: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    paddingHorizontal: 40,
    borderColor: "#9660DA",
    position: "relative",
  },

  // flex-row items-center w-full p-5 border-2 mb-10 border-purple-700 rounded-full
});

export default LoginScreen;
