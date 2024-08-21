import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ProfilScreen from "./screens/ProfilScreen";
import EventsScreen from "./screens/EventsScreen";
import CalendarScreen from "./screens/CalendarScreen";
import FriendsScreen from "./screens/FriendsScreen";
import ProfileCreationScreen from "./screens/ProfileCreationScreen";

import LoginScreen from "./screens/LoginScreen";
import EventCreationScreen from "./screens/EventCreationScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import signup from "./reducers/signup";
import { beginAsyncEvent } from "react-native/Libraries/Performance/Systrace";

const store = configureStore({
  reducer: { signup },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      //  tabBarStyle: [
      //       {left:20, right: 20, borderRadius:15, backgroundColor:'#9660DA'}, null
      //  ]
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          switch (route.name) {
            case "Friends":
              iconName = "users";
              break;
            case "Events":
              iconName = "fort-awesome";
              break;
            case "Calendar":
              iconName = "calendar-plus-o";
              break;
            case "Profil":
              iconName = "user";
              break;
          }

          return <FontAwesome name={iconName} size={size} color={color} style={{backgroundColor:'white', height:30 }} />;
        },

        tabBarStyle: {
          flex: 1,
          backgroundColor: "red",
          flexDirection: "row",
          borderRadius: 50,
          width: "95%",
          height: 70,
          position:'absolute',
          marginHorizontal: 10,
          marginBottom: 20,
          borderWidth: 2,
          borderColor: "#9660DA",
          borderBottomWidth: 2,
          borderTopWidth: 2,
          borderBottomColor: "#9660DA",
          borderTopColor: "#9660DA",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 10,
          shadowOpacity: 0.3,
          alignItems:'flex-end',
          padding:0,
        },
        tabBarActiveTintColor: "#ec6e5b",
        tabBarInactiveTintColor: "#9660DA",
        headerShown: false,
        tabBarShowLabel :false
          
        
      })}
    >
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        // options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Home" component={LoginScreen} /> */}
        {/* <Stack.Screen name="TabNavigator" component={TabNavigator} /> */}
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
        <Stack.Screen
          name="ProfileCreationScreen"
          component={ProfileCreationScreen}
        />
        <Stack.Screen name="EventsScreen" component={EventsScreen} />
        {/* <Stack.Screen
          name="EventCreationScreen"
          component={EventCreationScreen}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bottomTab: {
    borderRadius: 50,
    backgroundColor: "#9660DA",
  },
});
