import React, {useState, useEffect} from 'react';
import AddSearchWord from './AddSearchWord.jsx';
import WordsList from './WordList.jsx';
import axios from 'axios';
function App() {
  const [words, setWords] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/glossary')
      .then((response) => {
        console.log(response.data)
        setWords(response.data)
      })
  }, []);

  const addClick = (addWord) => {

  }

  const searchClick = (searchWord) => {

  }

  const updateClick = () => {

  }

  const deleteClick = () => {

  }


  return(
    <div>
      <h1>Glossary</h1>
      <AddSearchWord addClickHandler={addClick} searchClickhandler={searchClick}/>
      <WordsList words={words} updateClickHandler={updateClick} deleteClickHandler={deleteClick}/>
    </div>
  )
}

export default App;