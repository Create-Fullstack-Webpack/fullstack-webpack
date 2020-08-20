const mongojs = `
const mongoose = require('mongoose');

const MONGO_URI = '<INSERT PG URI HERE>';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: '<INSERT NAME>'
})
.then(()=>console.log('Connected to Mongo DB.'))
.catch(err=>console.log(err));

const Schema = mongoose.Schema;

// sets a schema for the 'sample' collection
const sampleSchema = new Schema({
  property1: String,
  property2: Boolean,
  property3: Number,
});

const Sample = mongoose.model('sample', sampleSchema);

module.exports = Sample
`;

module.exports = mongojs;