import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/home-page/Home"
import About from "./components/home-page/About";
import SignIn from "./components/home-page/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

