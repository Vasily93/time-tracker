import { useState, useEffect } from 'react';

function App() {
  const [tags, setTags] = useState([{name:'code', id: 1, totalTime: 0}, {name:'gym', id: 2, totalTime: 0}, {name:'bass', id: 3, totalTime: 0}]);
  const [currentTag, setCurrentTag] = useState('');
  const [timer, setTimer] = useState(0);
  console.log(tags)
  function updateTagInTags(currentTag, timeStamp) {
    const updatedTags = tags.map(tag => {
      if (tag.name === currentTag) {
        tag.totalTime = tag.totalTime +=  (timeStamp - timer) 
      }
      return tag;
    })
    return updatedTags;
  }

  function handleClick(id) {
    const timeStamp =  new Date().getTime()
    if(id !== currentTag && timer === 0) {
      setCurrentTag(id)
      setTimer(timeStamp)
    } else if(id === currentTag) {
      setCurrentTag('')
      setTags(updateTagInTags(currentTag, timeStamp))
    } else if(id !== currentTag && timer !== 0) {
      setTags(updateTagInTags(currentTag, timeStamp))
      setCurrentTag(id)
      setTimer(timeStamp)
    }
    
  }

  return (
    <div className="App">
      Time Traker
      {/* <TagsList tags={tags} handleTagChange={setCurrentTag} currentTag={currentTag} setTimer={setTimer} timer={timer} /> */}
      {/* <h3>Current Tag: {currentTag ? currentTag : 'Not Specified'}</h3> */}

      <div>
      {tags.map(({name, id}) => (
        <button 
          onClick={e => handleClick(e.target.id)}
          id={name} key={id}
          style={{backgroundColor: currentTag === name ? 'lightblue': 'white'}}
        >{name}</button>
      ))}
    </div>
    </div>
  );
}

export default App;
