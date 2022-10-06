const model = require('../model');


const makeTitle = (wordObject) => {
  let word = wordObject.word;
  word = word[0].toUpperCase() + word.slice(1).toLowerCase()
  wordObject.word = word
}


module.exports = {
  get: (req, res) => {
    model.getAll().then(data => res.status(200).json(data));
  },

  post: (req, res) => {
    makeTitle(req.body)
    model.create(req.body)
      .then(() => res.sendStatus(201))
      .catch(err => {
        if (err.code === 11000 /* check arror code for duplicates*/) {
          res.sendStatus(409);
        } else {
          res.sendStatus(500);
        }
      })
  },

  put: (req, res) => {
    makeTitle(req.body);
    model.editDefinition(req.body.word, req.body.definition)
      .then((mongoResponse) => {
        if (mongoResponse.matchedCount === 1 && mongoResponse.modifiedCount === 1) {
          res.sendStatus(200);
        } else if(mongoResponse.matchedCount === 1 && mongoResponse.modifiedCount === 0) {
          res.sendStatus(409);
        } else if (mongoResponse.matchedCount === 0) {
          res.sendStatus(404);
        }
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  delete: (req, res) => {
    makeTitle(req.body)
    model.deleteWord(req.body.word)
      .then((results) => {
        if (results.deletedCount === 1) {
          res.sendStatus(200);
        } else if (results.deletedCount === 0) {
          res.sendStatus(404);
        }
      })
      .catch(err => res.sendStatus(500))
  }
};