import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { Image } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useDispatch, useSelector } from "react-redux";
import { signupState } from "../reducers/signup";
import { useState, useEffect } from "react";
import { BACK_END_URL } from "../config";

const regExpMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regExpUser = /^[a-zA-Z][a-zA-Z0-9._]{2,14}$/;
const regExpPassword = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/;

const LoginScreen = ({ navigation }) => {
  const [log, setLog] = useState(1);

  const [username, setUsername] = useState("");
  const [usernameVerify, setUsernameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);

  const handleSubmit = (e) => {
    console.log(email);
    const data = { username, email, password };

    fetch(BACK_END_URL + `/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("db");
      });

    setEmailVerify(!regExpMail.test(email));

    setUsernameVerify(!regExpUser.test(username));

    setPasswordVerify(!regExpPassword.test(password));

    //  console.log(emailVerify)
    //  console.log(usernameVerify)
    //  console.log(passwordVerify)

    //  if (emailVerify && usernameVerify && passwordVerify){

    //   navigation.navigate("TabNavigator")
    //  }
  };

  const handleLogIn = () => {
    const data = { username, password, email };
    fetch(BACK_END_URL + `/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
         
          navigation.navigate("TabNavigator");
        }

      });
      
  };

  return (
    <>
      {log === 1 ? (
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1, alignItems: "center", marginTop: 40 }}>
            <Text style={styles.logTitle}>Sign Up</Text>

            <View style={styles.inputContainer}>
              {/************************************Mail*************************************/}
              <View style={styles.inputSection}>
                <Text style={styles.inputTitle}>Mail</Text>
                <View style={styles.boxContainer}>
                  <FontAwesome style={styles.fontAwesome} name="envelope-o" />
                  <TextInput
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoComplete="email"
                    style={styles.boxRadius}
                    placeholder="Email"
                    placeholderTextColor="#C0C0C0"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                  />
                </View>
                {emailVerify && (
                  <Text style={styles.error}>Email invalide</Text>
                )}
              </View>

              {/****************************User-name****************************************/}
              <View style={styles.inputSection}>
                <Text style={styles.inputTitle}>Username</Text>
                <View style={styles.boxContainer}>
                  <FontAwesome style={styles.fontAwesome} name="user" />
                  <TextInput
                    style={styles.boxRadius}
                    placeholder="Username"
                    placeholderTextColor="#C0C0C0"
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                  />
                </View>
                {usernameVerify && (
                  <Text style={styles.error}>Username invalide</Text>
                )}
              </View>

              {/**********************************Password***********************************/}
              <View style={styles.inputSection}>
                <Text style={styles.inputTitle}>Password</Text>
                <View style={styles.boxContainer}>
                  <FontAwesome style={styles.fontAwesome} name="lock" />
                  <TextInput
                    secureTextEntry={true}
                    style={styles.boxRadius}
                    placeholder="Password"
                    placeholderTextColor="#C0C0C0"
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                  />
                </View>
                {passwordVerify && (
                  <Text style={styles.error}>Password invalide</Text>
                )}
              </View>

              {/**********************************Sign-Up***********************************/}
              <TouchableOpacity
                style={styles.signup}
                onPress={() => handleSubmit()}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>

              <Text style={{ marginBottom: 20, marginTop: 20, color: "white" }}>
                OR
              </Text>

              {/**********************************Google***********************************/}
              <TouchableOpacity style={styles.boxRadius}>
                <Image
                  style={styles.googleImg}
                  source={require("../assets/google.png")}
                />
                <Text style={styles.googleText}>Sign up with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setLog(2)}>
                <Text style={{ marginTop: 60, color: "white" }}>
                  Already have a account?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 1, alignItems: "center", marginTop: 40 }}>
            <Text style={styles.logTitle}>Login</Text>

            <View style={styles.inputContainer}>
              {/****************************User-name****************************************/}
              <View style={styles.inputSection}>
                <Text style={styles.inputTitle}>Username</Text>
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
                <Text style={styles.inputTitle}>Password</Text>
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
                  style={{ marginBottom: 30, marginTop: 0, color: "white" }}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>

              {/**********************************Login***********************************/}
              <TouchableOpacity
                style={styles.signup}
                onPress={() => handleLogIn()}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
                >
                  Login
                </Text>
              </TouchableOpacity>

              <Text style={{ marginBottom: 20, marginTop: 20, color: "white" }}>
                OR
              </Text>

              <TouchableOpacity onPress={() => setLog(1)}>
                <Text style={{ color: "white" }}>SIGN UP</Text>
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
    backgroundColor: "#9660DA",
   
  },
  logTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  inputSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  boxContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },
  boxRadius: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    paddingHorizontal: 45,
    borderColor: "white",
    position: "relative",
  },
  fontAwesome: {
    position: "absolute",
    fontSize: 20,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 16,
    padding: 0,
    color: "white",
  },
  inputTitle: {
    position: "absolute",
    marginTop: -10,
    backgroundColor: "#9660DA",
    paddingRight: 4,
    paddingLeft: 4,
    zIndex: 5,
    fontWeight: "bolder",
    color: "white",
  },

  signup: {
    backgroundColor: "#9660DA",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    paddingHorizontal: 45,
    borderColor: "white",
    position: "relative",
  },
  googleImg: {
    width: 30,
    height: 30,
    marginRight: 50,
  },
  googleText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  error: {
    color: "purple",
    marginTop: 10,
  },

  // flex-row items-center w-full p-5 border-2 mb-10 border-purple-700 rounded-full
});

export default LoginScreen;
