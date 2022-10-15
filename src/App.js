import React, { useState, useEffect } from 'react';
import TimeTracker from './TimeTracker';
import TagsList from './TagsList';
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tags, setTags] = useState(() => JSON.parse(localStorage.getItem('tags')) || [{name: 'Uncotegorized', id: 12345, totalTime: 0}]);
  const [newTag, setNewTag] = useState('')
  const [isAwake, setAwake] = useState(false)

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags))
  },[tags])
  
  function handleDayClick() {
    setAwake(prevState => !prevState)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(newTag)
    setTags([...tags, {name: newTag, id: uuidv4(), totalTime: 0}])
    setNewTag('')
  }

  function handleDeleteTag(id) {
    const updatedTags = tags.filter(tag => tag.id !== id)
    setTags(updatedTags)
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor='new-tag'>New Tag: </label>
        <input maxLength={10} id='new-tag' value={newTag} onChange={e => setNewTag(e.target.value)} />
        <button>Add</button>
      </form>

      {isAwake ? 
        <TimeTracker tags={tags} onEditTags={setTags}/> :
        <TagsList tags={tags} onDeleteTag={handleDeleteTag}/>
      }

      <button onClick={handleDayClick} style={{position: 'fixed', bottom: '10px', right: '45%'}}>
        {isAwake ? 'End' : 'Start'}
      </button>
    </div>
  )  
}

export default App;
