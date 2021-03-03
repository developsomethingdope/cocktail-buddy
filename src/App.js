import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import CocktailDetailPage from "./pages/CocktailDetailPage";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";

function App() 
{
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/favorite">
          <FavoritePage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/cocktail/:id">
          <CocktailDetailPage />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
