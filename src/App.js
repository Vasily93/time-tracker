import { useState, useEffect } from 'react';
import TimeTracker from './TimeTracker';

function App() {
  const [isAwake, setAwake] = useState(false)
  
  function handleDayClick() {
    setAwake(prevState => !prevState)
  }

  return (
    <>
      <button onClick={handleDayClick}>{isAwake ? 'End' : 'Start'}</button>
      {isAwake && <TimeTracker />}
    </>
  )  
}

export default App;
