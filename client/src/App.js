import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import axios from 'axios'
import Routes from './routes/Routes';
import Homepage from './pages/Home/Homepage';
import Createpost from './pages/Createpost/Createpost';
import Post from './pages/Post/Post';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import UnprotectedNav from './components/UnprotectedNav';
import Cookies from 'js-cookie';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {

  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    Cookies.get("userToken") ? setAuth(true) : setAuth(false);
  },[]);

  useEffect(async() => {
    const res = await axios.get("/api/", {
      withCredentials: true,
      headers: {
        userToken: Cookies.get("userToken")
      }
    });
    setCurrentUser(res.data);
  }, [])

  const [auth, setAuth] = useState(false);

  return (
    <div className="App">
      
      <Router>
      <UnprotectedNav auth={auth}/>
        <Switch>
          <Routes exact path="/" Component={() => <Homepage currentUser={currentUser}/>}/>
          <Routes exact path="/createpost" Component={Createpost}/>
          <Routes exact path="/post/:id" Component={() => <Post currentUser = {currentUser}/>} />
          <Routes exact path="/login" Component={() => <Login setAuth={setAuth}/>} />
          <Routes exact path="/signup" Component={Signup}/>
          <Routes exact path="*" Component={PageNotFound}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
