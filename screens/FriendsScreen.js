import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  Modal,
} from "react-native";

import { useState } from "react";
import { useSelector } from "react-redux";
import { updateUserId } from "../reducers/users";

const FriendsScreen = () => {
  const [showModal, setShowModal] = useState(false);

  const friend = useSelector((state) => state.userIds.userId);
  console.log("friendscreen:", friend);

  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalWindow}>
            <Text style={styles.modalText}> Confirmez-vous supression ? </Text>
            <Text style={styles.modalName}> Julie</Text>

            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.vBtn}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Confirmer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cBtn}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Annuler
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.title}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Friends
        </Text>
      </View>

      <View style={styles.msgContainair}>
        <View style={styles.friendsContainer}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 274,
            }}
          >
            <View>
              <Image
                style={styles.img}
                source={require("../assets/face.jpg")}
              ></Image>
            </View>

            <View style={styles.nbrMessage}>
              <Text
                style={{ fontSize: 12, color: "white", alignSelf: "center" }}
              >
                6 messages
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "80%",
              paddingLeft: 64.5,
              position: "absolute",
              marginTop: 6,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Julie,</Text>
            <Text>28 ans</Text>
          </View>
          <View style={styles.interestContainer}>
            <View style={styles.interest}>
              <Text>Vélo</Text>
            </View>
          </View>
          <Text
            style={{
              paddingLeft: 40,
              marginTop: 7,
              marginBottom: 7,
              fontWeight: "bold",
            }}
          >
            Activités ensemple : 3
          </Text>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingLeft: 40,
              paddingRight: 40,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity style={styles.msg}>
              <Text style={{ color: "#9879C3", fontWeight: "bold" }}>
                Message
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.delete}
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Text style={{ color: "#AE6C6B", fontWeight: "bold" }}>
                Supprimer cet ami
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.friendsContainer}>
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "space-between",
              width: "100%",
              gap: 274,
            }}
          >
            <View>
              <Image
                style={styles.img}
                source={require("../assets/face.jpg")}
              ></Image>
            </View>

            <View style={styles.nbrMessage}>
              <Text
                style={{ fontSize: 12, color: "white", alignSelf: "center" }}
              >
                6 messages
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "80%",
              paddingLeft: 64.5,
              position: "absolute",
              marginTop: 6,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Annas,</Text>
            <Text>28 ans</Text>
          </View>
          <View style={styles.interestContainer}>
            <View style={styles.interest}>
              <Text>Vélo</Text>
            </View>
          </View>
          <Text
            style={{
              paddingLeft: 40,
              marginTop: 7,
              marginBottom: 7,
              fontWeight: "bold",
            }}
          >
            Activités ensemple : 3
          </Text>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingLeft: 40,
              paddingRight: 40,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity style={styles.msg}>
              <Text style={{ color: "#9879C3", fontWeight: "bold" }}>
                Message
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.delete}>
              <Text style={{ color: "#AE6C6B", fontWeight: "bold" }}>
                Supprimer cet ami
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{ fontStyle: "italic", textAlign: "center", color: "grey" }}
        >
          Qui dit nouvelles sorties ...{"\n"} dit de nouveaux amis !{"\n"}😊
        </Text>

        <Text
          style={{ fontStyle: "italic", textAlign: "center", color: "grey" }}
        >
          {friend}
        </Text>

        <Text
          style={{ fontStyle: "italic", textAlign: "center", color: "grey" }}
        >
          {friend}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 35 : 0,
    backgroundColor: "#4B3196",
  },

  title: {
    height: "auto",
    width: "100%",
    backgroundColor: "#4B3196",
    alignItems: "center",
    paddingBottom: 10,
  },

  msgContainair: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 28,
    paddingRight: 28,
    paddingLeft: 28,
  },

  friendsContainer: {
    height: "20%",
    width: "100%",
    backgroundColor: "#D8D8D8",
    borderRadius: 25,
    borderWidth: 2.5,
    borderColor: "#4B3196",
    marginBottom: 30,
  },

  img: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: "#8F5CD1",
    position: "absolute",
    marginTop: -20,
    marginLeft: -20,
  },

  nbrMessage: {
    fontSize: 12,
    color: "white",
    backgroundColor: "#4B3196",
    padding: 5,
    borderRadius: 10,
    marginTop: -5,
  },
  interestContainer: {
    marginTop: 20,
    paddingLeft: 40,
    flexDirection: "row",
  },
  interest: {
    backgroundColor: "#AA8BD4",
    borderRadius: 50,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 8,
    paddingLeft: 8,
  },
  msg: {
    backgroundColor: "white",
    borderRadius: 50,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 8,
    paddingLeft: 8,
    marginRight: 20,
  },
  delete: {
    backgroundColor: "white",
    borderRadius: 50,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 8,
    paddingLeft: 8,
  },
  modal: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  modalWindow: {
    height: 150,
    width: "90%",
    borderRadius: 25,
    borderWidth: 2.5,
    borderColor: "#4B3196",
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  vBtn: {
    alignItems: "center",
    width: "40%",
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#AA8BD4",
  },
  cBtn: {
    alignItems: "center",
    width: "40%",
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#4B3196",
  },
});
