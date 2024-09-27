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
import moment from "moment";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatName, receiverPhoto } from "../reducers/user";
import { BACK_END_URL } from "../config";

const FriendsScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user.user.friends);
  const senderId = useSelector((state) => state.user.user.userId);
  const dispatch = useDispatch();
  const ReciveunreadMessages = useSelector(
    (state) => state.message.receivedMessage
  );

  //   const markMessagesAsRead = async (messageIds) => {
  //   try {
  //     for (let messageId of messageIds) {
  //       console.log('messageids friendsscreen', messageId);
  //       await fetch(BACK_END_URL + `/messages/markMessages/${messageId}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //     }
  //     console.log("friendsscreen Messages marked as read ");
  //   } catch (error) {
  //     console.error("friendsScreen Error marking messages as read:", error);
  //   }
  // };

  const markMessagesAsRead = async (messageIds) => {
    try {
      for (let messageId of messageIds) {
        const response = await fetch(
          `${BACK_END_URL}/messages/markMessages/${messageId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error marking message ${messageId}: ${response.statusText}`
          );
        }
      }
      console.log("Messages marked as read");
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalWindow}>
            <Text style={styles.modalText}> Confirmez-vous supression ? </Text>
            <Text style={styles.modalName}> name</Text>

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
          Friends
        </Text>
      </View>

      <View style={styles.msgContainair}>
        {user.map((usera) => {
          const senderid = usera.id._id;
          const filteredMessages = ReciveunreadMessages.filter(
            (message) => message.sender === senderid && !message.read
          );
          return (
            <View style={styles.friendsContainer} key={usera.id._id}>
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
                    source={{ uri: usera.id.profilePic }}
                  ></Image>
                </View>

                <View style={styles.nbrMessage}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "white",
                      alignSelf: "center",
                    }}
                  >
                    {filteredMessages.length} messages
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
                <Text style={{ fontWeight: "bold" }}>{usera.id.name}, </Text>

                <Text>{moment().diff(usera.id.birthdate, "years")} ans</Text>
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
                <TouchableOpacity
                  style={styles.msg}
                  // onPress={() => {

                  //   dispatch(chatName(usera.id.name)) &&
                  //   dispatch(receiverPhoto(usera.id.profilePic)) &&
                  //   navigation.navigate("Messages", {
                  //       senderId: senderId,
                  //       receiverId: usera.id._id,
                  //     });
                  // }}

                  onPress={async () => {
                    const unreadMessageIds = filteredMessages.map(
                      (message) => message._id
                    );

                    // Mark messages as read
                    await markMessagesAsRead(unreadMessageIds);

                    // Navigate to the Messages screen
                    dispatch(chatName(usera.id.name));
                    dispatch(receiverPhoto(usera.id.profilePic));
                    navigation.navigate("Messages", {
                      senderId: senderId,
                      receiverId: usera.id._id,
                    });
                  }}
                >
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
          );
        })}

        <Text
          style={{ fontStyle: "italic", textAlign: "center", color: "grey" }}
        >
          Qui dit nouvelles sorties ...{"\n"} dit de nouveaux amis !{"\n"}😊
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
    borderRadius: 20,
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
