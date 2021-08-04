import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import AccountPage from "./components/Account/AccountPage";
import NavBar from './components/Shared/NavBar';
import SideNav from './components/Shared/SideNav'
import ThreadsPage from './components/Threads/ThreadsPage'

import './App.scss';

function App() {
  const [threads, setThreads] = useState([]);
  const [decodedToken, setDecodedToken] = useState('');
  const [account, setAccount] = useState('');

  const getters = {
    get isLoggedIn() {
      return localStorage.getItem('token');
    },
    get validToken() {
      return decodedToken?.exp && decodedToken?.exp < new Date().getTime();
    }
  }

  useEffect(() => {
    decodeToken();
    getData();
  }, []);

  useEffect(() => {
    console.info('token', decodedToken);
    if (decodedToken) {
      getters.validToken ? getAccount() : localStorage.removeItem('token');
    }
  }, [decodedToken]);

  const decodeToken = () => {
    if (getters.isLoggedIn) {
      setDecodedToken(jwt_decode(localStorage.getItem('token')));
    }
  }

  const getData = async () => {
    await axios.get(`http://localhost:5000/api/thread`).then((res) => {
      setThreads(res.data)
      console.info('threads', res.data)
    }); 
  }

  const getAccount = async () => {
      document.cookie = `token=${localStorage.getItem('token')}`
      await axios.get(
        `http://localhost:5000/api/profile/${decodedToken['nameid']}`, 
        { 
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
          } 
        }).then((res) => {
          setAccount(res.data);
          console.info('Account', res.data)
      });
  }

  return (
    <Router>
      <NavBar username={account.username}/>
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
              <AccountPage 
                onLogin={decodeToken} 
                loggedIn={getters.isLoggedIn}
                account={account} />
          )}
        />
      </div>
      <SideNav />
    </Router>
  );
}

export default App;
