import { createSlice } from '@reduxjs/toolkit';

export const sliceGeneral = createSlice({
  name: 'general',
  initialState: {
    isLinkToDetail: false,
    isIdsArrayChanged: true,
    isUpdateFavoriteCocktailsArray: false
  },
  reducers: {
    setIsLinkToDetail: (state, action) =>
    {
      state.isLinkToDetail = action.payload;
    },
    setIsIdsArrayChanged: (state, action) =>
    {
      state.isIdsArrayChanged = action.payload;
    },
    setIsUpdateFavoriteCocktailsArray: (state, action) =>
    {
      state.isUpdateFavoriteCocktailsArray = action.payload;
    }
  }
});

export const { setIsLinkToDetail, setIsIdsArrayChanged, setIsUpdateFavoriteCocktailsArray } = sliceGeneral.actions;
export default sliceGeneral.reducer;
