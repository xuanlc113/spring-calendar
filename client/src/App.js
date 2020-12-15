import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  console.log(user);
  return (
    <div className="App">
      {isAuthenticated ? <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
    </button> : <button onClick={() => loginWithRedirect()}>Log In</button>}
    </div>
  );
}

export default App;
