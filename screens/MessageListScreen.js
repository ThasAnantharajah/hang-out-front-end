import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const ChatListScreen = ({ navigation }) => {
  const conversations = [
    { id: '1', userName: 'Utilisateur A' },
    { id: '2', userName: 'Utilisateur B' },
    // Ajoutez plus de conversations ici
  ];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat', { userId: item.id })}
          >
            <Text style={{ fontSize: 18, padding: 10 }}>{item.userName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatListScreen;