import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portofolioData: null,
    reloadData: false
  },
  reducers: {
    ShowLoading: (state, action) => {
      state.loading = true;
    },
    HideLoading: (state, action) => {
      state.loading = false;
    },
    SetPortofolioData: (state, action) => {
      state.portofolioData = action.payload;
    },
    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    }
  }
});

export default rootSlice.reducer;
export const { ShowLoading, HideLoading, SetPortofolioData, ReloadData } =
  rootSlice.actions;
