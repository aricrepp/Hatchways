import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function App() {

  const [apiData, setApiData] = useState(null);
  

  useEffect(() => {
    axios.get('https://api.hatchways.io/assessment/students')
    .then((res) => {
      setApiData(res.data.students)
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className="App">
      <Dashboard apiData={apiData} />
    </div>
  );
}

export default App;
