import React from 'react';

const WordsList = function({words, updateClickHandler, deleteClickHandler}) {
  let wordsComponents = words.map((wordObject) => {
    return (
      <li key={wordObject._id.toString()}>
        <div>{wordObject.word}</div>
        <div>{wordObject.definition}</div>
        <button onClick={() => {updateClickHandler()}}>update</button>
        <button onClick={() => {deleteClickHandler()}}>delete</button>
      </li>
    )
  })
  return (
    <ul>
      {wordsComponents}
    </ul>
  )
};

export default WordsList;