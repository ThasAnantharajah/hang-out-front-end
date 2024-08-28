// import React from "react";
// import {
//   Text,
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   Platform,
//   Modal,
//   ImageBackground,
// } from "react-native";



// import { useState } from "react";

// const MessagesScreen = () => {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <SafeAreaView style={styles.container}>
     
//       <View style={styles.title}>
//         <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
//           Mes messages
//         </Text>
//       </View>

    

//       <View style={{flex:1}}>
//         <ImageBackground source={require('../assets/backgrounds/background.jpeg')} style={{flex:1}}>

//         </ImageBackground>
        
//       </View>
//     </SafeAreaView>
//   );
// };

// export default MessagesScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Platform.OS === "android" ? 35 : 0,
//     backgroundColor: "#9660DA",
//   },

//   title: {
//     height: "auto",
//     width: "100%",
//     backgroundColor: "#9660DA",
//     alignItems: "center",
//     paddingBottom: 10,
//   },

//   msgContainair: {
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//     paddingTop: 28,
//     paddingBottom: 28,
//     paddingRight: 28,
//     paddingLeft: 28,
//   },

//   friendsContainer: {
//     height: "20%",
//     width: "100%",
//     backgroundColor: "#D8D8D8",
//     borderRadius: 25,
//     borderWidth: 2.5,
//     borderColor: "#4B3196",
//     marginBottom: 30,
//   },

//   img: {
//     height: 60,
//     width: 60,
//     borderRadius: 50,
//     borderWidth: 2.5,
//     borderColor: "#8F5CD1",
//     position: "absolute",
//     marginTop: -20,
//     marginLeft: -20,
//   },

//   nbrMessage: {
//     fontSize: 12,
//     color: "white",
//     backgroundColor: "#4B3196",
//     padding: 5,
//     borderRadius: 10,
//     marginTop: -5,
//   },
//   interestContainer: {
//     marginTop: 20,
//     paddingLeft: 40,
//     flexDirection: "row",
//   },
//   interest: {
//     backgroundColor: "#AA8BD4",
//     borderRadius: 50,
//     paddingTop: 3,
//     paddingBottom: 3,
//     paddingRight: 8,
//     paddingLeft: 8,
//   },
//   msg: {
//     backgroundColor: "white",
//     borderRadius: 50,
//     paddingTop: 3,
//     paddingBottom: 3,
//     paddingRight: 8,
//     paddingLeft: 8,
//     marginRight: 20,
//   },
//   delete: {
//     backgroundColor: "white",
//     borderRadius: 50,
//     paddingTop: 3,
//     paddingBottom: 3,
//     paddingRight: 8,
//     paddingLeft: 8,
//   },
//   modal: {
//     flex:1,
//     justifyContent:'center',
//     alignItems:'center',
    
   
//   },
//   modalWindow:{
//     height: 150,
//     width: "90%",
//     borderRadius: 25,
//     borderWidth: 2.5,
//     borderColor: "#4B3196",
//     backgroundColor:'white',
//     justifyContent:'space-around',
//     alignItems:'center',
//     padding:20
//   },
//   modalBtns:{
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width:'80%'
//   },
//   vBtn:{
//     alignItems:'center',
//     width:'40%',
//     borderRadius: 15,
//     padding:10,
//     backgroundColor:'#AA8BD4',
//   },
//   cBtn:{
//     alignItems:'center',
//     width:'40%',
//     borderRadius: 15,
//     padding:10,
//     backgroundColor:'#4B3196',
//   }

// });


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

import { useSelector } from 'react-redux';

const ChatScreen = ({ route }) => {
  // const { userId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [myUserId] = useState('123'); // Remplacez par l'ID de l'utilisateur actuel
  const userid = useSelector((state)=> state.userId.value)
  useEffect(() => {
    // Récupérer les messages de l'utilisateur
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/messages/${userId}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
      }
    };

    fetchMessages();
  }, [userId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await fetch('http://localhost:3000/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: myUserId,
            receiverId: userId,
            text: newMessage,
          }),
        });

        if (response.ok) {
          const message = await response.json();
          setMessages([...messages, { senderId: myUserId, receiverId: userId, text: newMessage, createdAt: new Date() }]);
          setNewMessage('');
        } else {
          console.error('Erreur lors de l\'envoi du message');
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi du message :', error);
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, alignSelf: item.senderId === myUserId ? 'flex-end' : 'flex-start' }}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Écrire un message..."
      />
      <Button title="Envoyer" onPress={handleSendMessage} />
      <TouchableOpacity>
        <Text>TEST</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatScreen;