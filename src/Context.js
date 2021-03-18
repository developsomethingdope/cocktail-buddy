import React, { useContext, useState } from 'react';

const AppContext = React.createContext();

function AppProvider({children}) 
{
  const [isLoading, setIsLoading] = useState(false);
  const [randomCocktailsArray, setRandomCocktailsArray] = useState([]);
  const [isLinkToDetail, setIsLinkToDetail] = useState(false);
  const local_storage_key = 'cocktail-buddy-app-id-array';
  const localStorageIdArray = JSON.parse(localStorage.getItem(local_storage_key)) || [];
  const [favoriteIdsArray, setFavoriteIdsArray] = useState(localStorageIdArray);
  const [favoriteCocktailsArray, setFavoriteCocktailsArray] = useState([]);
  const [isIdsArrayChanged, setIsIdsArrayChanged] = useState(true);
  const [isFavoriteAbout, setIsFavoriteAbout] = useState(false);
  const [isUpdateFavoriteCocktailsArray, setIsUpdateFavoriteCocktailsArray] = useState(false);

  return (
    <AppContext.Provider value={ {isLoading, setIsLoading, randomCocktailsArray, setRandomCocktailsArray, isLinkToDetail, setIsLinkToDetail, favoriteIdsArray, setFavoriteIdsArray, favoriteCocktailsArray, setFavoriteCocktailsArray, isIdsArrayChanged, setIsIdsArrayChanged, isFavoriteAbout, setIsFavoriteAbout, isUpdateFavoriteCocktailsArray, setIsUpdateFavoriteCocktailsArray} }>
      { children }
    </AppContext.Provider>
  );
}

function useGlobalContext() 
{
  return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };
