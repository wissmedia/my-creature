const mongoose = require("mongoose");

const CreatureSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    default: 'unknown',
    enum: ['unknown', 'male', 'female']
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Creature = mongoose.model('Creature', CreatureSchema)
module.exports = Creature