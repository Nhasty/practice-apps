import React, {useState} from 'react';

const AddSearchWord = function({addClickHandler, inputWord, setInputWord, inputDefinition, setInputDefinition}) {


  return (
    <div>
      <input id='AddSearch' placeholder="Search or Add" onChange={(event) => {
        setInputWord(event.target.value);
        if (event.target.value === '') {
          setInputDefinition('');
        }
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