import { useEffect } from "react";
import NavLinks from "../components/NavLinks";
import CocktailList from "../components/CocktailList";
import BackToTop from "../components/BackToTop";
import { useSelector, useDispatch } from "react-redux";
import { setIsLinkToDetail, setIsIdsArrayChanged, setIsUpdateFavoriteCocktailsArray } from "../redux/SliceGeneral";
import { setFavoriteCocktailsArray } from "../redux/SlicePage";

function FavoritePage() 
{
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const { favoriteIdsArray, favoriteCocktailsArray } = useSelector((state) => state.page);
  const { isIdsArrayChanged, isUpdateFavoriteCocktailsArray } = useSelector((state) => state.general);
  const reduxDispatch = useDispatch();
  //console.log('favorite page: drink: ', favoriteCocktailsArray);
  //console.log('favorite page: id: ', favoriteIdsArray);
  
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
      reduxDispatch(setFavoriteCocktailsArray(newCocktailList));
    }
    catch(error)
    {
      console.log(error);
    }
  }

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
  
  useEffect(() => 
  {
    //// for initial render
    if (isUpdateFavoriteCocktailsArray || (favoriteIdsArray.length > 0 && isIdsArrayChanged))
    {
      fetchDataFavorite(favoriteIdsArray);
      reduxDispatch(setIsIdsArrayChanged(false));
      reduxDispatch(setIsUpdateFavoriteCocktailsArray(false));
    }
    reduxDispatch(setIsLinkToDetail(true));
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
