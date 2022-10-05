const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/glossary`)

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them
const WordsSchema = new mongoose.Schema({
  word: {
      type: String,
      required: true,
      unique: true
    },
  definition: String
});

const Word = mongoose.model('Word', WordsSchema);

module.exports = Word;