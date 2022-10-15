import React from 'react'

function TagsList({tags, onDeleteTag}) {
  return (
    <ul>
      {tags.length === 1 && <li >Not tags yet...</li>}

      {tags.map(({name, id, totalTime}, index) => {
        if(index === 0) return null
        return (<li key={id}>
          <button className='TagTab' id={id}
        >{name} : {Math.floor(totalTime/1000)} sec
        </button>
        <button onClick={e => onDeleteTag(e.target.id)} id={id}>DLT</button>
        </li>)
      })}
    </ul>
  )
}

export default TagsList;
