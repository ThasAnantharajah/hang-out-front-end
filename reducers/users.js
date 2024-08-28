import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

export const userSlice = createSlice({
  name: "userIds",
  initialState,
  reducers: {
    updateUserId: (state, action) => {
      state.userId = action.payload;
    },
    
  },
});

export const { updateUserId } = userSlice.actions;
export default userSlice.reducer;
