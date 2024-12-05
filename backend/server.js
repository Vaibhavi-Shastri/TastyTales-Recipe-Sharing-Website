const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const RecipeModel = require('./models/Recipe');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;  // Port change here

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Import routes
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Test recipe route
app.get('/test/recipes/:id', async (req, res) => {
  try {
      const recipeId = req.params.id;
      console.log(`Looking for recipe with ID: ${recipeId}`);

      // Attempt to find the recipe by ID
      const recipe = await RecipeModel.findById(recipeId);

      // Log the result
      if (!recipe) {
          console.log('Recipe not found');
          return res.status(404).json({ error: 'Recipe not found' });
      }

      console.log('Recipe found:', recipe);
      res.json(recipe);
  } catch (error) {
      console.error('Error querying recipe:', error);
      res.status(500).json({ error: 'Failed to query recipe' });
  }
});

// Start the server (only once)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
