const Word = require('../db.js');

module.exports = {
  getAll: () => {
    return Word.find({}).sort('word').exec();
  },

  create: (wordObject) => {
    let newWord = new Word(wordObject)
    return newWord.save();

  },

  editDefinition: (wordToUpdate, newDef) => {
    console.log({word: wordToUpdate})
    console.log('we are here')
    console.log(newDef)
    return Word.updateOne({word: wordToUpdate}, {definition: newDef});
  },

  deleteWord: (wordToDel) => {
    return Word.deleteOne({word: wordToDel});
  }
};