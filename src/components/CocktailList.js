import { useGlobalContext } from "../Context";
import Loading from "./Loading";
import CocktailItem from "./CocktailItem";

function CocktailList({ componentCocktailsArray }) 
{
  const { isLoading } = useGlobalContext();
  
  if (isLoading)
  {
    return <Loading />
  }
  if (componentCocktailsArray.length < 1)
  {
    return (
      <div className="result-message">no cocktails found</div>
    );
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
