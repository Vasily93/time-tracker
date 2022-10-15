import React, { useState } from 'react';
import TimeTracker from './TimeTracker';
import './App.css'

function App() {
  const [isAwake, setAwake] = useState(false)
  
  function handleDayClick() {
    setAwake(prevState => !prevState)
  }

  return (
    <div>
      {isAwake && <TimeTracker />}
        <button onClick={handleDayClick}>{isAwake ? 'End' : 'Start'}</button>
    </div>
  )  
}

export default App;
