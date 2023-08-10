import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});















// export const MyAuthContext = createContext(false);

// const initialState = false;

// const reducer = (state = initialState, action) => {
//   if (action.type === 'LOGIN') return true;
//   if (action.type === 'LOGOUT') return false;
// }

// export { reducer };

