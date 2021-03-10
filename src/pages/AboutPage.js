import NavLinks from "../components/NavLinks";
import { useGlobalContext } from "../Context";

function AboutPage() 
{
  const { isFavoriteAbout, setIsFavoriteAbout } = useGlobalContext();

  function toggleOnChangeHandler()
  {
    setIsFavoriteAbout(!isFavoriteAbout);
  }

  return (
    <div>
      <div className="page-top">
        <div className="links"><NavLinks linkType="noAboutLink" /></div>
        <div className="title">About</div>
      </div>
      <div className={ isFavoriteAbout ? "page-bottom section-about section-about-favorite" : "page-bottom section-about" }>
        <div className="section-subtitle">Cocktail-Buddy v1.4</div>
        <div className="about-favorite">
          <div className="favorite-toggle">
            { !isFavoriteAbout && <div className="toggle-label">Not Favorite</div> }
            { isFavoriteAbout && <div className="toggle-label">Favorite</div> }
            <label className="toggle-switch">
              { !isFavoriteAbout && <input type="checkbox" onChange={ toggleOnChangeHandler } /> }
              { isFavoriteAbout && <input type="checkbox" checked onChange={ toggleOnChangeHandler } /> }
              <span className="switch-slider switch-round"></span>
            </label>
          </div>
        </div>
        <p>Features:</p>
        <ul>
          <li>Show random cocktails</li>
          <li>Set cocktail as favorite</li>
          <li>Show favorite cocktails</li>
          <li>More info for each cocktail</li>
          <li>Data taken from <a href="https://www.thecocktaildb.com/api.php">API</a></li>
        </ul>
        <p>
          Source: <a href="https://github.com/developsomethingdope/cocktail-buddy">GitHub</a><br />
		  See more: <a href="https://develop-something-dope.netlify.app">My Porfolio website</a><br />
          About me: <a href="https://www.linkedin.com/in/edward-kwong-03a783184">Linkedin</a><br /><br />
          Copyright &copy; { (new Date()).getFullYear() }
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
