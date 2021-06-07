import { useEffect } from "react";
import { useGlobalContext } from "../Context";
import NavLinks from "../components/NavLinks";
import CocktailList from "../components/CocktailList";
import BackToTop from "../components/BackToTop";

function FavoritePage() 
{
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const { setIsLinkToDetail, favoriteIdsArray, favoriteCocktailsArray, setFavoriteCocktailsArray, isIdsArrayChanged, setIsIdsArrayChanged, isUpdateFavoriteCocktailsArray, setIsUpdateFavoriteCocktailsArray } = useGlobalContext();
  //console.log('favorite page: drink: ', favoriteCocktailsArray);
  //console.log('favorite page: id: ', favoriteIdsArray);

  function addDataToList(drinkItem, list)
  {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drinkItem;
    const cocktailItem = 
    {
      id: idDrink,
      name: strDrink,
      type: strAlcoholic,
      glass: strGlass,
      image: strDrinkThumb,
      isFavorite: true
    };
    list.push(cocktailItem);
    return list;
  }

  async function fetchDataFavorite(idArray)
  {
    try
    {
      var newCocktailList = [];
      for (const idItem of idArray)
      {
        const completeUrl = `${url}${idItem}`;
        const response = await fetch(completeUrl);
        const dataJson = await response.json();
        newCocktailList = addDataToList(dataJson['drinks'][0], newCocktailList);
      }
      //console.log(newCocktailList);
      setFavoriteCocktailsArray(newCocktailList);
    }
    catch(error)
    {
      console.log(error);
    }
  }
  
  useEffect(() => 
  {
    //// for initial render
    if (isUpdateFavoriteCocktailsArray || (favoriteIdsArray.length > 0 && isIdsArrayChanged))
    {
      fetchDataFavorite(favoriteIdsArray);
      setIsIdsArrayChanged(false);
      setIsUpdateFavoriteCocktailsArray(false);
    }
    setIsLinkToDetail(true);
  }, []);
  
  return (
    <div>
      <div className="page-top">
        <div className="links"><NavLinks linkType="NO_FAVORITE_LINK" /></div>
        <div className="title">Favorite cocktails</div>
      </div>
      {
        favoriteCocktailsArray.length < 1 &&
        <div className="page-bottom section-favorite section-favorite-none">
          <div className="section-subtitle">None found</div>
          <p>Just click on Home and pick some cocktails.</p>
        </div>
      }
      {
        favoriteCocktailsArray.length > 0 &&
        <div className="page-bottom section-favorite">
          <CocktailList componentCocktailsArray={favoriteCocktailsArray} />
          <BackToTop />
        </div>
      }
    </div>
  );
}

export default FavoritePage;
