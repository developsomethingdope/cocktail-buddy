import { useEffect, useState } from "react";
import NavLinks from "../components/NavLinks";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import CocktailItem from "../components/CocktailItem";
import BackToTop from "../components/BackToTop";
import { useSelector, useDispatch } from "react-redux";
import { setIsLinkToDetail } from "../redux/SliceGeneral";

function CocktailDetailPage() 
{
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const { id } = useParams();
  const { favoriteIdsArray } = useSelector((state) => state.page);
  const reduxDispatch = useDispatch();
  const [detailItem, setDetailItem] = useState({});
  
  async function fetchDataDetail(idDetail)
  {
    try
    {
      const completeUrl = `${url}${idDetail}`;
      const response = await fetch(completeUrl);
      const dataJson = await response.json();
      const newCocktailItem = parseData(dataJson);
      setDetailItem(newCocktailItem);
    }
    catch(error)
    {
      console.log(error);
    }
  }

  function parseData(data)
  {
    const { drinks } = data;
    //console.log('cocatail detail: ', drinks);
    const newCocktailList = drinks.map((drinkItem) => 
    {
      let ingredientsString = '';
      for (const [key, value] of Object.entries(drinkItem))
      {
        if (key.includes("strIngredient") && value)
        {
          if (!ingredientsString)
          {
            ingredientsString = value;
          }
          else
          {
            ingredientsString = ingredientsString + ', ' + value;
          }
        }
      }
      
      const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass, strCategory, strInstructions } = drinkItem;
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
        type: strAlcoholic,
        glass: strGlass,
        category: strCategory,
        instructions: strInstructions,
        ingredients: ingredientsString,
        image: strDrinkThumb,
        isFavorite: isFavoriteLocal
      };
    });
    const cocktailItem = newCocktailList[0];
    return cocktailItem;
  }

  useEffect(() => 
  {
    fetchDataDetail(id);
    reduxDispatch(setIsLinkToDetail(false));
  }, []);
  
  return (
    <div>
      <div className="page-top">
        <div className="links"><NavLinks linkType="ALL_LINKS" /></div>
        <div className="title">Cocktail detail</div>
      </div>
      {
        !detailItem.id &&
        <div className="page-bottom section-detail">
          <Loading />
        </div>
      }
      {
        detailItem.id &&
        <div className="page-bottom section-detail">
          <div className="section-detail-content">
            <CocktailItem {...detailItem} />
            <div className="content-info">
              <div className="info-area">
                <div className="info-label label-type">Type:</div>
                <div className="info-text text-type">{ detailItem.type }</div>  
              </div>
              <div className="info-area">
                <div className="info-label label-category">Category:</div>
                <div className="info-text text-category">{ detailItem.category }</div>
              </div>
              <div className="info-area">
                <div className="info-label label-glass">Glass:</div>
                <div className="info-text text-glass">{ detailItem.glass }</div>
              </div>
              <div className="info-area">
                <div className="info-label label-ingredients">Ingredients:</div>
                <div className="info-text text-ingredients">{ detailItem.ingredients }</div>
              </div>
              <div className="info-area">
                <div className="info-label label-instructions">Instructions:</div>
                <div className="info-text text-instructions">{ detailItem.instructions }</div>
              </div>
            </div>
          </div>
          <BackToTop />
        </div>
      }
    </div>
  );
}

export default CocktailDetailPage;
