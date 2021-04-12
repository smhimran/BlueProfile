import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Home from "./components/Home";
import About from "./components/About";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/login" component={withRouter(Login)} />
          <Route path="/signup" component={withRouter(Signup)} />
          <Route path="/about" component={withRouter(About)} />
          <Route path="/user/:str" component={withRouter(Profile)} />
          <Route exact path="/" component={withRouter(Home)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
