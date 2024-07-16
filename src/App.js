
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Weather from './components/Weather';
import History from './components/History';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [city, setcity] = useState("bhubaneswar");
  let k = "d010fd441ecc4b329c173249242205";

  const [mode, setmode] = useState("light");
  const [type,settype]=useState("history");

  let togglemode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "black";
    }
    else {
      setmode("light");
      document.body.style.backgroundColor = "white";
    }
  }
  return (
    <>
      <Router>
        <Navbar city={city} setcity={setcity} mode={mode} togglemode={togglemode} type={type} settype={settype} />
        <Switch>
          <Route exact path="/current">
            <Weather k={k} city={city} mode={mode} />
          </Route>
          <Route exact path="/history">
            <History k={k} mode={mode} type={type} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
