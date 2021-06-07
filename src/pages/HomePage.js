import { useEffect, useState } from "react";
import NavLinks from "../components/NavLinks";
import CocktailList from "../components/CocktailList";
//// global states
//// state persists until browser refresh
import { useGlobalContext } from "../Context";
import BackToTop from "../components/BackToTop";

function HomePage() 
{
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const { randomCocktailsArray, setRandomCocktailsArray, setIsLinkToDetail, favoriteIdsArray } = useGlobalContext();
  const [randomButtonClickCount, setRandomButtonClickCount] = useState(0);
  //// number of cocktails shown on the page
  const numOfRandomCocktails = 4;
  //console.log('home page:', favoriteIdsArray);

  function addDataToList(drinkItem, list)
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
    const cocktailItem = 
    {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      isFavorite: isFavoriteLocal
    };
    //console.log('home page: ', cocktailItem);
    list.push(cocktailItem);
    return list;
  }

  async function fetchDataRandom()
  {
    try
    {
      //// clone array
      var newCocktailList = [...randomCocktailsArray];
      var idsObject = {};
      for (let i = 0; i < numOfRandomCocktails; i++)
      {
        var idLocal = '';
        var dataJson = '';
        do
        {
          const response = await fetch(url);
          dataJson = await response.json();
          idLocal = dataJson['drinks'][0]['idDrink'];
        } while (idsObject[idLocal]);
        idsObject[idLocal] = true;
        newCocktailList = addDataToList(dataJson['drinks'][0], newCocktailList);
      }
      //console.log('home page: ', newCocktailList);
      setRandomCocktailsArray(newCocktailList);
    }
    catch(error)
    {
      console.log('home page: ', error);
    }
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
        <div className="links"><NavLinks linkType="NO_HOME_LINK" /></div>
        <div className="title">Random cocktails</div>
      </div>
      <div className="page-bottom section-home">
        { randomCocktailsArray.length < 1 && <div className="button button-home-disabled">Show me new random cocktails</div> }
        { randomCocktailsArray.length > 0 && <div className="button button-home" onClick={showOnClickHandler}>Show me new random cocktails</div> }
        <CocktailList componentCocktailsArray={randomCocktailsArray} />
        <BackToTop />
      </div>
    </div>
  );
}

export default HomePage;
