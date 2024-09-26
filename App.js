import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ProfilScreen from "./screens/ProfilScreen";
import EventsScreen from "./screens/EventsScreen";
import CalendarScreen from "./screens/CalendarScreen";
import FriendsScreen from "./screens/FriendsScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileCreationScreen from "./screens/ProfileCreationScreen";

import MessagesScreen from "./screens/MessagesScreen";

//Google Auth
import { GoogleLogin } from "@react-oauth/google";

import LoginScreen from "./screens/LoginScreen";
import EventCreationScreen from "./screens/EventCreationScreen";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

// import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// reducers imports
import signup from "./reducers/signup";
import user from "./reducers/user";
import message from "./reducers/message";
import { nbrOfMessage} from "./reducers/message";


const reducers = combineReducers({ signup, user, message });
const persistConfig = { key: "hangoutStorage", storage: AsyncStorage };
import { beginAsyncEvent } from "react-native/Libraries/Performance/Systrace";



// const [number, setNumber] = useState('')

  // useEffect(() => {
  //    const nbrMessage = useSelector((state) => state.message.message.nbrOfMessage);
  //    setNumber(nbrMessage)
  // }, [nbrOfMessage]);

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
 


const TabNavigator = () => {
const nbr = useSelector((state) => state.message.nbrOfMessage);
console.log('reducer',nbr);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "";
          let backIconColor;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Friends":
              iconName = "users";
              break;
            case "Events":
              iconName = "search";
              break;
            case "Calendar":
              iconName = "calendar-plus-o";
              break;
            case "Profile":
              iconName = "user";
              break;
            case "Messages":
              iconName = "comments";
              break;
            case "ProfileCreation":
              iconName = "user";
              break;
            case "Messages":
              iconName = "comments";
              break;
            case "ProfilCreation":
              iconName = "user";
              break;
          }

          if (focused) {
            backIconColor = "rgba(176, 144, 217, 0.4)";
          } else {
            backIconColor = "rgba(151, 151, 151, 0.2)";
          }

          return (
            <View
              style={{
                alignItems: "center",
                height: 30,
                width: 50,
                borderRadius: 18,
                backgroundColor: backIconColor,
                marginTop: 8,
                opacity: 0.8,
              }}
            >
              <FontAwesome
                name={iconName}
                size={size}
                color={color}
                style={{
                  paddingTop: 2,
                }}
              />
           
            </View>
          );
        },
        tabBarStyle: {
          position: "absolute",
          height: 90,
          backgroundColor: "white",
          // borderTopWidth: 0.5,
          // borderTopColor: "#B090D9",
          paddingBottom: 20,
          paddingTop: 5,
          borderTopLeftRadius: "25%",
          borderTopRightRadius: "25%",

          shadowColor: "#767577",
          shadowOffset: { width: -2, height: 10 },
          shadowOpacity: 1,
          shadowRadius: 20,
        },
        tabBarActiveTintColor: "#4B3196",

        tabBarInactiveTintColor: "#767577",
        headerShown: false,
        tabBarLabelStyle: { fontWeight: "700", fontSize: 10, marginBottom: 6 },
        tabBarOptions: {
          activeBackgroundColor: "blue",
          inactiveBackgroundColor: "grey",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{ tabBarBadge: nbr > 0 ? nbr : null }}
      />
      <Tab.Screen name="ProfileCreation" component={ProfileCreationScreen} />
      <Tab.Screen name="Profile" component={ProfilScreen} />
      {/* <Tab.Screen name="Messages" component={MessagesScreen} /> */}
      {/* <Tab.Screen name="Messages" component={MessagesListScreen} /> */}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={LoginScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="Messages" component={MessagesScreen} />
            <Stack.Screen
              name="ProfileCreationScreen"
              component={ProfileCreationScreen}
            />
            <Stack.Screen name="EventsScreen" component={EventsScreen} />
            <Stack.Screen
              name="EventCreationScreen"
              component={EventCreationScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  bottomTab: {
    padding: 0,
  },
});
