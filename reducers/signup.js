import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
   };


   export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        signupState : (state, action) =>{
            state.value = !action.payload
        },

        signupCloseState: (state, action)=>{
            state.value = false
        }
    }
   })

export const {signupState, signupCloseState} = signupSlice.actions;
export default signupSlice.reducer;
