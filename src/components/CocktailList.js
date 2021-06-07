import { useGlobalContext } from "../Context";
import Loading from "./Loading";
import CocktailItem from "./CocktailItem";

function CocktailList({ componentCocktailsArray }) 
{
  if (componentCocktailsArray.length < 1)
  {
    return <Loading />
  }
  //console.log(componentCocktailsArray);
  return (
    <div className="section-list">
      {
        componentCocktailsArray.map((cocktailItem) => 
        {
          return <CocktailItem key={cocktailItem.id} {...cocktailItem} />
        })
      }
    </div>
  );
}

export default CocktailList;
