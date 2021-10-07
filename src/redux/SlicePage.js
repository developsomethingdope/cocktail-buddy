import { createSlice } from '@reduxjs/toolkit';

const storageKeyLocal = 'cocktail-buddy-app-id-array';
const storageIdArrayLocal = JSON.parse(localStorage.getItem(storageKeyLocal)) || [];
export const slicePage = createSlice({
  name: 'page',
  initialState: {
    randomCocktailsArray: [],
    local_storage_key: storageKeyLocal,
    favoriteIdsArray: storageIdArrayLocal,
    favoriteCocktailsArray: [],
    isFavoriteAbout: false
  },
  reducers: {
    setRandomCocktailsArray: (state, action) =>
    {
      state.randomCocktailsArray = action.payload;
    },
    setFavoriteIdsArray: (state, action) =>
    {
      state.favoriteIdsArray = action.payload;
    },
    setFavoriteCocktailsArray: (state, action) =>
    {
      state.favoriteCocktailsArray = action.payload;
    },
    setIsFavoriteAbout: (state, action) =>
    {
      state.isFavoriteAbout = action.payload;
    }
  }
});

export const { setRandomCocktailsArray, setFavoriteIdsArray, setFavoriteCocktailsArray, setIsFavoriteAbout } = slicePage.actions;
export default slicePage.reducer;
