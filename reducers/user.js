import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: "",
    username: "",
    email: "",
    name: "",
    gender: "",
    sports: [],
    activities: [],
    age: "",
    city: "",
    desc: "",
    photo: "",
    chatScreenName:"",
    userprofilePic,
    receiverPhoto,
    
  },
   
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    emailUpdate: (state, action) => {
      state.user.email = action.payload;
    },
    usernameUpdate: (state, action) => {
      state.user.username = action.payload;
    },
    nameUpdate: (state, action) => {
      state.user.name = action.payload;
    },
    ageUpdate: (state, action) => {
      state.user.age = 32;
      // have to convert string to date, then date calculation to get age
      // use moment.js maybe
    },
    cityUpdate: (state, action) => {
      state.user.city = action.payload;
    },
    descUpdate: (state, action) => {
      state.user.desc = action.payload;
    },
    genderUpdate: (state, action) => {
      state.user.gender = action.payload;
    },
    sportsUpdate: (state, action) => {
      state.user.sports = [action.payload];
    },
    activitiesUpdate: (state, action) => {
      state.user.activities = [action.payload];
    },
    photoUpdate: (state, action) => {
      state.user.photo = action.payload;
    },
    friendsUpdate: (state, action) => {
      state.user.friends = action.payload;
    },
    updateUserId: (state, action) => {
      state.user.userId = action.payload;
    },
    friendsNameUpdate: (state, action) => {
      state.user.friendsInfos.name = action.payload;
    },
    chatName: (state, action) => {
      state.user.chatScreenName = action.payload;
    },
    userprofilePic: (state, action) => {
      state.user.userprofilePic = action.payload;
    },
    receiverPhoto: (state,action) => {
      state.user.receiverPhoto = action.payload
    }

   

  },
});

export const {
  emailUpdate,
  usernameUpdate,
  nameUpdate,
  cityUpdate,
  ageUpdate,
  descUpdate,
  genderUpdate,
  sportsUpdate,
  activitiesUpdate,
  photoUpdate,
  friendsUpdate,
  updateUserId,
  friendsNameUpdate,
  friendsIdUpdate,
  chatName,
  userprofilePic,
  receiverPhoto

} = userSlice.actions;
export default userSlice.reducer;
