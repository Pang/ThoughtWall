import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import NavBar from './components/Shared/NavBar';
import SideNav from './components/Shared/SideNav'
import ThreadsPage from './components/Threads/ThreadsPage'

import './App.scss';
import LoginForm from "./components/Account/LoginForm";

function App() {
  const [threads, setThreads] = useState([]);
  const [decodedToken, setDecodedToken] = useState('');

  useEffect(() => {
    getData();
    decodeToken();
  }, []);

  const decodeToken = () => {
    if (localStorage.getItem('token')) {
      setDecodedToken(jwt_decode(localStorage.getItem('token')));
    }
  }

  const getData = async () => {
    await axios.get(`http://localhost:5000/api/thread`).then((res) => {
      setThreads(res.data)
      console.info('threads', res.data)
    }); 
    console.info('token', decodedToken)
  }


  return (
    <Router>
      <NavBar username={decodedToken['unique_name']}/>
      <div className="content">
        <Route
          path='/'
          exact
          render={() => (
            <div className="justify-content-center p-4">
              {threads.length > 0 
                ? <ThreadsPage threads={threads} />
                : 'No Threads to show'
              }
            </div>
          )} 
        />

        <Route
          path='/account'
          render={() => (
            <LoginForm onLogin={decodeToken}/>
          )}
        />
      </div>
      <SideNav />
    </Router>
  );
}

export default App;
