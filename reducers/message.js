import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: {
     senderId: "",
     receiverId: "",
     nbrOfMessage: 0,
     receivedMessage: []

    
  },
   
};

export const messagesSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    senderId: (state, action) => {
      state.message.senderId = action.payload;
    },
    receiverId: (state, action) => {
      state.message.receiverId = action.payload;
    },
    receivedMessage: (state, action) => {
      state.receivedMessage = action.payload;
    },
    
  nbrOfMessage: (state, action) => {
  state.nbrOfMessage = action.payload;
  // Vérifier la valeur après la mise à jour
},
    
  },
});

export const {
  senderId,
  receiverId,
  nbrOfMessage,
  receivedMessage
} = messagesSlice.actions;
export default messagesSlice.reducer;
