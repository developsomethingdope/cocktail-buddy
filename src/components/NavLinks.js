import { Link } from "react-router-dom";

function NavLinks({ linkType }) 
{
  function getLinks(type)
  {
    if (type === "homeLink")
    {
      return (
        <div>
          <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </div>
      );
    }
    if (type === "favoriteLink")
    {
      return (
        <div>
          <Link to="/favorite">Favorite</Link> | <Link to="/about">About</Link>
        </div>
      );
    }
    if (type === "noAboutLink")
    {
      return (
        <div>
          <Link to="/">Home</Link> | <Link to="/favorite">Favorite</Link>
        </div>
      );
    }
    return (
      <div>
        <Link to="/">Home</Link> | <Link to="/favorite">Favorite</Link> | <Link to="/about">About</Link>
      </div>
    );
  }
  
  return (
    <div className="nav-links">
      {getLinks(linkType)}
    </div>
  );
}

export default NavLinks;
