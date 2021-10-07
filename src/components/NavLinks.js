import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsUpdateFavoriteCocktailsArray } from "../redux/SliceGeneral";

function NavLinks({ linkType }) 
{
  const { favoriteIdsArray, favoriteCocktailsArray } = useSelector((state) => state.page);
  const reduxDispatch = useDispatch();
  
  function getLinks(type)
  {
    if (type === "NO_HOME_LINK")
    {
      return (
        <div>
          <Link to="/favorite" onClick={favoriteLinkOnClickHandler}>Favorite</Link> | <Link to="/about">About</Link>
        </div>
      );
    }
    if (type === "NO_FAVORITE_LINK")
    {
      return (
        <div>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </div>
      );
    }
    if (type === "NO_ABOUT_LINK")
    {
      return (
        <div>
          <Link to="/">Home</Link> | <Link to="/favorite" onClick={favoriteLinkOnClickHandler}>Favorite</Link>
        </div>
      );
    }
    return (
      <div>
        <Link to="/">Home</Link> | <Link to="/favorite" onClick={favoriteLinkOnClickHandler}>Favorite</Link> | <Link to="/about">About</Link>
      </div>
    );
  }

  function favoriteLinkOnClickHandler()
  {
    if (favoriteIdsArray.length === 0 && favoriteCocktailsArray.length > 0)
    {
      reduxDispatch(setIsUpdateFavoriteCocktailsArray(true));
    }
  }
  
  return (
    <div className="nav-links">
      {getLinks(linkType)}
    </div>
  );
}

export default NavLinks;
