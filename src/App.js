// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Navigate from './navigation/Navigate.tsx';
import ProgressBar from 'react-bootstrap/ProgressBar';

function App() {
  const [loadSistem, changeLoad] = useState(true);
  const [timeSistem, changeTime] = useState(0);
  
  useEffect(()=>{
    let interval = 0;
    document.onreadystatechange = (e) => {
      setInterval(() =>{
        if(interval != 100){
          interval++;
          changeTime(interval);
        }else{
          return 0;
        }
      }, e.timeStamp/100)

    }
  },[document.readyState])

  useEffect(()=>{
    setTimeout(() => {
      changeLoad(false);
    }, 2800)
  }, [timeSistem === 100])

  return (
    <div className="body">
      <ProgressBar now={timeSistem} style={{position:"fixed", display: (loadSistem)? "flex" : "none", backgroundColor:"#575757", zIndex: '99999',height: ".5rem",width: "100%"}} />
      <Navigate></Navigate>
    </div>
  );
}

export default App;
