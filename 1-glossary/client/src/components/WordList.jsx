import React, {useState} from 'react';

const WordsList = function({words, updateClickHandler, deleteClickHandler, inputWord}) {
  let wordsComponents = words.map((wordObject) => {
    return (
      <Word key={wordObject._id.toString()}
        word={wordObject.word}
        def={wordObject.definition}
        updateClickHandler={updateClickHandler}
        deleteClickHandler={deleteClickHandler}
      />
    )
  }).filter(reactWord => {return reactWord.props.word.indexOf(inputWord) > -1});
  return (
    <ul>
      {wordsComponents}
    </ul>
  )
};

const Word = function({word, def, updateClickHandler, deleteClickHandler}) {
  const [updateClicked, setUpdateClicked] = useState(false);
  const [updateDefinition, setUpdateDefinition] = useState('');
  return (
    <li>
      <div>{word}</div>
      <div>{def}</div>
      <button onClick={() => {
        if (!updateClicked) {
          setUpdateClicked(true);
        } else if (updateClicked && updateDefinition === '') {
          setUpdateClicked(false);
        } else if (updateClicked && updateDefinition.length > 0) {
          updateClickHandler(word, updateDefinition)
          document.getElementById('UpdateDefinition').value = '';
          setUpdateDefinition('');
          setUpdateClicked(false);
        }
      }}>
        update
      </button>
      <button onClick={() => {deleteClickHandler(word)}}>delete</button>
      <DefinitionUpdate updateClicked={updateClicked} setUpdateDefinition={setUpdateDefinition}/>
    </li>
  )
};



const DefinitionUpdate = function({updateClicked, setUpdateDefinition}) {
  if (updateClicked) {
    return (
    <input id='UpdateDefinition' placeholder="updated definition here." onChange={event => setUpdateDefinition(event.target.value)}></input>
    );
  } else {
    return (
      <div></div>
    )
  }
};
export default WordsList;