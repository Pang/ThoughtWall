import axios from "axios";
import { useState, useEffect } from 'react';

import NavBar from './components/Shared/NavBar';
import SideNav from './components/Shared/SideNav'
import Threads from './components/Threads/ThreadsPage'

import './App.scss';

function App() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get(`http://localhost:5000/api/thread`).then((res) => {
      console.log(res.data);
      setThreads(res.data)
      console.log(threads);
    })
  }

  return (
    <div>
      <NavBar />
      <div className="content">
        <div className="justify-content-center p-4">
          {threads.length > 0 
            ? <Threads threads={threads} />
            : 'No Threads to show'
          }
        </div>
      </div>

      <SideNav />
    </div>
  );
}

export default App;
