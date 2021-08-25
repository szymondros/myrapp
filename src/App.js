import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/home-page/Home"
import SignIn from "./components/home-page/SignIn";
import SignUp from "./components/home-page/SignUp";
import ResetPass from "./components/home-page/ResetPass";
import MyApp from "./components/App/MyApp";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";


function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/signin" component={SignIn}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/reset-pass" component={ResetPass}/>
                        <PrivateRoute exact path="/app" component={MyApp}/>
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;

