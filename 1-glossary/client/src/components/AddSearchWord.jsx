import React, {useState} from 'react';

const AddSearchWord = function({addClickHandler, searchClickHandler}) {
  const [inputWord, setInputWord] = useState(null);
  const [inputDefinition, setInputDefinition] = useState('')
  if (inputWord === '') {
    setInputDefinition('');
    setInputWord(null);
  }
  return (
    <div>
      <input id='AddSearch' placeholder="Search or Add" onChange={(event) => {
        setInputWord(event.target.value);
        searchClickHandler(event.target.value);
      }}/>
      <button onClick={() => {
        if (inputWord && inputWord.length) {
          addClickHandler(inputWord, inputDefinition);
          document.getElementById('AddSearch').value = '';
          document.getElementById('Definition').value = '';
          setInputDefinition('');
          setInputWord('');
        }
      }}>
        Add
      </button>
      <Definition setInputDefinition={setInputDefinition} inputWord={inputWord}/>
    </div>
  );
};
const Definition = function({addClicked, setInputDefinition, inputWord}) {
  if (inputWord) {
    if (inputWord !== '') {
      return (
        <div>
         <input id="Definition" placeholder='Add a defintion' onChange={(event) => setInputDefinition(event.target.value)}></input>
        </div>
      );
    } else {
      return <div></div>;
    }
  } else {
    return (
      <div></div>
    );
  }
};

export default AddSearchWord;