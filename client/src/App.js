import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Home from "./components/Home";
import About from "./components/About";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleStateChange = (value, currentUser) => {
    setIsLoggedIn(value);
    setUser(currentUser);
  };

  return (
    <div>
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          user={user}
          handleStateChange={handleStateChange}
        />
        <Switch>
          <Route path="/login">
            <Login
              isLoggedIn={isLoggedIn}
              user={user}
              handleStateChange={handleStateChange}
            />
          </Route>
          <Route path="/signup">
            <Signup
              isLoggedIn={isLoggedIn}
              user={user}
              handleStateChange={handleStateChange}
            />
          </Route>
          <Route path="/about" component={withRouter(About)} />
          <Route path="/user/:handle">
            <Profile
              isLoggedIn={isLoggedIn}
              user={user}
              handleStateChange={handleStateChange}
            />
          </Route>
          <Route exact path="/" component={withRouter(Home)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
