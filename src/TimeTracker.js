import {useState, useEffect} from 'react';

function TimeTracker() {
  const [tags, setTags] = useState([{name: 'Uncotegorized', id: 0, totalTime: 0}, {name:'code', id: 1, totalTime: 0}, {name:'gym', id: 2, totalTime: 0}, {name:'bass', id: 3, totalTime: 0}]);
  const [currentTag, setCurrentTag] = useState(tags[0].name);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setTimer(new Date().getTime())
  }, [])
  
  function updateTagInTags(currentTag, timeStamp) {
    const updatedTags = tags.map(tag => {
      if (tag.name === currentTag) {
        tag.totalTime = tag.totalTime +=  (timeStamp - timer) 
      }
      return tag;
    })
    setTags(updatedTags)
  }

  function handleClick(clickedID) {
    const timeStamp =  new Date().getTime()
    setTimer(timeStamp)
    setCurrentTag(prevTag => {
      if(prevTag === clickedID) {
        updateTagInTags(clickedID, timeStamp)
        return 'Uncotegorized'
      } else if(prevTag !== clickedID) {
        updateTagInTags(prevTag, timeStamp)
        return clickedID
      }
      
    })
  }

  return (
    <div className="App">
      
      <h3>Current Tag: {`${tags[0].name}: ${tags[0].totalTime/1000} seconds`}</h3>

      <div>
      {tags.map(({name, id, totalTime}, index) => {
        if(index === 0) return null;
        return (<button 
          onClick={e => handleClick(e.target.id)}
          id={name} key={id}
          style={{backgroundColor: currentTag === name ? 'lightblue': 'white'}}
        >
          {name} : {Math.floor(totalTime/1000)} seconds
        </button>)
      })}
    </div>
    </div>
  );
}

export default TimeTracker;
