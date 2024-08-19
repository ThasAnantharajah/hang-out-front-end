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
import ProfileCreationScreen from "./ProfileCreationScreen";

const regExpMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regExpUser = /^[a-zA-Z][a-zA-Z0-9._]{4,14}$/;

const LoginScreen = ({ navigation }) => {
  const [log, setLog] = useState(2);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formValidation, setFormValidation] = useState(false);
  const [loginValidation, setLoginValidation] = useState(false);

 


  const validatePassword = (pwd) => {
    let errorType = "";

    if (pwd === "") {
      errorType = "Le mot de passe est vide";
    } else if (!/[A-Z]/.test(pwd)) {
      errorType = "Le mot de passe doit contenir au moins 1 lettre majuscule";
    } else if (!/[a-z]/.test(pwd)) {
      errorType = "Le mot de passe doit contenir au moins 1 lettre minuscule";
    } else if (!/[0-9]{2}/.test(pwd)) {
      errorType = "Le mot de passe doit contenir au moins 2 chiffres";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      errorType = "Le mot de passe doit contenir au moins un caractère spécial";
    } else if (pwd.length < 8) {
      errorType = "Le mot de passe doit contenir au moins 8 caractères";
    }

    setErrors((prev) => ({ ...prev, password: errorType }));
    setPassword(pwd);
    validationForm();
  };

  const validateEmail = (email) => {
    if (!regExpMail.test(email)) {
      setErrors((prev) => ({ ...prev, email: "email invalide" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    setEmail(email);
    validationForm();
  };

  const validateUser = (user) => {
    if (!regExpUser.test(user)) {
      setErrors((prev) => ({ ...prev, username: "username invalide" }));
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
    }
    setUsername(user);
    validationForm();
  };

  const validationForm = () => {
    const isValid =
      !errors.username &&
      username.length >= 4 &&
      !errors.email &&
      regExpMail.test(email) &&
      !errors.password &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]{2}/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
      password.length >= 8;
    setFormValidation(isValid);
  };


   const handleSubmit = (e) => {
   
    if (!formValidation) { 
      const data = { username, email, password };
    fetch(BACK_END_URL + `/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {});}
   
  };


    const validationLogin = () => {
    const isValid =
      !errors.username &&
      username.length >= 4 &&
      !errors.password &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]{2}/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
      password.length >= 8;
    setLoginValidation(isValid);
  };

  const handleLogIn = () => {
    
     if (!loginValidation) { 
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
console.log('first')
     }
    
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
                    onChangeText={validateEmail}
                  />
                </View>
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : (
                  ""
                )}
              </View>

              {/****************************User-name****************************************/}
              <View style={styles.inputSection}>
                <View style={styles.boxContainer}>
                  <FontAwesome style={styles.fontAwesome} name="user" />
                  <TextInput
                    style={styles.boxRadius}
                    placeholder="Username"
                    placeholderTextColor="#C0C0C0"
                    value={username}
                    onChangeText={validateUser}
                  />
                </View>
                {errors.username ? (
                  <Text style={styles.errorText}>{errors.username}</Text>
                ) : null}
              </View>

              {/**********************************Password***********************************/}
              <View style={styles.inputSection}>
                <View style={styles.boxContainer}>
                  <FontAwesome style={styles.fontAwesome} name="lock" />
                  <TextInput
                    secureTextEntry={true}
                    style={styles.boxRadius}
                    placeholder="Password"
                    placeholderTextColor="#C0C0C0"
                    value={password}
                    onChangeText={validatePassword}
                  />
                </View>
              </View>

              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : (
                ""
              )}

              {/**********************************Sign-Up***********************************/}
              <TouchableOpacity
                style={styles.signup}
                onPress={() => handleSubmit()}
                disabled={formValidation}
              >
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

              <TouchableOpacity
                style={styles.googleBoxRadius}
                onPress={() => navigation.navigate("ProfileCreationScreen")}
              >
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
                <View style={styles.boxContainer}>
                  <FontAwesome style={styles.fontAwesome} name="user" />
                  <TextInput
                    style={styles.boxRadius}
                    placeholder="Username"
                    placeholderTextColor="#C0C0C0"
                    value={username}
                    onChangeText={validateUser}
                  />
                </View>
                {errors.username ? (
                  <Text style={styles.errorText}>{errors.username}</Text>
                ) : null}
              </View>
              {/**********************************Password***********************************/}

              <View style={styles.inputSection}>
                <View style={styles.boxContainer}>
                  <FontAwesome style={styles.fontAwesome} name="lock" />
                  <TextInput
                    secureTextEntry={true}
                    style={styles.boxRadius}
                    placeholder="Password"
                    placeholderTextColor="#C0C0C0"
                    value={password}
                    onChangeText={validatePassword}
                  />
                </View>
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : (
                  ""
                )}
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
                onPress={() => handleLogIn()}
                disabled={loginValidation}
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
              <TouchableOpacity
                style={styles.googleBoxRadius}
                onPress={() => navigation.navigate("ProfileCreationScreen")}
              >
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
  error: {
    color: "purple",
    marginTop: 10,
  },

  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
