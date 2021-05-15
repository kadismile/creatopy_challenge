import { createSlice } from "@reduxjs/toolkit";
import {UserType} from '../Types'


const initialState: UserType = {
    name: "",
    email: "",
    accessToken: ""
}
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {initialState},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = action.payload;
    },
  },
});


export const login =  (data : UserType) => {
  const { accessToken, email, name } = data
  return (dispatch: any) => {
    dispatch(setUser({ accessToken, email, name }))
  };
};

/*export const logout =  () => {
  return (dispatch: any) => {
    dispatch(setUser({ accessToken: null }))
  };
};*/

export const { setUser, logout } = userSlice.actions;
export const selectUser = (state: any) => state.user.user;

export default userSlice.reducer;
