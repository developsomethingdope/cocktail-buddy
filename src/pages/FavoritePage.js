import { useEffect } from "react";
import { useGlobalContext } from "../Context";
import NavLinks from "../components/NavLinks";
import CocktailList from "../components/CocktailList";
import BackToTop from "../components/BackToTop";

function FavoritePage() 
{
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const { setIsLoading, setIsLinkToDetail, favoriteIdsArray, favoriteCocktailsArray, setFavoriteCocktailsArray, isIdsArrayChanged, setIsIdsArrayChanged } = useGlobalContext();
  //console.log('favorite page: ', isIdsArrayChanged);

  function addDataToList(data, list)
  {
    const { drinks } = data;
    const newCocktailList = drinks.map((drinkItem) => 
    {
      const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drinkItem;
      return {
        id: idDrink,
        name: strDrink,
        type: strAlcoholic,
        glass: strGlass,
        image: strDrinkThumb,
        isFavorite: true
      };
    });
    const cocktailItem = newCocktailList[0];
    list.push(cocktailItem);
    return list;
  }

  async function fetchDataFavorite(idArray)
  {
    setIsLoading(true);
    try
    {
      var newCocktailList = [];
      for (const idItem of idArray)
      {
        const completeUrl = `${url}${idItem}`;
        const response = await fetch(completeUrl);
        const dataJson = await response.json();
        newCocktailList = addDataToList(dataJson, newCocktailList);
      }
      //console.log(newCocktailList);
      setFavoriteCocktailsArray(newCocktailList);
    }
    catch(error)
    {
      console.log(error);
    }
    setIsLoading(false);
  }
  
  useEffect(() => 
  {
    //// for initial render
    if (favoriteIdsArray.length > 0 && isIdsArrayChanged)
    {
      fetchDataFavorite(favoriteIdsArray);
      setIsIdsArrayChanged(false);
    }
    setIsLinkToDetail(true);
  }, []);
  
  return (
    <div>
      <div className="page-top">
        <div className="links"><NavLinks linkType="homeLink" /></div>
        <div className="title">Favorite cocktails</div>
      </div>
      {
        favoriteIdsArray.length < 1 &&
        <div className="page-bottom section-favorite section-favorite-none">
          <div className="section-subtitle">None found</div>
          <p>Just click on Home and pick some cocktails.</p>
        </div>
      }
      {
        favoriteIdsArray.length > 0 &&
        <div className="page-bottom section-favorite">
          <CocktailList componentCocktailsArray={favoriteCocktailsArray} />
          <BackToTop />
        </div>
      }
    </div>
  );
}

export default FavoritePage;
