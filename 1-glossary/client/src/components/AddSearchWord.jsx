import React, {useState} from 'react';

const AddSearchWord = function({addClickHandler, searchClickHandler}) {
  const [inputWord, setInputWord] = useState('');
  const [inputDefinition, setInputDefinition] = useState('')
  const [addClicked, setAddClicked] = useState(0);
  return (
    <div>
      <input id='AddSearch' placeholder="Search or Add" onChange={(event) => setInputWord(event.target.value)}></input>
      <button onClick={() => {
        if (addClicked === 0 && inputWord !== '') {
          setAddClicked(1);
        } else if (addClicked === 1 && inputWord !== '') {
          addClickHandler(inputWord, inputDefinition);
          document.getElementById('AddSearch').value = '';
          setInputWord('');
          document.getElementById('Definition').value = '';
          setInputDefinition('');
          setAddClicked(0)
        }
      }}>
        Add
      </button>
      <button onClick={() => {
        searchClickHander(inputWord);
        document.getElementById('AddSearch').value = '';
        setInputWord('');
      }}>
        Search
      </button>
      <Definition addClicked={addClicked} setInputDefinition={setInputDefinition} />
    </div>


  )
};
const Definition = function({addClicked, setInputDefinition}) {
  if (addClicked === 1) {
    return (
      <input id="Definition" placeholder='Add a defintion' onChange={(event) => setInputDefinition(event.target.value)}></input>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default AddSearchWord;