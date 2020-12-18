import { useAuth0 } from "@auth0/auth0-react";
import Login from "./login/Login";
import Home from "./layout/home/Home";
import "./App.css";

function App() {
  const { user, isAuthenticated } = useAuth0();
  console.log(user);
  return <div className="App">{!isAuthenticated ? <Home /> : <Login />}</div>;
}

export default App;
