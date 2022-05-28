import './App.css';
import Login from './components/Login';
import { Route,Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import { useStateValue } from './StateProvider';

function App() {
  const[{user},dispatch]=useStateValue();

  return (
    <div className="app">
      {!user?(
      <Login/>
    ):
    (
      <Routes>
        <Route path="/" element={<><Header/><div className="App"><Home/></div></>}></Route>
      </Routes>
    )}
    </div>
  );
}

export default App;
