import React, {useState, useEffect} from 'react';
import AddSearchWord from './AddSearchWord.jsx';
import WordList from './WordList.jsx';
import axios from 'axios';
function App() {
  const [words, setWords] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/glossary')
      .then((response) => setWords([...response]))
  }, [])
  return(
    <div>
      <h1>Glossary, but sexy</h1>
      <AddSearchWord/>
      <WordList />
    </div>
  )
}

export default App;