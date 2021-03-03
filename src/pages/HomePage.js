import { useEffect, useState } from "react";
import NavLinks from "../components/NavLinks";
import CocktailList from "../components/CocktailList";
//// global states
import { useGlobalContext } from "../Context";
import BackToTop from "../components/BackToTop";

function HomePage() 
{
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const { isLoading, setIsLoading, randomCocktailsArray, setRandomCocktailsArray, setIsLinkToDetail, favoriteIdsArray } = useGlobalContext();
  const [randomButtonClickCount, setRandomButtonClickCount] = useState(0);
  //// number of cocktails shown on the page
  const numOfRandomCocktails = 4;
  //console.log('home page:', favoriteIdsArray);

  function addDataToList(data, list)
  {
    const { drinks } = data;
    //console.log('home page: ', drinks);
    const newCocktailList = drinks.map((drinkItem) => 
    {
      const { idDrink, strDrink, strDrinkThumb } = drinkItem;
      let isFavoriteLocal = false;
      for (const idItem of favoriteIdsArray)
      {
        if (idItem === idDrink)
        {
          isFavoriteLocal = true;
          break;
        }
      }
      return {
        id: idDrink,
        name: strDrink,
        image: strDrinkThumb,
        isFavorite: isFavoriteLocal
      };
    });
    //console.log(newCocktailList[0]);
    const cocktailItem = newCocktailList[0];
    list.push(cocktailItem);
    return list;
  }

  async function fetchDataRandom()
  {
    setIsLoading(true);
    try
    {
      //// clone array
      var newCocktailList = [...randomCocktailsArray];
      for (let i = 0; i < numOfRandomCocktails; i++)
      {
        const response = await fetch(url);
        const dataJson = await response.json();
        newCocktailList = addDataToList(dataJson, newCocktailList);
      }
      //console.log(newCocktailList);
      setRandomCocktailsArray(newCocktailList);
    }
    catch(error)
    {
      console.log(error);
    }
    setIsLoading(false);
  };

  function showOnClickHandler()
  {
    setRandomCocktailsArray([]);
    setRandomButtonClickCount(randomButtonClickCount + 1);
  }

  //// triggers for each initial render or re-render
  //// missing dependency warning always exists when state variable or function is used within useEffect?
  useEffect(() => 
  {
    //// for initial render
    if (randomCocktailsArray.length < 1)
    {
      fetchDataRandom();
    }
    setIsLinkToDetail(true);
  }, [randomButtonClickCount]);
  
  //// initial render
  //// re-render for any user interaction that updates an useState variable
  //// initial render for browser back or forward button
  return (
    <div>
      <div className="page-top">
        <div className="links"><NavLinks linkType="favoriteLink" /></div>
        <div className="title">Random cocktails</div>
      </div>
      <div className="page-bottom section-home">
        { !isLoading && <div className="button button-home" onClick={showOnClickHandler}>Show me new random cocktails</div> }
        { isLoading && <div className="button button-home-disabled">Show me new random cocktails</div> }
        <CocktailList componentCocktailsArray={randomCocktailsArray} />
        <BackToTop />
      </div>
    </div>
  );
}

export default HomePage;
