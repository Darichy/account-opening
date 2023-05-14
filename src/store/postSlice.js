import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postRefetch: false,
  },
  reducers: {
    setPostRefetch: (state) => {
      state.postRefetch = !state.postRefetch;
    },
  },
});

export const { setPostRefetch } = postSlice.actions;

export default postSlice.reducer;
