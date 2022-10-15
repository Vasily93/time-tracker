import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

function TimeTracker() {
  const [tags, setTags] = useState([{name: 'Uncotegorized', id: 12345, totalTime: 0}]);
  const [currentTagID, setCurrentTagID] = useState(tags[0].id);
  const [timer, setTimer] = useState(new Date().getTime());
  const [newTag, setNewTag] = useState('')


  function updateTagInTags(tagID, timeStamp) {
    const updatedTags = tags.map(tag => {
      if (tag.id === tagID) {
        tag.totalTime = tag.totalTime +=  (timeStamp - timer) 
      }
      return tag;
    })
    setTags(updatedTags)
  }

  function handleClick(clickedID) {
    const timeStamp =  new Date().getTime()
    setTimer(timeStamp)
    setCurrentTagID(prevTagID => {
      if(prevTagID === clickedID) {
        updateTagInTags(clickedID, timeStamp)
        return 12345
      } else if(prevTagID !== clickedID) {
        updateTagInTags(prevTagID, timeStamp)
        return clickedID
      }
      
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTags([...tags, {name: newTag, id: uuidv4(), totalTime: 0}])
    setNewTag('')
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor='new-tag'>New Tag: </label>
        <input id='new-tag' value={newTag} onChange={e => setNewTag(e.target.value)} />
        <button>Add {newTag}</button>
      </form>
      <ul>
      {tags.map(({name, id, totalTime}, index) => {
        if(index === 0) return <li key={id}><button className='TagTab'>{name} : {Math.floor(totalTime/1000)} sec</button></li>
        return (<li key={id}><button 
          className='TagTab' 
          onClick={e => handleClick(e.target.id)}
          id={id}
          style={{backgroundColor: currentTagID === id ? 'lightblue': 'darkgray'}}
        >
          {name} : {Math.floor(totalTime/1000)} seconds
        </button></li>)
      })}
    </ul>
    <p>Current Tag: {tags.find(tag => tag.id === currentTagID).name}</p>
    </div>
  );
}

export default TimeTracker;
