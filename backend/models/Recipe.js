
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  imgurl :{ type: String, required: true },
  prepTime: { type: Number, required: true },
  difficulty: { type: String, required: true },
  category: { type: String, required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  ratings: [{
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number}
  }],
  comments: [{
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }
  
});

module.exports = mongoose.model('Recipe', RecipeSchema);
