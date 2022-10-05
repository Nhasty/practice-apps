import React, {useState, useEffect} from 'react';
import AddSearchWord from './AddSearchWord.jsx';
import WordsList from './WordList.jsx';
import axios from 'axios';
function App() {
  const [words, setWords] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/glossary')
      .then((response) => {
        setWords(response.data)
      })
      .catch(err => console.log(err))
  }, []);

  const addClick = (addWord, addDefinition) => {
    let addObject = {
      word: addWord,
      definition: addDefinition
    };
    axios.post('http://localhost:3000/glossary', addObject)
      .then(response => {
        if (response.status === 201) {
          axios.get('http://localhost:3000/glossary')
            .then((response) => {
              setWords(response.data)
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 409') {
          alert(`${addWord} is already in Glossary`)
        } else {
          console.log(err.message)
        }
      });
  }

  const searchClick = (searchWord) => {
    if (searchWord === '') {
      axios.get('http://localhost:3000/glossary')
        .then((response) => {
          setWords(response.data)
        })
        .catch(err => console.log(err))
    } else {
      let mappedWords = words.filter(wordObject => {
        return wordObject.word.indexOf(searchWord) > -1;
      });
      setWords(mappedWords)
    }
  }

  const updateClick = () => {

  }

  const deleteClick = () => {

  }


  return(
    <div>
      <h1>Glossary</h1>
      <AddSearchWord addClickHandler={addClick} searchClickHandler={searchClick}/>
      <WordsList words={words} updateClickHandler={updateClick} deleteClickHandler={deleteClick}/>
    </div>
  )
}

export default App;