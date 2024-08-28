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
import { useEffect, useState } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";

const ProfilScreen = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    (async () => {
      fetch("http://localhost:3000/users/search")
        .then((res) => res.json())
        .then((data) => {
          console.log("USER INFO", data);
          setUserInfo(data.userList);
          console.log(userInfo);
        });
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          My profile
        </Text>
      </View>

      <View style={styles.profilContainair}>
        <View style={{ width: "100%", height: "35%" }}>
          <Image
            style={styles.img}
            source={require("../assets/face.jpg")}
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
                style={{ fontWeight: "bold", fontSize: 18, marginRight: 5 }}
              >
                {userInfo.username}
              </Text>
              <View style={{ backgroundColor: "#4B3196", borderRadius: "50%" }}>
                <FontAwesome style={styles.check} name="check" />
              </View>
            </View>
            <Text style={{ fontSize: 18 }}>32 ans</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={{ color: "#9480BC", fontSize: 18, marginRight: 5 }}>
              Nice
            </Text>
            <TouchableOpacity>
              <FontAwesome
                style={{ fontSize: 20, color: "#9480BC" }}
                name="pencil-square-o"
              />
            </TouchableOpacity>
          </View>

          <Text style={{ marginTop: 10, marginBottom: 10 }}>
            Esprit libre en quête de moments de détente et de discution
            enrichissante. Au plaisire d'échanger rapidement 😏
          </Text>
        </View>
        <ScrollView>
          <View>
            <View style={styles.interest}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  marginBottom: 15,
                }}
              >
                Intérês & Sport
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                <View style={styles.rounded}>
                  <Text>Activités manuelles</Text>
                </View>
                <View style={styles.rounded}>
                  <Text>Tenis</Text>
                </View>
                <View style={styles.rounded}>
                  <Text>Nature</Text>
                </View>
                <View style={styles.rounded}>
                  <Text>Jeux Vidéos</Text>
                </View>
                <View style={styles.rounded}>
                  <Text>Vélo</Text>
                </View>
                <View style={styles.rounded}>
                  <Text>Pâtiserie</Text>
                </View>
                <View style={styles.rounded}>
                  <Text>Social</Text>
                </View>
                <View style={styles.rounded}>
                  <Text>Running</Text>
                </View>
                <View style={styles.rounded}>
                  <Text>Voyages</Text>
                </View>
              </View>
            </View>

            <View style={styles.pref}>
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
            </View>

            <View style={styles.review}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  marginTop: 5,
                  marginBottom: 15,
                }}
              >
                Ce que les autre pensent
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
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
                <View style={{ flexDirection: "row" }}>
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
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
    backgroundColor: "#4B3196",
  },

  title: {
    width: "100%",
    backgroundColor: "#4B3196",
    alignItems: "center",
    paddingBottom: 10,
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
});
