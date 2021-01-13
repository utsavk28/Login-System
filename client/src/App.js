import Homepage from "./components/Homepage"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import { BrowserRouter as Router, Route } from "react-router-dom"


function App() {

  return (
    <div>
      <Router>
        <Route exact path="/" ><Homepage /></Route>
        <Route exact path="/register" > <RegisterPage /> </Route>
        <Route exact path="/login" ><LoginPage /></Route>
      </Router>
    </div>
  );
}

export default App;
