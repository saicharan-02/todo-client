import UserState from "./context/userData/UserState";
import Home from "./components/Home";

function App() {
  return (
    <UserState>
        <div className="App font-roboto">
          <Home/>
        </div>
    </UserState>
    
  );
}

export default App;
