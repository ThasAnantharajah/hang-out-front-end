import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import moment from "moment";
import "moment/locale/fr";
import io from "socket.io-client";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BACK_END_URL } from "../config";
import { useFocusEffect } from '@react-navigation/native';




const MessagesScreen = ({ route }) => {
  const navigation = useNavigation();
  const nameChat = useSelector((state) => state.user.user.chatScreenName);
  const receiverPhoto = useSelector((state) => state.user.user.receiverPhoto);
  const { senderId, receiverId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isScreenFocused, setIsScreenFocused] = useState(false);  // Pour savoir si l'utilisateur est sur cet écran



  const fetchMessages = async () => {
    try {
      const response = await fetch(`${BACK_END_URL}/messages/discution/${senderId}/${receiverId}`);
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    }
  };

  useEffect(() => {
  const connectSocket = async () => {
    try {
      const newSocket = io(BACK_END_URL);
      setSocket(newSocket);

      // Envoyer l'ID de l'utilisateur lorsqu'il se connecte
      newSocket.emit('userConnected', senderId);

      // Gérer les messages reçus
      newSocket.on('messageReceived', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);

        // Marquer le message comme lu localement si applicable
     
        if (isScreenFocused && data.receiverId === senderId) {
            markMessageAsRead(data._id);  // Vous devez envoyer l'ID du message
            console.log('Message lu');
          }
      });
    } catch (error) {
      console.error("Erreur de connexion au socket :", error);
    }
  };

  connectSocket();
fetchMessages();
  return () => {
    if (socket) {
      socket.disconnect();
    }
  };
  
}, [receiverId, senderId]);

  useFocusEffect(
    React.useCallback(() => {
      setIsScreenFocused(true);  // Utilisateur entre dans l'écran
 

       // Notify the server that the user is viewing the conversation
    if (socket) {
      socket.emit('viewingMessages', { userId: senderId, receiverId });
    }

      return () => {
        setIsScreenFocused(false);  // Utilisateur quitte l'écran
         if (socket) {
        socket.emit('stoppedViewingMessages', { userId: senderId, receiverId });
      }
      };
    }, [socket])
  );




  // Function to potentially mark a message as read on the server (add implementation based on your server API)
  const markMessageAsRead = async (messageId) => {
   
    try {
      //  fetch(`<span class="math-inline">\{BACK\_END\_URL\}/messages/</span>{messageId}`
      const response = await fetch(`${BACK_END_URL}/messages/${messageId}`, { 
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });

      if (response.ok) {
        console.log("Message marked as read successfully"); // Handle success (optional)
      } else {
        console.error("MessageScreen Error marking message as read:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  //   const sendMessage = () => {
  //   if (socket && newMessage) {
  //     socket.emit("sendMessage", { senderId, receiverId, content: newMessage });
  //     setNewMessage("");
  //   }
  // };


  const sendMessage = () => {
  if (socket && newMessage) {
    const messageData = { senderId, receiverId, content: newMessage };
    socket.emit("sendMessage", messageData); // Émettre le message
    setMessages((prevMessages) => [...prevMessages, { ...messageData, _id: Date.now(), timestamp: Date.now() }]); // Ajouter le message localement pour l'affichage
    setNewMessage(""); // Réinitialiser le champ de saisie
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
          <FontAwesome
            style={{
              color: "white",
              fontSize: 35,
              marginRight: 160,
              marginLeft: 10,
            }}
            name="angle-left"
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "white", alignSelf: "center" }}>
          {nameChat}
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <FlatList
           
            data={messages}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            renderItem={({ item, index }) =>
              item.sender === senderId ? (
                <View style={styles.messageSendContainer} key={`${item._id}-${index}`}>
                  <View style={styles.messagesSend}>
                    <Text style={{ color: "black" }}>{item.content}</Text>
                  </View>
                  <Text style={{ color: "black", alignSelf: "flex-end", marginRight: 20, marginTop: 10 }}>
                    {moment(item.timestamp).fromNow()}
                  </Text>
                </View>
              ) : (
                <View style={styles.messageReceiveContainer} key={`${item._id}-${index}`}>
                  <View style={{ alignSelf: "flex-start" }}>
                    <Image style={styles.img} source={{ uri: receiverPhoto }} />
                  </View>
                  <View style={{ paddingTop: 15 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                      <Text style={{ color: "dodgerblue", fontWeight: "600" }}>{nameChat}</Text>
                      <Text style={{ color: "black" }}>{moment(item.timestamp).fromNow()}</Text>
                    </View>
                    <View style={styles.messagesReceive}>
                      <Text style={{ color: "black" }}>{item.content}</Text>
                    </View>
                  </View>
                </View>
              )
            }
          />
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={94}
          style={{ width: "100%", justifyContent: "center", flexDirection: "row", alignItems: "center" }}
        >
          <View style={styles.sendItems}>
            <TouchableOpacity
              style={{
                height: 50,
                color: "white",
                backgroundColor: "white",
                marginRight: -130,
                marginLeft:10,
                borderRadius: "50%",
                padding: 10,
              }}
              
            >
              <FontAwesome style={{ fontSize: 40, color: "#9660DA" }} name="smile-o" />
            </TouchableOpacity>
            <TextInput
              style={{ width: "100%", fontSize: 20 }}
              placeholder="Tapez votre message"
              value={newMessage}
              onChangeText={setNewMessage}
            
            />
            <TouchableOpacity
              style={{
                height: 50,
                color: "white",
                backgroundColor: "#9660DA",
                marginLeft: -130,
                borderRadius: "50%",
                padding: 10,
              }}
              onPress={sendMessage}
            >
              <FontAwesome style={{ fontSize: 30, color: "white" }} name="send" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default MessagesScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9660DA",
  },
  title: {
    height: "auto",
    width: "100%",
    backgroundColor: "#9660DA",
    paddingBottom: 10,
    flexDirection: "row",
  },
  sendItems: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "95%",
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#9660DA",
    position: "relative",
    backgroundColor: "white",
    height: 60,
  },
  messageSendContainer: {
    marginTop: 20,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 20,
    alignItems: "center",
    flexDirection: "column",
    alignContent: "flex-end",
    alignSelf: "flex-end",
  },
  img: {
    height: 55,
    width: 55,
    borderRadius: 20,
    borderWidth: 2.5,
    borderColor: "#8F5CD1",
    marginRight: 10,
  },
  messagesSend: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
    height: 55,
    backgroundColor: "white",
    alignSelf: "flex-start",
    width: "auto",
    padding: 15,
    borderRadius: 15,
    justifyContent: "center",
    marginRight: 20,
  },
  messageReceiveContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  messagesReceive: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
    height: 55,
    backgroundColor: "#F2F3F5",
    alignSelf: "flex-end",
    width: "auto",
    padding: 15,
    borderRadius: 15,
    justifyContent: "center",
    minWidth: 100,
  },
  emojiModal: {
    flex: 1,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: 475,
    backgroundColor: "dodgerblue",
  },
});









  // useEffect(() => {
  //   const connectSocket = () => {
  //     try {
  //       const newSocket = io(BACK_END_URL);
  //       setSocket(newSocket);
  //       newSocket.on("messageReceived", (data) => {
  //         setMessages((prevMessages) => [...prevMessages, data]);
  //       });
  //       return () => {
  //         if (newSocket) {
  //           newSocket.off("messageReceived");
  //           newSocket.disconnect();
  //         }
  //       };
  //     } catch (error) {
  //       console.error("Erreur de connexion au socket :", error);
  //     }
  //   };
  //   connectSocket();
  // }, []);

  

  // const fetchMessages = async () => {
  //   try {
  //     const response = await fetch(`${BACK_END_URL}/messages/discution/${senderId}/${receiverId}`);
  //     const data = await response.json();
  //     setMessages(data.messages);
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des messages :", error);
  //   }
  // };

  // const sendMessage = () => {
  //   if (socket && newMessage) {
  //     socket.emit("sendMessage", { senderId, receiverId, content: newMessage });
  //     setNewMessage("");
  //   }
  // };

  // useEffect(() => {
  //   fetchMessages();
   
  
  // }, []);

  //  useEffect(() => {
  //   const connectSocket = async () => {
  //     try {
  //       const newSocket = io(BACK_END_URL);
  //       setSocket(newSocket);

  //       // Handle incoming messages
  //       newSocket.on("messageReceived", (data) => {
  //         console.log('data',data)
  //         setMessages((prevMessages) => [...prevMessages, data]);
  //         // Mark the received message as read if applicable (implement based on your server logic)
  //         markMessageAsRead(data.senderId); // Potential addition
  //       });

       
  //     } catch (error) {
  //       console.error("Erreur de connexion au socket :", error);
  //     }
  //   };
  //   connectSocket();

  //   // Fetch messages on initial render
  //   fetchMessages();
  //  }, [receiverId]); // Dependency includes receiverId