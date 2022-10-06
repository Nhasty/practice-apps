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
              alert(`${addWord} is already in the Glossary!`)
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => {
        if (err.message === 'Request failed with status code 409') {
          axios.get('http://localhost:3000/glossary').then((response) => {setWords(response.data)}).catch(err => console.log(err));
        }
      });
  }
  // alert(`${addWord} is already in Glossary`)
  //       } else {
  //         console.log(err.message)
  //       }

  const searchClick = (searchWord) => {
    if (searchWord === '') {
      axios.get('http://localhost:3000/glossary')
        .then((response) => {
          setWords(response.data)
        })
        .catch(err => console.log(err))
    } else {
      let titleSearch = searchWord[0].toUpperCase() + searchWord.slice(1).toLowerCase();
      let mappedWords = words.filter(wordObject => {
        return wordObject.word.indexOf(titleSearch) > -1;
      });
      setWords(mappedWords)
    }
  }

  const updateClick = (oldWord, newDef) => {
    let updateWord = {
      word: oldWord,
      definition: newDef
    };
    axios.put('http://localhost:3000/glossary', updateWord)
    .then((response) => {
      if (response.status === 200) {
        axios.get('http://localhost:3000/glossary')
        .then((response) => {
          setWords(response.data)
        })
        .catch(err => console.log(err))
      }
    })
    .catch(err => {
      if (err.message === 'Request failed with status code 409') {

      }
    })
  }

  const deleteClick = (deleteWord) => {
    let deleteObject = {
      word: deleteWord
    }
    console.log(deleteObject)
    axios.delete('http://localhost:3000/glossary', {data: deleteObject})
      .then(response => {
        if (response.status === 200) {
          axios.get('http://localhost:3000/glossary')
            .then((response) => {
              setWords(response.data)
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }


  return(
    <div>
      <h1>Glossary</h1>
      <AddSearchWord addClickHandler={addClick} searchClickHandler={searchClick}/>
      <WordsList words={words} updateClickHandler={updateClick} deleteClickHandler={deleteClick}/>
    </div>
  )
}
// can i get these changes updated
export default App;