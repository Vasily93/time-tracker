import React, {useState} from 'react';

function TimeTracker({tags, onEditTags}) {
  const [currentTagID, setCurrentTagID] = useState(tags[0].id);
  const [timer, setTimer] = useState(new Date().getTime());

  function updateTagInTags(tagID, timeStamp) {
    const updatedTags = tags.map(tag => {
      if (tag.id == tagID) {
        tag.totalTime = tag.totalTime +=  (timeStamp - timer) 
      }
      return tag;
    })
    onEditTags(updatedTags)
  }

  function handleClick(clickedID) {
    const timeStamp =  new Date().getTime()
    const tagOption = clickedID === currentTagID ? clickedID : currentTagID;
    setTimer(timeStamp)
    setCurrentTagID(() => {
      if(currentTagID === clickedID) {
        return 12345
      } else if(currentTagID !== clickedID) {
        return clickedID
      }
      
    })
    updateTagInTags(tagOption, timeStamp)
  }

  return (
    <div>
      <ul>
      {tags.map(({name, id, totalTime}, index) => {
        if(index === 0) return <li key={id}>
          <button className='TagTab' style={{backgroundColor: 'darkgray'}}>
            {name} : {Math.floor(totalTime/1000)} sec
            </button>
          </li>

        return (<li key={id}><button 
          className='TagTab' 
          onClick={e => handleClick(e.target.id)}
          id={id}
          style={{backgroundColor: currentTagID === id ? 'blue': 'lightgray'}}
        >
          {name} : {Math.floor(totalTime/1000)} seconds
        </button></li>)
      })}
    </ul>
    {/* <p>Current Tag: {tags.find(tag => tag.id === currentTagID).name}</p> */}
    </div>
  );
}

export default TimeTracker;
