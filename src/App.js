import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/home-page/Home"
import SignIn from "./components/home-page/Sign/SignIn";
import SignUp from "./components/home-page/Sign/SignUp";
import ResetPass from "./components/home-page/Sign/ResetPass";
import MyApp from "./components/App/MyApp";
import WriteText from "./components/App/WriteText";
import TrackList from "./components/App/TrackList";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";
import { AnimatedSwitch, AnimatedRoute } from 'react-router-transition';


function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/signin" component={SignIn} />
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/reset-pass" component={ResetPass}/>
                        <PrivateRoute exact path="/myapp" component={MyApp}/>
                        <PrivateRoute exact path="/write-text" component={WriteText}/>
                        <PrivateRoute exact path="/track-list" component={TrackList} />
                        <Route exact path="/soundcloud" component={() => {
                            window.location.href = "https://soundcloud.com";
                            return null;
                        }} />
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;

