const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  genre: String,
  releaseDate: Date
}, {
  collection: 'movie'
});

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie;
