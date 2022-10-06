import React, {useState, useEffect} from 'react';
import AddSearchWord from './AddSearchWord.jsx';
import WordsList from './WordList.jsx';
import axios from 'axios';
function App() {
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(0);

  const getPage = (pageNumber) => {
    const pageObject = {page: pageNumber}
    return axios({url: 'http://localhost:3000/glossary', method: 'get', params: pageObject, headers: {'Content-Type': 'application/json'}});
  };

  useEffect(() => {
    getPage(page)
      .then(response => setWords(response.data))
      .catch(err => console.log(err));
  }, []);

  const addClick = (addWord, addDefinition) => {
    let addObject = {
      word: addWord,
      definition: addDefinition
    };
    axios.post('http://localhost:3000/glossary', addObject)
      .then(response => {
        if (response.status === 201) {
          getPage(page);
        }
      })
      .then(response => setWords(response.data))
      .catch(err => {
        console.log('here')
        if (err.message === 'Request failed with status code 409') {
          axios.get('http://localhost:3000/glossary', {params: {page: page}, headers: {'Content-Type': 'application/json'}})
          .then((response) => {
            alert(`${addWord} is already in the Glossary`)
            setWords(response.data)
          })
          .catch(err => console.log(err));
        }
      });
  }

  const searchClick = (searchWord) => {
    if (searchWord === '') {
      getPage(page)
      .then(response => setWords(response.data))
      .catch(err => console.log(err));
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
        getPage(page)
      }
    })
    .then(response => setWords(response.data))
    .catch(err => {
      if (err.message === 'Request failed with status code 409') {
        alert('That\'s already the definition')
      } else {
        console.log(err);
      }
    });
  }

  const deleteClick = (deleteWord) => {
    let deleteObject = {
      word: deleteWord
    }
    axios.delete('http://localhost:3000/glossary', {data: deleteObject})
      .then(response => {
        if (response.status === 200) {
          getPAge(page);
        }
      })
      .then(response => setWords(response.data))
      .catch(err => console.log(err));
  }

  const prevClick = () => {
    if (page > 0) {
      getPage(page - 1)
      .then(response => {
        setPage(page - 1);
        setWords(response.data);
      })
      .catch(err => console.log(err));

    }
  }

  const nextClick = () => {
    getPage(page + 1).then(response => {
      setPage(page + 1);
      setWords(response.data);
    })
    .catch(err =>{
      console.log(err)
    })
  }


  return(
    <div>
      <h1>Glossary</h1>
      <AddSearchWord addClickHandler={addClick} searchClickHandler={searchClick}/>
      <WordsList words={words} updateClickHandler={updateClick} deleteClickHandler={deleteClick}/>
      <Prev page={page} prevClickHandler={prevClick}/>
      <Next page={page} nextClickHandler={nextClick} />
    </div>
  )
};


function Prev({page, prevClickHandler}) {
  if (page) {
    return (
      <button onClick={() => prevClickHandler()}>
        {page === 1 ? "First" : 'Prev'}
      </button>
    )
  } else {
    return <span></span>
  }
};

function Next({page, nextClickHandler}) {
  return (
    <button onClick={() => nextClickHandler()}>
      NEXT
    </button>
  )
}

// can i get these changes updated
export default App;