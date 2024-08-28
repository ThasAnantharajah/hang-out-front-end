import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "",
    email: "",
    gender: "",
    description: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    emmailUpdate: (state, action) => {
      state.user.email.value = !action.payload;
    },
    usernameUpdate: (state, action) => {
      state.value = false;
    },
  },
});

export const { emmailUpdate, usernameUpdate } = userSlice.actions;
export default userSlice.reducer;
