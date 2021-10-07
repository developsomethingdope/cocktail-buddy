import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRandomCocktailsArray, setFavoriteIdsArray } from "../redux/SlicePage";
import { setIsIdsArrayChanged } from "../redux/SliceGeneral";
//import placeholderImage from "../placeholder.png";

//// destructuring
function CocktailItem({ id, name, image, isFavorite })
{
  const [isFavoriteLocal, setIsFavoriteLocal] = useState(isFavorite);
  const { isLinkToDetail } = useSelector((state) => state.general);
  const { randomCocktailsArray, local_storage_key, favoriteIdsArray } = useSelector((state) => state.page);
  const reduxDispatch = useDispatch();
  let localStorageIdArray = [...favoriteIdsArray];
  
  function toggleOnChangeHandler()
  {
    //console.log('toggle id: ' + id + ', ' + event.target.checked);
    if (isFavoriteLocal)
    {
      //// remove item from array
      localStorageIdArray = localStorageIdArray.filter(idItem => idItem !== id);
    }
    else
    {
      localStorageIdArray.push(id);
    }

    //// randomCocktailsArray is apparently read-only in redux
    var newRandomArray = [];
    const randomArrayLocal = [...randomCocktailsArray];
    for (const randomItem of randomArrayLocal)
    {
      if (randomItem.id === id)
      {
        const newRandomItem = 
        {
          id: randomItem.id,
          name: randomItem.name,
          image: randomItem.image,
          isFavorite: !isFavoriteLocal
        }
        newRandomArray.push(newRandomItem);
      }
      else
      {
        newRandomArray.push(randomItem);
      }
    }
    reduxDispatch(setRandomCocktailsArray(newRandomArray));
    localStorage.setItem(local_storage_key, JSON.stringify(localStorageIdArray));
    reduxDispatch(setFavoriteIdsArray(localStorageIdArray));
    setIsFavoriteLocal(!isFavoriteLocal);
    reduxDispatch(setIsIdsArrayChanged(true));
  }

  // <Link to={ `/cocktail/${id}` }>
  // <img src={placeholderImage} alt={name} />
  return (
    <div className={ isFavoriteLocal? 'section-item section-item-favorite' : 'section-item' }>
      <div className="item-image">
        { !isLinkToDetail && <img src={image} alt={name} /> }
        {
          isLinkToDetail &&
          <Link to={ `/cocktail/${id}` }>
            <img src={image} alt={name} />
          </Link>
        }
      </div>
      <div className="section-item-bottom">
        <div className="item-title">
          { !isLinkToDetail && name }
          {
            isLinkToDetail &&
            <Link to={ `/cocktail/${id}` }>{name}</Link>
          }
        </div>
        <div className="item-favorite">
          <div className="favorite-toggle">
            { !isFavoriteLocal && <div className="toggle-label">Not Favorite</div> }
            { isFavoriteLocal && <div className="toggle-label">Favorite</div> }
            <label className="toggle-switch">
              { !isFavoriteLocal && <input type="checkbox" onChange={ toggleOnChangeHandler } /> }
              { isFavoriteLocal && <input type="checkbox" checked onChange={ toggleOnChangeHandler } /> }
              <span className="switch-slider switch-round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CocktailItem;
